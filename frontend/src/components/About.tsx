import React from 'react';
import './Dashboard.css';

export const About: React.FC = () => {
  return (
    <div className="dashboard">
      <header>
        <h1>About Us</h1>
        <p className="small-muted">We build tools to help explore and analyze exoplanet data.</p>
      </header>
      <div className="input-section">
        <p className="small-muted">
          This project is a lightweight demo that combines habitability prediction,
          planet classification, and transit visualization.
        </p>
      </div>
    </div>
  );
};
