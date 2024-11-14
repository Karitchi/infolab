"""
Sortie analogique comme pour le capteur de son.
Le MQ-7 a une particularité : pour obtenir des mesures précises, il est recommandé d alterner deux phases de chauffe :
    - Phase de chauffe élevée (1,4V pendant 60 secondes) : pour chauffer le capteur et rendre les lectures plus sensibles au CO.
    - Phase de chauffe basse (0,2V pendant 90 secondes) : pour permettre une lecture stable du CO.
pour simplifier et tester les lectures, nous utiliserons une lecture analogique continue.

Connexions du MQ-7
VCC : Connecté à l alimentation 3.3V ou 5V.
GND : Connecté à la terre.
AO : Connecté à une broche ADC (exemple : ADC1, broche 32 / GP27) du Raspberry Pi Pico.

note de nicolas: les broches ADC du Raspberry Pi Pico fonctionnent à un maximum de 3,3V.
Un diviseur de tension (V OUT = V IN X (R2 / R1 + R2)) ou un convertisseur ADC est nécessaire pour interfacer le capteur 
car il émet un signal analogique jusqu'à 5V
"""

from machine import ADC, Pin
from time import sleep_ms
import math

class MQ7Sensor:
    def __init__(self, pin_adc, baseline_samples=500):
        """
        Initialise le capteur de monoxyde de carbone MQ-7.
        :param pin_adc: Numéro de la broche ADC utilisée pour lire le capteur.
        :param baseline_samples: Nombre d'échantillons pour établir la valeur de référence de l'air ambiant.
        """
        self.adc = ADC(Pin(pin_adc))  # Initialiser l’ADC sur la broche spécifiée
        self.baseline_samples = baseline_samples  # Échantillons pour la ligne de base
        self.baseline_value = self.calibrate_baseline()  # Calibrage de la valeur de référence

    def calibrate_baseline(self):
        """
        Calibre la valeur de référence (ligne de base) en capturant une série d'échantillons.
        :return: Moyenne des valeurs de la ligne de base.
        """
        print("Calibration de la ligne de base en cours...")
        total = 0
        for _ in range(self.baseline_samples):
            total += self.adc.read_u16()
            sleep_ms(10)  # Pause entre les lectures
        baseline = total / self.baseline_samples
        print(f"Ligne de base calibrée : {baseline}")
        return baseline

    def read_co_level(self):
        """
        Lit le niveau de monoxyde de carbone en fonction de la variation par rapport à la ligne de base.
        :return: Variation en pourcentage par rapport à la ligne de base.
        """
        co_value = self.adc.read_u16()  # Lecture de la valeur brute du capteur
        variation = ((co_value - self.baseline_value) / self.baseline_value) * 100  # Calcul de la variation
        print(f"Valeur CO : {co_value}, Variation par rapport à la ligne de base : {variation}%")
        return variation

# Utilisation du capteur dans une salle de classe
mq7 = MQ7Sensor(pin_adc=27)  # Initialiser sur GP27 (ADC1)

# Boucle pour lire le niveau de CO à intervalles réguliers
while True:
    niveau_co = mq7.read_co_level()  # Lire le niveau de CO
    print(f"Niveau de CO : {niveau_co}% par rapport à la ligne de base")
    sleep_ms(1000)  # Attendre une seconde avant la prochaine lecture
