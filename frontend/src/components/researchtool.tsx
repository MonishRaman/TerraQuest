import React, { useState } from 'react';

const css = `
body { font-family: 'Poppins', sans-serif; margin:0; color: #e6f0ff; background: radial-gradient(circle at 10% 10%, rgba(10,25,47,0.9), #02061a 40%); }
header{ padding: 1.25rem; text-align:center; background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(10,20,40,0.2)); box-shadow: 0 6px 18px rgba(0,0,0,0.5); border-radius: 10px; margin: 12px auto; max-width:1100px }
header h1{ margin:0;font-size:1.6rem }
main{ max-width:1100px;margin:18px auto;padding:0 14px }
.tools-grid{ display:grid;grid-template-columns:repeat(3,1fr);gap:18px }
.tool-card{ background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); padding:16px;border-radius:12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: transform .18s cubic-bezier(.2,.9,.2,1), box-shadow .18s ease }
.tool-card:hover{ transform:translateY(-8px); box-shadow:0 22px 60px rgba(0,0,0,0.6) }
.tool-card h2{ margin-top:0 }
.inputs{ display:flex;flex-direction:column;gap:8px;margin-top:8px }
.inputs input{ padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.04); background:rgba(0,0,0,0.25); color: #e6f0ff }
.btn-animated{ display:inline-block;padding:10px 14px;border-radius:8px;border:none;background:linear-gradient(90deg,#6ad0ff,#6a7cff);color:#021; font-weight:700; cursor:pointer; box-shadow:0 8px 30px rgba(106,208,255,0.08); transition: transform .12s ease }
.btn-animated:hover{ transform:translateY(-4px); }

/* Progress ring */
.progress-wrap{ display:flex;gap:12px; align-items:center }
.ring{ width:84px;height:84px }
.ring svg{ transform: rotate(-90deg) }
.ring .bg{ stroke: rgba(255,255,255,0.06); stroke-width:10 }
.ring .fg{ stroke: url(#grad); stroke-width:10; stroke-linecap:round; transition: stroke-dashoffset .6s cubic-bezier(.2,.9,.2,1) }
.score-text{ font-weight:700; font-size:1.05rem }

/* sparkline placeholder */
.sparkline{ width:100%; height:36px }

.data-output{ margin-top:12px; font-family:monospace; font-size:0.85rem; background:rgba(0,0,0,0.25); padding:8px; border-radius:6px; max-height:220px; overflow:auto }

.floating-particles{ position:relative }
.particle{ position:absolute; width:8px;height:8px;border-radius:50%; background:rgba(106,208,255,0.9); opacity:0; transform:translateY(0); animation: particle-pop .9s ease forwards }
@keyframes particle-pop{0%{opacity:1; transform:translateY(0) scale(.6)}100%{opacity:0; transform:translateY(-120px) scale(1.2)} }

footer{ text-align:center; margin:22px 0; color:rgba(200,215,240,0.6) }

@media (max-width:980px){ .tools-grid{ grid-template-columns:repeat(2,1fr) } }
@media (max-width:640px){ .tools-grid{ grid-template-columns:1fr } .progress-wrap{ justify-content:flex-start } }
`;

