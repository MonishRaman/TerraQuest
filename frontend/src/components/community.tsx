import React, { useState } from "react";
import "./community.css";

type CommunityProps = {
  className?: string;
};

const Community: React.FC<CommunityProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

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
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
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

      <div className="events-section" id="events">
        <div className="events-header">
          <h3>Upcoming Events</h3>
          <p className="muted">Workshops, livestreams, and regional meetups.</p>
        </div>
        <ul className="events-list">
          <li>
            <time dateTime="2025-10-18">Oct 18, 2025</time>
            <div className="event-body">
              <strong>Moon Mapping Workshop</strong>
              <span className="muted"> • Online • Free</span>
              <p className="event-desc">Hands-on activity mapping lunar features with real data.</p>
            </div>
          </li>
          <li>
            <time dateTime="2025-11-03">Nov 3, 2025</time>
            <div className="event-body">
              <strong>Student Satellite Showcase</strong>
              <span className="muted"> • Virtual • Registration required</span>
              <p className="event-desc">Student teams present CubeSat missions and prototypes.</p>
            </div>
          </li>
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
    </section>
  );
};

export default Community;
