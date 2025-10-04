import React from 'react';
import './Dashboard.css';

export const Contact: React.FC = () => {
  return (
    <div className="dashboard">
      <header>
        <h1>Contact Us</h1>
        <p className="small-muted">Questions, feedback or collaboration inquiries — we'd love to hear from you.</p>
      </header>
      <div className="input-section">
        <p className="small-muted">Email: team@nasa-exoplanet.example</p>
        <p className="small-muted">Twitter: @nasa_exoplanet</p>
      </div>
    </div>
  );
};
