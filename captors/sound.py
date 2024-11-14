"""
le capteur de son MAX4466 est un microphone amplifié, la lecture des niveaux sonores sur un Raspberry Pi Pico 
est différente de celle d'un capteur comme le DHT22, car il ne transmet pas de données numériques en bits.
Le MAX4466 produit une sortie analogique qui varie avec l intensité sonore.
Sur le Raspberry Pi Pico, il faudra donc une approche pour capter et traiter cette entrée analogique.
"""

# Le MAX4466 fournit une tension de sortie proportionnelle à l’intensité sonore ambiante.
# Ce signal est continu et fluctue autour d’une valeur moyenne (au repos autour de 1.65V en 3.3V),selon le niveau sonore capté.
# Le Raspberry Pi Pico possède des broches ADC (Convertisseur Analogique-Numérique) intégrées, qui permettent de lire des signaux analogiques.
# connecter la sortie du MAX4466 à une broche ADC, telle que ADC0 (broche 31 / GP26).

from machine import ADC, Pin
from time import sleep_ms
import array
import math

class SoundSensor:
    def __init__(self, pin_adc, samples=100):
        """
        Initialise le capteur de son MAX4466.
        :param pin_adc: Numéro de la broche ADC utilisée pour lire le capteur.
        :param samples: Nombre d'échantillons pour calculer le niveau moyen et RMS du bruit.
        """
        self.adc = ADC(Pin(pin_adc))  # Initialiser l’ADC sur la broche spécifiée
        self.samples = samples        # Nombre d'échantillons pour calculer le niveau sonore
        self.buffer = array.array("H", (0 for _ in range(samples)))  # Tampon pour stocker les valeurs

    def read_sound_level(self):
        """
        Mesure le niveau sonore en calculant la valeur moyenne et RMS du signal.
        :return: Dictionnaire avec l'amplitude, la moyenne, et RMS du niveau sonore.
        """
        # Prendre des échantillons et les stocker dans le tampon
        for i in range(self.samples):
            self.buffer[i] = self.adc.read_u16()
            sleep_ms(1)  # Pause pour stabiliser entre chaque lecture

        # Calcul de l'amplitude
        min_val = min(self.buffer)
        max_val = max(self.buffer)
        amplitude = max_val - min_val  # Variation entre le niveau le plus bas et le plus haut

        # Calcul de la moyenne
        avg_val = sum(self.buffer) / self.samples

        # Calcul de RMS
        sum_square = sum((x - avg_val) ** 2 for x in self.buffer)
        rms = math.sqrt(sum_square / self.samples)

        # Afficher des informations utiles pour le débogage
        print(f"Amplitude : {amplitude}, Moyenne : {avg_val}, RMS : {rms}")

        return {"amplitude": amplitude, "moyenne": avg_val, "rms": rms}

# Utilisation du capteur dans une salle de classe
son = SoundSensor(pin_adc=26)  # Initialiser sur GP26 (ADC0)

# Boucle pour lire le niveau sonore à intervalles réguliers
while True:
    niveau_sonore = son.read_sound_level()  # Lire le niveau sonore
    print(f"Niveau sonore -> Amplitude: {niveau_sonore['amplitude']}, Moyenne: {niveau_sonore['moyenne']}, RMS: {niveau_sonore['rms']}")
    sleep_ms(1000)  # Attendre une seconde avant la prochaine lecture



# La valeur RMS (Root Mean Square : racine carrée de la moyenne des carrés des échantillons)
# est une mesure plus représentative de l’intensité sonore générale.
# est souvent utilisée en traitement du signal pour quantifier les niveaux de signaux audio.
""""
Pour une mesure plus poussée (comme le niveau de décibels), il faudra éventuellement convertir les données en niveaux de pression sonore (SPL)
via des méthodes de traitement de signaux.

Dans une salle de classe calme, si quelqu'un parle ou fait un bruit soudain, l amplitude augmentera rapidement, 
on peut définir un seuil d amplitude pour déclencher une alerte lorsque le bruit dépasse une certaine limite,
par exemple pour détecter des comportements perturbateurs (quelqu'un qui claque la porte oui juste quelqu'un qui frappe à la porte...).

Dans une salle de classe occupée mais relativement calme, la moyenne des lectures sera plus élevée qu une salle vide.
Surveiller cette valeur nous permet de voir si le bruit de fond reste dans une plage acceptable pour la concentration ou si la salle est trop bruyante.
Cela peut servir de base pour ajuster l'environnement (demander aux étudiants de parler plus doucement, etc.).

Si vous voulez savoir si le niveau sonore global reste dans une plage acceptable pendant toute la durée de la leçon,
le RMS donne une idée plus précise de l intensité sonore moyenne. Une valeur RMS élevée pourrait indiquer que la salle est trop bruyante en permanence,
ce qui peut justifier l'implémentation de mesures de réduction du bruit, comme des panneaux acoustiques. utile pour les activité pédagogiques ou les cours assez ouvert comme dev
"""