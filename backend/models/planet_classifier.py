import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

class PlanetClassifier:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.planet_types = ['Rocky', 'Gas Giant', 'Ice Giant', 'Super-Earth']
        self.is_trained = False
    
    def create_training_data(self):
        np.random.seed(42)
        data, labels = [], []
        for _ in range(300):  # Rocky
            radius = np.random.uniform(0.3, 2.0)
            mass = np.random.uniform(0.1, 3.0)
            orbit = np.random.uniform(0.3, 2.0)
            density = mass / (radius ** 3) * 5.51
            data.append([radius, mass, orbit, density])
            labels.append(0)
        for _ in range(250):  # Gas Giant
            radius = np.random.uniform(8, 15)
            mass = np.random.uniform(50, 400)
            orbit = np.random.uniform(2, 10)
            density = mass / (radius ** 3) * 5.51
            data.append([radius, mass, orbit, density])
            labels.append(1)
        for _ in range(250):  # Ice Giant
            radius = np.random.uniform(3, 5)
            mass = np.random.uniform(10, 20)
            orbit = np.random.uniform(5, 30)
            density = mass / (radius ** 3) * 5.51
            data.append([radius, mass, orbit, density])
            labels.append(2)
        for _ in range(200):  # Super-Earth
            radius = np.random.uniform(2.0, 3.5)
            mass = np.random.uniform(3, 10)
            orbit = np.random.uniform(0.5, 3)
            density = mass / (radius ** 3) * 5.51
            data.append([radius, mass, orbit, density])
            labels.append(3)
        return np.array(data), np.array(labels)
    
    def train(self):
        X, y = self.create_training_data()
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
        self.is_trained = True
    
    def classify(self, radius, mass, orbit):
        if not self.is_trained:
            self.train()
        density = mass / (radius ** 3) * 5.51
        features = np.array([[radius, mass, orbit, density]])
        features_scaled = self.scaler.transform(features)
        prediction = self.model.predict(features_scaled)[0]
        probabilities = self.model.predict_proba(features_scaled)[0]
        return {
            'planet_type': self.planet_types[prediction],
            'confidence': float(probabilities[prediction]),
            'probabilities': {
                planet_type: float(prob) 
                for planet_type, prob in zip(self.planet_types, probabilities)
            }
        }
