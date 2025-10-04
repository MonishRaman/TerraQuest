import React, { useState } from 'react';

const css = `
body {
  font-family: 'Poppins', sans-serif;
  background: radial-gradient(circle, #0a192f, #020c1b);
  color: #fff;
  margin: 0;
  text-align: center;
}

header {
  background: #112240;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.4);
}

.tool-section {
  background: #112240;
  margin: 2rem auto;
  padding: 1.5rem;
  width: 80%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

input {
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 70%;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background: #64ffda;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #52e0b9;
}

footer {
  margin-top: 3rem;
  padding: 1rem;
  background: #0a192f;
  color: #8892b0;
}
`;

const ResearchTool: React.FC = () => {
  const [radius, setRadius] = useState('');
  const [orbit, setOrbit] = useState('');
  const [temperature, setTemperature] = useState('');
  const [habitabilityResult, setHabitabilityResult] = useState('');

  const [mass, setMass] = useState('');
  const [radiusType, setRadiusType] = useState('');
  const [planetTypeResult, setPlanetTypeResult] = useState('');

  const [syntheticData, setSyntheticData] = useState<any[]>([]);

  function calculateHabitability() {
    const r = parseFloat(radius);
    const o = parseFloat(orbit);
    const t = parseFloat(temperature);

    if (isNaN(r) || isNaN(o) || isNaN(t) || r === 0) {
      setHabitabilityResult('⚠️ Please enter valid inputs!');
      return;
    }

    const score = (1 / Math.abs(1 - o)) * (t / 5800) * (1 / r);
    const category = score > 0.7 && score < 1.5 ? '🌍 Likely Habitable' : '🪐 Unlikely Habitable';
    setHabitabilityResult(`Score: ${score.toFixed(2)} — ${category}`);
  }

  function classifyPlanet() {
    const m = parseFloat(mass);
    const rt = parseFloat(radiusType);

    if (isNaN(m) || isNaN(rt)) {
      setPlanetTypeResult('⚠️ Please enter valid inputs!');
      return;
    }

    let type = '';
    if (rt < 1.5) type = 'Rocky Planet 🌎';
    else if (rt < 3) type = 'Super-Earth 🪐';
    else if (rt < 6) type = 'Ice Giant ❄️';
    else type = 'Gas Giant ☁️';

    setPlanetTypeResult(`Type: ${type}`);
  }

  function generateData() {
    const data: any[] = [];
    for (let i = 0; i < 5; i++) {
      data.push({
        planet: `Exo-${Math.floor(Math.random() * 9999)}`,
        radius: (Math.random() * 10).toFixed(2),
        orbit: (Math.random() * 2).toFixed(2),
        starTemp: (4000 + Math.random() * 4000).toFixed(0),
      });
    }
    setSyntheticData(data);
  }

  return (
    <div>
      <style>{css}</style>
      <header>
        <h1>🌌 ExoLab - Research Tools</h1>
        <p>Explore, analyze, and simulate exoplanet data</p>
      </header>

      <main>
        <section className="tool-section">
          <h2>📊 Habitability Score</h2>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            placeholder="Planet Radius (Earth Units)"
            aria-label="Planet radius"
          />
          <input
            type="number"
            value={orbit}
            onChange={(e) => setOrbit(e.target.value)}
            placeholder="Orbit Distance (AU)"
            aria-label="Orbit distance"
          />
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="Star Temperature (K)"
            aria-label="Star temperature"
          />
          <button onClick={calculateHabitability}>Calculate</button>
          <p id="habitabilityResult">{habitabilityResult}</p>
        </section>

        <section className="tool-section">
          <h2>🪐 Planet Type Classification</h2>
          <input
            type="number"
            value={mass}
            onChange={(e) => setMass(e.target.value)}
            placeholder="Planet Mass (Earth Units)"
            aria-label="Planet mass"
          />
          <input
            type="number"
            value={radiusType}
            onChange={(e) => setRadiusType(e.target.value)}
            placeholder="Planet Radius (Earth Units)"
            aria-label="Planet radius for type"
          />
          <button onClick={classifyPlanet}>Classify</button>
          <p id="planetTypeResult">{planetTypeResult}</p>
        </section>

        <section className="tool-section">
          <h2>🧬 Synthetic Data Generator</h2>
          <button onClick={generateData}>Generate Example Dataset</button>
          <pre id="syntheticData">{syntheticData.length ? JSON.stringify(syntheticData, null, 2) : ''}</pre>
        </section>
      </main>

      <footer>
        <p>🚀 Built for NASA Hackathon | Team ExoLab</p>
      </footer>
    </div>
  );
};

export default ResearchTool;
