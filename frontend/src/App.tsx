import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Home } from './components/Home';
import { About } from './components/About';
import { Contact } from './components/Contact';
import ResearchTool from './components/researchtool';
import Community from './components/community';
import './App.css';
import { LaunchProvider } from './components/LaunchProvider';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import Footer from './components/Footer';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ThemeProvider>
    <BrowserRouter>
      <div className="top-nav">
        <button className="mobile-toggle" aria-label="Toggle menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '✕' : '☰'}
        </button>
        <div className="brand">
          {/* Place your logo at public/logo.png (see README or instructions) */}
          <Link to="/">
            <img src="/logo.png" alt="TerraQuest" className="brand-logo" />
          </Link>
          <Link to="/" className="brand-title">TerraQuest</Link>
        </div>

        <div className="nav-items">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="app-layout">
        <aside className={`side-bar ${sidebarOpen ? 'open' : 'mobile'}`}>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" className="side-link">
                  <span className="icon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 13v6"/><path d="M12 9v10"/><path d="M17 5v14"/></svg>
                  </span>
                  <span className="label">Advanced Analysis</span>
                </Link>
              </li>

              <li>
                <a
                  href="https://exoclassifiergit-af2wfqnc548f76gsgr5g3u.streamlit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="side-link"
                >
                  <span className="icon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>
                  </span>
                  <span className="label">Exoclassifier</span>
                </a>
              </li>

              <li>
                <Link to="/research-tools" className="side-link">
                  <span className="icon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6"/><path d="M18 11a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"/></svg>
                  </span>
                  <span className="label">Research Tools</span>
                </Link>
              </li>

              <li>
                <Link to="/community" className="side-link">
                  <span className="icon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </span>
                  <span className="label">Education &amp; Community</span>
                </Link>
              </li>

              <li>
                <a href="#features" className="side-link">
                  <span className="icon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 21 12 17.77 7.82 21 9 12.91l-5-3.64 5.91-.99L12 2z"/></svg>
                  </span>
                  <span className="label">Features</span>
                </a>
              </li>

              <li>
                <a href="#how-it-works" className="side-link">
                  <span className="icon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 2.3 16.69l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.67 0 1.24-.39 1.51-1A1.65 1.65 0 0 0 4 5.6L3.94 5.54A2 2 0 1 1 7.77 2.7l.06.06c.42.42 1 .66 1.64.66h.09c.6 0 1-.3 1.3-.74.3-.44.35-1 .12-1.47A2 2 0 1 1 14 2.3l-.06.06c.02.49.23.95.61 1.33.38.38.84.59 1.33.61.02 0 .03 0 .05 0z"/></svg>
                  </span>
                  <span className="label">How it works</span>
                </a>
              </li>

              <li>
                <a href="#team" className="side-link">
                  <span className="icon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </span>
                  <span className="label">Team</span>
                </a>
              </li>
            </ul>
          </nav>
  </aside>
  {/* backdrop for mobile sidebar */}
  {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-hidden />}

        <main className="main-content">
          <LaunchProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/research-tools" element={<ResearchTool />} />
              <Route path="/community" element={<Community />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </LaunchProvider>
        </main>
      </div>

      <Footer />
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

function ThemeToggle() {
  // small inline component that uses useTheme; kept in this file for convenience
  try {
    const { theme, toggle } = useTheme();
    return (
      <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">{theme === 'dark' ? '🌙' : '☀️'}</button>
    );
  } catch {
    return <></>;
  }
}
