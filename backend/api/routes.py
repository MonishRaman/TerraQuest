from flask import Blueprint, request, jsonify
from models import HabitabilityPredictor, PlanetClassifier, TransitLightCurve

api = Blueprint('api', __name__)

habitability_predictor = HabitabilityPredictor()
planet_classifier = PlanetClassifier()
transit_visualizer = TransitLightCurve()

@api.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'NASA Exoplanet API running'})

@api.route('/habitability', methods=['POST'])
def predict_habitability():
    data = request.json
    result = habitability_predictor.predict(
        radius=float(data['radius']),
        orbit=float(data['orbit']),
        star_type=data['starType'],
        star_mass=float(data.get('starMass', 1.0)),
        star_temp=float(data.get('starTemp', 5778))
    )
    return jsonify(result)

@api.route('/classify', methods=['POST'])
def classify_planet():
    data = request.json
    result = planet_classifier.classify(
        radius=float(data['radius']),
        mass=float(data['mass']),
        orbit=float(data['orbit'])
    )
    return jsonify(result)

@api.route('/transit/generate', methods=['POST'])
def generate_transit():
    data = request.json
    planet_name = data.get('planetName', 'Exoplanet-1')
    result = transit_visualizer.generate_sample_transit(planet_name)
    return jsonify(result)

@api.route('/analyze', methods=['POST'])
def analyze_all():
    data = request.json
    habitability = habitability_predictor.predict(
        radius=float(data['radius']),
        orbit=float(data['orbit']),
        star_type=data['starType'],
        star_mass=float(data.get('starMass', 1.0)),
        star_temp=float(data.get('starTemp', 5778))
    )
    classification = planet_classifier.classify(
        radius=float(data['radius']),
        mass=float(data['mass']),
        orbit=float(data['orbit'])
    )
    return jsonify({
        'habitability': habitability,
        'classification': classification
    })
