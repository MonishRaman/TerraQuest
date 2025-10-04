import React, { useState, useRef, useEffect } from "react";
import "./community.css";

type CommunityProps = {
  className?: string;
};

const Community: React.FC<CommunityProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [confetti, setConfetti] = useState<{left:number,top:number,id:number}[]>([]);
  const [expandedEvent, setExpandedEvent] = useState<number|null>(null);
  const statsRef = useRef<HTMLDivElement|null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState({members:0, projects:0, workshops:0});

  // Carousel
  const resources = [
    {title: 'Interactive Sim: Orbital Mechanics', desc: 'Run sims to see how orbits change with velocity and mass.', progress: 78},
    {title: 'Lesson: Exoplanet Detection', desc: 'Hands-on notebook exploring transit and radial velocity methods.', progress: 92},
    {title: 'Video Series: Building CubeSats', desc: 'Step-by-step from concept to launch readiness.', progress: 64}
  ];
  const [slide, setSlide] = useState(0);
  const slideRef = useRef<number>(0);
  useEffect(()=>{ slideRef.current = slide }, [slide]);
  useEffect(()=>{
    const t = setInterval(()=>{
      setSlide(s=> (s+1) % resources.length);
    }, 4200);
    return ()=>clearInterval(t);
  },[]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(body?.error || "Subscription failed. Please try again later.");
        return;
      }
      setStatus("success");
      setMessage("Thanks — check your inbox to confirm subscription.");
      setEmail("");
  // small confetti burst
  const burst = Array.from({length:20}).map((_,i)=>({left: 20+Math.random()*200, top: 10+Math.random()*40, id: Date.now()+i}));
  setConfetti(burst);
  setTimeout(()=>setConfetti([]), 1200);
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  }

  // stats observer: animate counters when visible
  useEffect(()=>{
    const el = statsRef.current;
    if(!el) return;
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          setStatsVisible(true);
          obs.disconnect();
        }
      })
    },{threshold:0.3});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[]);

  useEffect(()=>{
    if(!statsVisible) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const targets = {members: 12480, projects: 312, workshops: 86};
    function step(now:number){
      const t = Math.min(1, (now-start)/duration);
      const ease = t<.5? 2*t*t : -1 + (4-2*t)*t; // simple ease
      setCounts({
        members: Math.floor(targets.members * ease),
        projects: Math.floor(targets.projects * ease),
        workshops: Math.floor(targets.workshops * ease),
      });
      if(t < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return ()=> cancelAnimationFrame(raf);
  },[statsVisible]);

  // small card tilt for resources (CSS variables)
  function handleTilt(e: React.PointerEvent<HTMLDivElement>){
    const el = e.currentTarget as HTMLDivElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tx', `${x * 10}deg`);
    el.style.setProperty('--ty', `${-y * 8}deg`);
  }
  function resetTilt(e: React.PointerEvent<HTMLDivElement>){
    const el = e.currentTarget as HTMLDivElement;
    el.style.setProperty('--tx','0deg');
    el.style.setProperty('--ty','0deg');
  }

  return (
    <section className={`community-section ${className}`} aria-labelledby="community-heading">
      <div className="community-hero">
        <div className="hero-content">
          <h2 id="community-heading">Education & Community</h2>
          <p className="lead">
            Explore NASA resources, join community projects, and learn with interactive
            activities for learners of all ages. Connect with scientists, educators, and
            fellow space enthusiasts.
          </p>
          <div className="hero-cta">
            <a className="btn primary" href="#resources">Explore resources</a>
            <a className="btn ghost" href="#events">Upcoming events</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="rocket" />
        </div>
      </div>

      <div className="community-grid">
        <article className="card" id="resources">
          <h3>Learning Resources</h3>
          <p>
            Curated lesson plans, videos, and interactive simulations for classrooms and
            independent learners. Content spans elementary through higher education.
          </p>
          <div ref={statsRef} className="stats-row" aria-hidden={false}>
            <div className="stat"><h4>Community</h4><div className="num">{counts.members.toLocaleString()}</div></div>
            <div className="stat"><h4>Active Projects</h4><div className="num">{counts.projects}</div></div>
            <div className="stat"><h4>Workshops</h4><div className="num">{counts.workshops}</div></div>
          </div>
          <a className="card-link" href="#">Browse resources →</a>
        </article>

        <article className="card" id="projects">
          <h3>Community Projects</h3>
          <p>
            Get involved in citizen science, student satellite programs, and open-source
            collaborations that advance space research and STEM education.
          </p>
          <a className="card-link" href="#">Join a project →</a>
        </article>

        <article className="card" id="mentorship">
          <h3>Mentorship & Careers</h3>
          <p>
            Find mentors, internships, and career pathways into aerospace, engineering,
            and research through our partner networks.
          </p>
          <a className="card-link" href="#">Find mentorship →</a>
        </article>
      </div>

      <div className="carousel" aria-roledescription="carousel" aria-label="Featured resources">
        <div className="slides" style={{transform: `translateX(${ - (slide * 372)}px)`}}>
          {resources.map((r, idx)=> (
            <div key={idx} className={`slide`} onPointerMove={handleTilt} onPointerLeave={resetTilt} role="group" aria-roledescription="slide">
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
              <div style={{marginTop:12, display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <svg className="progress-ring" viewBox="0 0 64 64" aria-hidden>
                  <circle className="ring-bg" cx="32" cy="32" r="26" />
                  <circle className="ring-fg" cx="32" cy="32" r="26" strokeDasharray={Math.PI*2*26} strokeDashoffset={(1 - (r.progress/100)) * Math.PI*2*26} />
                </svg>
                <div style={{color:'rgba(255,255,255,0.9)', fontWeight:700}}>{r.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="events-section" id="events">
        <div className="events-header">
          <h3>Upcoming Events</h3>
          <p className="muted">Workshops, livestreams, and regional meetups.</p>
        </div>
        <ul className="events-list">
          {[{
            date: '2025-10-18',
            title: 'Moon Mapping Workshop',
            badge: 'Online • Free',
            desc: 'Hands-on activity mapping lunar features with real data.'
          },{
            date: '2025-11-03',
            title: 'Student Satellite Showcase',
            badge: 'Virtual • Registration required',
            desc: 'Student teams present CubeSat missions and prototypes.'
          }].map((ev,i)=> (
            <li key={i} onClick={()=> setExpandedEvent(expandedEvent===i? null: i)} className={`event-item ${expandedEvent===i? 'open':''}`}>
              <time dateTime={ev.date}>{new Date(ev.date).toLocaleDateString(undefined,{month:'short', day:'numeric', year:'numeric'})}</time>
              <div className="event-body">
                <strong>{ev.title}</strong>
                <span className="muted"> • {ev.badge}</span>
                <p className="event-desc">{ev.desc}</p>
                {expandedEvent===i && <div className="event-extra">More info, links, and resources for this event.</div>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="newsletter">
        <div>
          <h4>Stay connected</h4>
          <p className="muted">Join our newsletter for updates on new resources and events.</p>
          {status === "success" && <p className="muted" role="status">{message}</p>}
          {status === "error" && <p className="muted" role="alert">{message}</p>}
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit} aria-label="Subscribe to newsletter">
          <label htmlFor="email" className="sr-only">Email address</label>
          <input id="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn primary" type="submit" disabled={status === "loading"}>{status === "loading" ? "Subscribing…" : "Subscribe"}</button>
        </form>
      </aside>
      {confetti.map(c=> <span key={c.id} className="confetti" style={{left:c.left, top:c.top}} />)}
    </section>
  );
};

export default Community;
