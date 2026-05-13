import { useState } from 'react';

export default function Navbar({ apiStatus }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(10,12,16,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="relative flex-shrink-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,255,136,0.05))',
                  border: '1px solid rgba(0,255,136,0.3)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 12L6 7L9 10L13 4"
                    stroke="#00ff88"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="13" cy="4" r="1.5" fill="#00ff88" />
                  <circle cx="2" cy="12" r="1.5" fill="rgba(0,255,136,0.4)" />
                </svg>
              </div>
              {/* Glow dot */}
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full glow-ring"
                style={{ background: '#00ff88' }}
              />
            </div>

            <div>
              <h1
                className="text-sm font-bold leading-none text-white"
                style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}
              >
                Sales Intelligence
              </h1>
              <p
                className="text-xs leading-none mt-0.5"
                style={{
                  color: '#00ff88',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                }}
              >
                AUTOMATOR
              </p>
            </div>
          </div>

          {/* Center nav — desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {['Dashboard', 'Analyze', 'Saved Leads'].map((item) => (
              <button
                key={item}
                className="px-4 py-2 rounded-lg text-sm transition-all duration-150"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  color: '#8b95a9',
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.05)';
                  e.target.style.color = '#e8ecf4';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#8b95a9';
                }}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* API Status indicator */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background:
                  apiStatus === 'online'
                    ? 'rgba(0,255,136,0.08)'
                    : apiStatus === 'offline'
                      ? 'rgba(255,95,87,0.08)'
                      : 'rgba(255,255,255,0.04)',
                border: `1px solid ${apiStatus === 'online' ? 'rgba(0,255,136,0.2)' : apiStatus === 'offline' ? 'rgba(255,95,87,0.2)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background:
                    apiStatus === 'online'
                      ? '#00ff88'
                      : apiStatus === 'offline'
                        ? '#ff5f57'
                        : '#8b95a9',
                  boxShadow: apiStatus === 'online' ? '0 0 6px rgba(0,255,136,0.6)' : 'none',
                  animation: apiStatus === 'online' ? 'glow-ring 2s infinite' : 'none',
                }}
              />
              <span
                className="text-xs"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color:
                    apiStatus === 'online'
                      ? '#00ff88'
                      : apiStatus === 'offline'
                        ? '#ff5f57'
                        : '#8b95a9',
                  fontSize: '0.65rem',
                }}
              >
                {apiStatus === 'online'
                  ? 'API ONLINE'
                  : apiStatus === 'offline'
                    ? 'API OFFLINE'
                    : 'CONNECTING...'}
              </span>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                {mobileOpen ? (
                  <path
                    d="M3 3L13 13M13 3L3 13"
                    stroke="#8b95a9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    <line
                      x1="2"
                      y1="5"
                      x2="14"
                      y2="5"
                      stroke="#8b95a9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="2"
                      y1="8"
                      x2="14"
                      y2="8"
                      stroke="#8b95a9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="2"
                      y1="11"
                      x2="14"
                      y2="11"
                      stroke="#8b95a9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(10,12,16,0.95)' }}
        >
          {['Dashboard', 'Analyze', 'Saved Leads'].map((item) => (
            <button
              key={item}
              className="block w-full text-left px-4 py-3 rounded-lg text-sm mb-1 transition-all"
              style={{ color: '#8b95a9', fontFamily: 'DM Sans, sans-serif' }}
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </button>
          ))}
          {/* Mobile API status */}
          <div className="flex items-center gap-2 px-4 pt-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: apiStatus === 'online' ? '#00ff88' : '#ff5f57' }}
            />
            <span
              className="text-xs"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                color: '#8b95a9',
                fontSize: '0.65rem',
              }}
            >
              {apiStatus === 'online' ? 'API ONLINE' : 'API OFFLINE'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
