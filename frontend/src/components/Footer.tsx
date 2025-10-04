import React from 'react';
import './Home.css';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-left">© {new Date().getFullYear()} TerraQuest</div>
        <div className="footer-right">
          <a href="/about">About</a>
          <span className="sep">·</span>
          <a href="/contact">Contact</a>
          <span className="sep">·</span>
          <a href="https://github.com/MonishRaman/TerraQuest" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
