import React, { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

type LaunchFn = (path: string) => void;

const LaunchContext = createContext<LaunchFn | null>(null);

export const useLaunch = () => {
  const ctx = useContext(LaunchContext);
  if (!ctx) throw new Error('useLaunch must be used within LaunchProvider');
  return ctx;
};

export const LaunchProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();
  const [launching, setLaunching] = useState(false);
  const [target, setTarget] = useState<string | null>(null);

  const launchTo = useCallback((path: string) => {
    setTarget(path);
    setLaunching(true);
    // duration matches CSS animation timings
    window.setTimeout(() => {
      setLaunching(false);
      if (path) navigate(path);
      setTarget(null);
    }, 2600);
  }, [navigate]);

  return (
    <LaunchContext.Provider value={launchTo}>
      {children}

      {launching && (
        <div className="splash-root launch-overlay" aria-hidden="false">
          <div className="starfield">
            <div className="stars stars1" />
            <div className="stars stars2" />
            <div className="stars stars3" />
          </div>

          {/* animated planets and debris */}
          <div className="space-objects">
            <div className="planet p1" />
            <div className="planet p2" />
            <div className="satellite" />
            <div className="comet" />
          </div>

          <div className="splash-content">
            <div className="planet-glow" />

            <div className="rocket-wrap animated">
              <div className="rocket">
                <div className="window" />
                <div className="fin left" />
                <div className="fin right" />
                <div className="flame" />
              </div>
            </div>

            <h1 className="splash-title">Launching…</h1>
            <p className="splash-sub">Preparing the destination</p>
          </div>
        </div>
      )}
    </LaunchContext.Provider>
  );
};

export default LaunchProvider;
