import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Home } from './components/Home';
import { About } from './components/About';
import { Contact } from './components/Contact';
import ResearchTool from './components/researchtool';
import Community from './components/community';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="top-nav">
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
        </div>
      </div>

      <div className="app-layout">
        <aside className="side-bar">
          <nav>
            <ul>
                <li><Link to="/dashboard" className="side-link">Advanced Analysis</Link></li>
                <li>
                  <a
                    href="https://exoclassifiergit-af2wfqnc548f76gsgr5g3u.streamlit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="side-link"
                  >
                    Exoclassifier
                  </a>
                </li>
                <li><Link to="/research-tools" className="side-link">Research Tools</Link></li>
                <li><Link to="/community" className="side-link">Education &amp; Community</Link></li>
                <li><a href="#features" className="side-link">Features</a></li>
                <li><a href="#how-it-works" className="side-link">How it works</a></li>
                <li><a href="#team" className="side-link">Team</a></li>
              </ul>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/research-tools" element={<ResearchTool />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
