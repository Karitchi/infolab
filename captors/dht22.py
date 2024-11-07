# CODE TESTER SUR WOKWI
#DHT22 VCC → 3.3V (broche 36 ou 40) du Pico
#DHT22 DATA → GPIO 2 (broche 4) du Pico (eventuellement avec une résistance de 10 kΩ entre DATA et VCC mais je n'ai rien mis sur le simulateur on verra dans la pratique)
#DHT22 GND → GND (broche 38) du Pico



from machine import Pin                                      # Inclure la bibliothèque pour manipuler les broches
from time import sleep_ms, sleep_us                          # Inclure les fonctions de délai (en millisecondes et microsecondes)

class DHT22:
    def __init__(self, pin_name):
        """
        Initialise le capteur DHT22 avec la broche spécifiée.
        """
        sleep_ms(1000)  # Attendre 1 seconde pour la stabilité
        self.N1 = Pin(pin_name, Pin.OUT)
        self.PinName = pin_name
        sleep_ms(10)    # Attendre 10 ms supplémentaires

    def read_data(self):
        """
        Lit les données de température et d'humidité du capteur DHT22.
        Retourne une liste avec la température et l'humidité sous forme de chaînes de caractères.
        """
        self.__init__(self.PinName)  # Réinitialiser le capteur avant la lecture
        data = []                    # Liste pour stocker les données lues
        j = 0
        N1 = self.N1
        N1.low()                     # Envoyer un signal bas pour démarrer la communication
        sleep_ms(20)                 # Maintenir le signal bas pendant 20 ms pour initier la communication
        N1.high()                    # Remonter le signal
        N1 = Pin(self.PinName, Pin.IN) # Configurer la broche comme entrée pour lire les données du capteur
        sleep_us(30)                 # Attendre 30 us pour que le capteur réponde

        # Vérifier si le capteur répond
        if N1.value() != 0:
            return [0, 0]  # Retourner [0, 0] en cas d'erreur

        # Lire les données du capteur
        while N1.value() == 0:  # Attendre que le capteur envoie le signal haut
            continue
        while N1.value() == 1:  # Attendre que le signal bas commence
            continue

        # Lire les 40 bits de données (8 bits pour l'humidité, 8 bits pour le point d'humidité,
        # 8 bits pour la température, 8 bits pour le point de température, et 8 bits de parité)
        while j < 40:
            k = 0
            while N1.value() == 0:  # Attendre le début du signal haut
                continue
            while N1.value() == 1:  # Mesurer la durée du signal haut
                k += 1
                if k > 100: break
            if k < 3:
                data.append(0)  # Si la durée est courte, c'est un '0'
            else:
                data.append(1)  # Si la durée est longue, c'est un '1'
            j += 1

        # Traitement des données lues
        humidity_bit = data[0:8]
        humidity_point_bit = data[8:16]
        temperature_bit = data[16:24]
        temperature_point_bit = data[24:32]
        check_bit = data[32:40]

        humidity = 0
        humidity_point = 0
        temperature = 0
        temperature_point = 0
        check = 0

        # Convertir les bits en valeurs numériques
        for i in range(8):
            humidity += humidity_bit[i] * 2**(7-i)
            humidity_point += humidity_point_bit[i] * 2**(7-i)
            temperature += temperature_bit[i] * 2**(7-i)
            temperature_point += temperature_point_bit[i] * 2**(7-i)
            check += check_bit[i] * 2**(7-i)

        # Vérifier l'intégrité des données avec le bit de parité
        tmp = humidity + humidity_point + temperature + temperature_point
        if check == tmp:
            print(f'Température : {temperature}°C - Humidité : {humidity}%')
        else:
            print('Erreur de lecture des données:', humidity, humidity_point, temperature, temperature_point, check)
        return [str(temperature), str(humidity)]

# Exemple d'appel de la fonction pour lire les données du capteur DHT22
capteur = DHT22(pin_name=2)  # Initialisation du capteur sur la broche GPIO 2
resultat = capteur.read_data()  # Lecture des données
print(f'Température : {resultat[0]}°C, Humidité : {resultat[1]}%')