const ResearchTool: React.FC = () => {
  const [radius, setRadius] = useState('');
  const [orbit, setOrbit] = useState('');
  const [temperature, setTemperature] = useState('');
  const [habitabilityResult, setHabitabilityResult] = useState('');
  const [habitabilityScore, setHabitabilityScore] = useState<number | null>(null);

  const [mass, setMass] = useState('');
  const [radiusType, setRadiusType] = useState('');
  const [planetTypeResult, setPlanetTypeResult] = useState('');

  const [syntheticData, setSyntheticData] = useState<any[]>([]);
  const [particles, setParticles] = useState<{left:number,top:number,id:number}[]>([]);

  function calculateHabitability() {
    const r = parseFloat(radius);
    const o = parseFloat(orbit);
    const t = parseFloat(temperature);

    if (isNaN(r) || isNaN(o) || isNaN(t) || r === 0) {
      setHabitabilityResult('⚠️ Please enter valid inputs!');
      setHabitabilityScore(null);
      return;
    }

    // simple heuristic score for demo (normalized later for display)
    const score = (1 / Math.abs(1 - o)) * (t / 5800) * (1 / r);
    const category = score > 0.7 && score < 1.5 ? '🌍 Likely Habitable' : '🪐 Unlikely Habitable';
    setHabitabilityResult(`Score: ${score.toFixed(2)} — ${category}`);

    // normalize to 0-100 for progress ring visualization (clamp)
    const percent = Math.max(0, Math.min(100, Math.round((score / 2) * 100)));
    setHabitabilityScore(percent);
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
    for (let i = 0; i < 6; i++) {
      data.push({
        planet: `Exo-${Math.floor(Math.random() * 9999)}`,
        radius: (Math.random() * 10).toFixed(2),
        orbit: (Math.random() * 2).toFixed(2),
        starTemp: (4000 + Math.random() * 4000).toFixed(0),
      });
    }
    setSyntheticData(data);

    // create a few particle bursts for visual delight
    const burst = Array.from({length:10}).map((_,i)=>({left: 40+Math.random()*220, top: 30+Math.random()*40, id: Date.now()+i}));
    setParticles(burst);
    // clear after animation
    window.setTimeout(()=> setParticles([]), 900);
  }

  // helper for ring stroke offset
  const ringCirc = 2 * Math.PI * 34; // radius 34
  const progressOffset = (pct:number|null) => {
    if (pct == null) return ringCirc;
    const filled = ringCirc * (1 - pct/100);
    return filled;
  }

  return (
    <div>
      <style>{css}</style>
      <header>
        <h1>🌌 ExoLab - Research Tools</h1>
        <p>Explore, analyze, and simulate exoplanet data — interactive demos and quick modeling tools.</p>
      </header>

      <main>
        <div className="tools-grid">
          <section className="tool-card">
            <h2>📊 Habitability Score</h2>
            <div className="progress-wrap">
              <div className="ring" aria-hidden>
                <svg width="84" height="84" viewBox="0 0 84 84">
                  <defs>
                    <linearGradient id="grad" x1="0%" x2="100%"><stop offset="0%" stopColor="#6ad0ff"/><stop offset="100%" stopColor="#6a7cff"/></linearGradient>
                  </defs>
                  <circle className="bg" cx="42" cy="42" r="34" fill="none" />
                  <circle className="fg" cx="42" cy="42" r="34" fill="none" strokeDasharray={`${ringCirc}`} strokeDashoffset={progressOffset(habitabilityScore)} />
                </svg>
              </div>
              <div>
                <div className="score-text">{habitabilityScore != null ? `${habitabilityScore}%` : '—'}</div>
                <div style={{opacity:0.85, marginTop:6}}>{habitabilityResult || 'Enter parameters and click Calculate'}</div>
              </div>
            </div>

            <div className="inputs">
              <input type="number" value={radius} onChange={(e)=>setRadius(e.target.value)} placeholder="Planet Radius (Earth Units)" />
              <input type="number" value={orbit} onChange={(e)=>setOrbit(e.target.value)} placeholder="Orbit Distance (AU)" />
              <input type="number" value={temperature} onChange={(e)=>setTemperature(e.target.value)} placeholder="Star Temperature (K)" />
              <div style={{display:'flex',gap:8,marginTop:8}}>
                <button className="btn-animated" onClick={calculateHabitability}>Calculate</button>
                <button className="btn-animated" onClick={()=>{ setRadius('1'); setOrbit('1'); setTemperature('5800'); calculateHabitability(); }}>Use Earth example</button>
              </div>
            </div>

            <svg className="sparkline" viewBox="0 0 120 36" preserveAspectRatio="none" style={{marginTop:12}}>
              <polyline points="0,28 20,22 40,12 60,18 80,8 100,14 120,6" fill="none" stroke="#6ad0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{filter:'drop-shadow(0 6px 14px rgba(106,208,255,0.06))'}} />
            </svg>
          </section>

          <section className="tool-card">
            <h2>🪐 Planet Type Classification</h2>
            <div className="inputs">
              <input type="number" value={mass} onChange={(e)=>setMass(e.target.value)} placeholder="Planet Mass (Earth Units)" />
              <input type="number" value={radiusType} onChange={(e)=>setRadiusType(e.target.value)} placeholder="Planet Radius (Earth Units)" />
              <div style={{display:'flex',gap:8,marginTop:8}}>
                <button className="btn-animated" onClick={classifyPlanet}>Classify</button>
                <button className="btn-animated" onClick={()=>{ setMass('1'); setRadiusType('1'); classifyPlanet(); }}>Example</button>
              </div>
              <div className="data-output" style={{marginTop:12}}>{planetTypeResult}</div>
            </div>
          </section>

          <section className="tool-card floating-particles">
            <h2>🧬 Synthetic Data Generator</h2>
            <p style={{opacity:0.85}}>Create small example datasets for testing and demos.</p>
            <div style={{display:'flex',gap:8,marginTop:10}}>
              <button className="btn-animated" onClick={generateData}>Generate Example Dataset</button>
              <button className="btn-animated" onClick={()=>{ setSyntheticData([]) }}>Clear</button>
            </div>

            <div className="data-output" style={{marginTop:12}}>
              {syntheticData.length ? (<table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr><th align="left">Planet</th><th>Radius</th><th>Orbit</th><th>StarTemp</th></tr></thead><tbody>{syntheticData.map((d,i)=>(<tr key={i}><td>{d.planet}</td><td>{d.radius}</td><td>{d.orbit}</td><td>{d.starTemp}</td></tr>))}</tbody></table>) : (<div style={{opacity:0.7}}>No data yet — click Generate</div>)}
            </div>

            {particles.map(p=> <span key={p.id} className="particle" style={{left:p.left, top:p.top}} />)}
          </section>
        </div>
      </main>

      <footer>
        <p>🚀 Built for NASA Space Apps Challenge 2025 | Team ExoLab</p>
      </footer>
    </div>
  );
};

export default ResearchTool;
