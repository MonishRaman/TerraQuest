import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

class HabitabilityPredictor:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
        # Reference values
        self.EARTH_RADIUS = 1.0
        self.EARTH_ORBIT = 1.0
        self.EARTH_TEMP = 288
    
    def calculate_habitable_zone(self, star_luminosity):
        inner_bound = 0.95 * np.sqrt(star_luminosity)
        outer_bound = 1.37 * np.sqrt(star_luminosity)
        return inner_bound, outer_bound
    
    def calculate_esi(self, radius, orbit, temp, star_mass=1.0):
        radius_component = 1 - abs((radius - self.EARTH_RADIUS) / (radius + self.EARTH_RADIUS))
        orbit_component = 1 - abs((orbit - self.EARTH_ORBIT) / (orbit + self.EARTH_ORBIT))
        temp_component = 1 - abs((temp - self.EARTH_TEMP) / (temp + self.EARTH_TEMP))
        esi = (radius_component**0.57 * orbit_component**0.29 * temp_component**0.14)
        return max(0, min(1, esi))
    
    def prepare_features(self, radius, orbit, star_type, star_mass=1.0, star_temp=5778):
        star_type_map = {'O': 7, 'B': 6, 'A': 5, 'F': 4, 'G': 3, 'K': 2, 'M': 1}
        star_type_numeric = star_type_map.get(star_type.upper()[0], 3)
        star_luminosity = star_mass ** 3.5
        inner_hz, outer_hz = self.calculate_habitable_zone(star_luminosity)
        in_hz = 1 if inner_hz <= orbit <= outer_hz else 0
        temp = star_temp * np.sqrt(star_mass / (2 * orbit))
        esi = self.calculate_esi(radius, orbit, temp, star_mass)
        return np.array([[radius, orbit, star_type_numeric, star_mass, star_temp, in_hz, temp, esi]])
    
    def create_training_data(self):
        np.random.seed(42)
        data, labels = [], []
        for _ in range(300):  # Habitable
            radius = np.random.uniform(0.5, 2.0)
            orbit = np.random.uniform(0.8, 1.5)
            star_mass = np.random.uniform(0.8, 1.2)
            star_temp = 5778 * (star_mass ** 0.5)
            star_type = 3
            temp = star_temp * np.sqrt(star_mass / (2 * orbit))
            esi = self.calculate_esi(radius, orbit, temp, star_mass)
            data.append([radius, orbit, star_type, star_mass, star_temp, 1, temp, esi])
            labels.append(1)
        for _ in range(700):  # Non-habitable
            if np.random.random() < 0.33:
                radius = np.random.uniform(4, 15)
                orbit = np.random.uniform(0.1, 5)
            elif np.random.random() < 0.5:
                radius = np.random.uniform(0.5, 3)
                orbit = np.random.uniform(0.01, 0.5)
            else:
                radius = np.random.uniform(0.5, 3)
                orbit = np.random.uniform(2, 10)
            star_mass = np.random.uniform(0.3, 2.0)
            star_temp = 5778 * (star_mass ** 0.5)
            star_type = np.random.randint(1, 8)
            temp = star_temp * np.sqrt(star_mass / (2 * orbit))
            esi = self.calculate_esi(radius, orbit, temp, star_mass)
            in_hz = 1 if 0.8 <= orbit <= 1.5 else 0
            data.append([radius, orbit, star_type, star_mass, star_temp, in_hz, temp, esi])
            labels.append(0)
        return np.array(data), np.array(labels)
    
    def train(self):
        X, y = self.create_training_data()
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        self.model.fit(X_train_scaled, y_train)
        self.is_trained = True
        return self.model.score(X_test_scaled, y_test)
    
    def predict(self, radius, orbit, star_type, star_mass=1.0, star_temp=5778):
        if not self.is_trained:
            self.train()
        features = self.prepare_features(radius, orbit, star_type, star_mass, star_temp)
        feature_scaled = self.scaler.transform(features)
        probability = self.model.predict_proba(feature_scaled)[0][1]
        prediction = self.model.predict(feature_scaled)[0]
        star_type_map = {'O': 7, 'B': 6, 'A': 5, 'F': 4, 'G': 3, 'K': 2, 'M': 1}
        star_luminosity = star_mass ** 3.5
        temp = star_temp * np.sqrt(star_mass / (2 * orbit))
        esi = self.calculate_esi(radius, orbit, temp, star_mass)
        inner_hz, outer_hz = self.calculate_habitable_zone(star_luminosity)
        return {
            'habitable': bool(prediction),
            'score': float(probability),
            'category': 'Likely Habitable' if prediction else 'Unlikely',
            'esi': float(esi),
            'equilibrium_temp': float(temp),
            'in_habitable_zone': bool(inner_hz <= orbit <= outer_hz)
        }
