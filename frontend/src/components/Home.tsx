import React from 'react';
import { useLaunch } from './LaunchProvider';
import './Home.css';

export const Home: React.FC = () => {
  const launch = useLaunch();

  return (
    <div className="dashboard landing-root">
      <div className="nebula" aria-hidden="true" />

      <header className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>🚀 Explore New Worlds with AI</h1>
            <p className="hero-sub">Discover exoplanets using machine learning — straight from NASA’s open-source space mission data.</p>
            <p className="hero-desc">Analyze data from Kepler, K2, and TESS missions to detect planets, evaluate habitability, and classify planetary types — all in one AI-powered web app.</p>

            <div className="hero-ctas">
              <button className="primary-btn" onClick={() => launch('/dashboard')}>Try the Classifier</button>
              <button className="secondary-btn" onClick={() => launch('/research-tools')}>Explore NASA Datasets</button>
              <a className="link-btn" href="#how-it-works">Learn How It Works</a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden>
            <div className="lightcurve" />
          </div>
        </div>
      </header>

      <section className="about">
        <h2>What is this project?</h2>
        <p>This is a NASA Space Apps Challenge 2025 submission that uses artificial intelligence to automatically identify exoplanets from real astronomical data. Our AI models are trained on datasets from NASA’s Kepler, K2, and TESS missions to detect planets, score their potential habitability, and categorize them based on physical characteristics.</p>
      </section>

      <section className="features">
        <h3>Key Features</h3>
        <div className="features-grid">
          <div className="feature"><div className="feature-icon">🧠</div><h4>AI-Based Classification</h4><p>Identify planets, candidates, or false positives.</p></div>
          <div className="feature"><div className="feature-icon">🌱</div><h4>Habitability Score</h4><p>Predict the chances of life-friendly conditions.</p></div>
          <div className="feature"><div className="feature-icon">🛰️</div><h4>NASA Mission Data Explorer</h4><p>Browse and compare planetary systems.</p></div>
          <div className="feature"><div className="feature-icon">📈</div><h4>Light Curve Analysis</h4><p>Visualize transit signals and brightness dips.</p></div>
          <div className="feature"><div className="feature-icon">🧪</div><h4>Research Tools</h4><p>Tune models, generate synthetic data, and export results.</p></div>
          <div className="feature"><div className="feature-icon">🎓</div><h4>Educational Mode</h4><p>Learn how planet detection works, step-by-step.</p></div>
        </div>
      </section>

      <section className="audience">
        <h3>Who is this for?</h3>
        <ul>
          <li>Researchers and scientists working with astrophysical data</li>
          <li>Students and educators exploring space science and machine learning</li>
          <li>Space enthusiasts who want to discover the next Earth-like world</li>
        </ul>
      </section>

      {/* <div className="floating-badge">Open-source project for NASA Space Apps Challenge 2025</div> */}
    </div>
  );
};
