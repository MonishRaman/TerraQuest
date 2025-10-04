import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export const Home: React.FC = () => {
  return (
    <div className="dashboard">
      <header className="hero">
        <h1>Welcome to TerraQuest</h1>
        <p>TerraQuest is a research-first toolkit for exploring exoplanet observations,
           predicting habitability, classifying planet types, and visualizing transits.</p>
      </header>

      <div className="input-section">
        <h2 id="what">What is TerraQuest?</h2>
        <p className="small-muted">
          TerraQuest combines data-driven models and intuitive visual tools to help astronomers,
          educators, and curious explorers understand exoplanet properties quickly. Use the
          Advanced Analysis to run habitability prediction and classification on custom parameters.
        </p>

        <h3 id="features">Features</h3>
        <ul>
          <li className="small-muted">Habitability scoring with climate proxies and ESI estimation.</li>
          <li className="small-muted">Planet classification with confidence scores.</li>
          <li className="small-muted">Transit visualization generator for simulated light curves.</li>
          <li className="small-muted">Export results and share reproducible analysis snapshots.</li>
        </ul>

        <h3 id="how-it-works">How it works</h3>
        <p className="small-muted">
          Enter basic planetary and stellar parameters, then run the Advanced Analysis. The
          backend models evaluate multiple metrics and return habitability and classification
          results along with a transit visualization image you can download.
        </p>

        <h3 id="team">Team & Contact</h3>
        <p className="small-muted">Built by the TerraQuest team. For inquiries or collaboration, visit the Contact page.</p>

        <div style={{ marginTop: 16 }}>
          <Link to="/dashboard"><button className="primary-btn">Try Advanced Analysis</button></Link>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <Link to="/about">About Us</Link>
        {' · '}
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  );
};
