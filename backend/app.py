from flask import Flask
from flask_cors import CORS
from api.routes import api
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    app.register_blueprint(api, url_prefix='/api')

    @app.route('/')
    def home():
        return {
            'message': 'NASA Exoplanet Advanced Analysis API',
            'version': '1.0.0',
            'endpoints': [
                '/api/health',
                '/api/habitability',
                '/api/classify',
                '/api/transit/generate',
                '/api/analyze'
            ]
        }
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
