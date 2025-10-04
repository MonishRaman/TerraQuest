import React, { useState } from 'react';
import { api } from '../services/api';
import { HabitabilityResult, PlanetClassification } from '../types';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const [radius, setRadius] = useState<number>(1.0);
  const [orbit, setOrbit] = useState<number>(1.0);
  const [mass, setMass] = useState<number>(1.0);
  const [starType, setStarType] = useState<string>('G');
  const [loading, setLoading] = useState<boolean>(false);
  const [habitability, setHabitability] = useState<HabitabilityResult | null>(null);
  const [classification, setClassification] = useState<PlanetClassification | null>(null);
  const [transitImage, setTransitImage] = useState<string>('');

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await api.analyzeAll({
        radius,
        orbit,
        mass,
        starType
      });
      setHabitability(result.habitability);
      setClassification(result.classification);
      const transit = await api.generateTransit('Exoplanet-1');
      setTransitImage(transit.image);
    } catch (error) {
      alert('Analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1>🪐 NASA Exoplanet Advanced Analysis</h1>
        <p>Predict habitability, classify planet types, visualize transits</p>
      </header>
      <div className="input-section">
        <h2>Planet Parameters</h2>
        <p className="small-muted">Adjust the parameters below and run an advanced analysis.</p>
        <div className="input-grid">
          <div className="input-group">
            <label>Planet Radius (Earth radii)</label>
            <input 
              type="number" placeholder="e.g. 1.0" value={radius} onChange={(e) => setRadius(Number(e.target.value))} step="0.1" />
          </div>
          <div className="input-group">
            <label>Orbital Distance (AU)</label>
            <input 
              type="number" placeholder="e.g. 1.0" value={orbit} onChange={(e) => setOrbit(Number(e.target.value))} step="0.1" />
          </div>
          <div className="input-group">
            <label>Planet Mass (Earth masses)</label>
            <input 
              type="number" placeholder="e.g. 1.0" value={mass} onChange={(e) => setMass(Number(e.target.value))} step="0.1" />
          </div>
          <div className="input-group">
            <label>Star Type</label>
            <input 
              type="text" placeholder="G" value={starType} onChange={(e) => setStarType(e.target.value)} maxLength={1} />
          </div>
        </div>
        <button className="primary-btn" onClick={handleAnalyze} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      {habitability && (
        <div className="result-section">
          <h2>Habitability Prediction</h2>
          <ul>
            <li>Habitable: {habitability.habitable ? 'Yes' : 'No'}</li>
            <li>Score: {habitability.score.toFixed(2)}</li>
            <li>Category: {habitability.category}</li>
            <li>ESI: {habitability.esi.toFixed(2)}</li>
            <li>Equilibrium Temp: {habitability.equilibrium_temp.toFixed(2)} K</li>
            <li>In Habitable Zone: {habitability.in_habitable_zone ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      )}
      {classification && (
        <div className="result-section">
          <h2>Planet Classification</h2>
          <ul>
            <li>Type: {classification.planet_type}</li>
            <li>Confidence: {classification.confidence.toFixed(2)}</li>
          </ul>
        </div>
      )}
      {transitImage && (
        <div className="result-section">
          <h2>Transit Visualization</h2>
          <img src={`data:image/png;base64,${transitImage}`} alt="Transit Light Curve" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};
