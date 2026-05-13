export default function Loader({ text = 'Analyzing...', size = 'md' }) {
  const sizes = {
    sm: { ring: 16, dot: 4 },
    md: { ring: 32, dot: 6 },
    lg: { ring: 48, dot: 8 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-2">
      {/* Spinner ring */}
      <div className="relative" style={{ width: s.ring, height: s.ring }}>
        {/* Outer track */}
        <svg
          width={s.ring}
          height={s.ring}
          viewBox={`0 0 ${s.ring} ${s.ring}`}
          style={{ position: 'absolute', inset: 0 }}
        >
          <circle
            cx={s.ring / 2}
            cy={s.ring / 2}
            r={s.ring / 2 - 2}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
          />
        </svg>
        {/* Spinning arc */}
        <svg
          width={s.ring}
          height={s.ring}
          viewBox={`0 0 ${s.ring} ${s.ring}`}
          style={{ position: 'absolute', inset: 0, animation: 'spin 0.8s linear infinite' }}
        >
          <circle
            cx={s.ring / 2}
            cy={s.ring / 2}
            r={s.ring / 2 - 2}
            fill="none"
            stroke="url(#spinGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${(s.ring - 4) * Math.PI * 0.7} ${(s.ring - 4) * Math.PI * 0.3}`}
          />
          <defs>
            <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0" />
              <stop offset="100%" stopColor="#00ff88" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {text && (
        <p
          className="text-xs"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: '#00ff88',
            opacity: 0.7,
            letterSpacing: '0.08em',
          }}
        >
          {text}
        </p>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/** Full page overlay loader */
export function FullPageLoader({ text = 'Processing leads...' }) {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{
        background: 'rgba(10,12,16,0.92)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Animated rings */}
      <div className="relative w-24 h-24 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              inset: `${i * 12}px`,
              border: '1px solid rgba(0,255,136,0.15)',
              animation: `spin ${1.5 + i * 0.5}s linear infinite ${i % 2 === 1 ? 'reverse' : ''}`,
            }}
          />
        ))}
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: '#00ff88',
              boxShadow: '0 0 12px rgba(0,255,136,0.8)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <p
        className="text-white text-lg font-semibold mb-2"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {text}
      </p>
      <p
        className="text-sm"
        style={{
          color: '#8b95a9',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
        }}
      >
        SCRAPING &amp; ANALYZING DATA
      </p>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: 'rgba(0,255,136,0.4)',
              animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

/** Skeleton card loader */
export function CardSkeleton() {
  return (
    <div className="card rounded-2xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
        <div className="skeleton h-6 w-16 ml-4" />
      </div>
      <div className="skeleton h-px w-full" />
      <div className="space-y-2">
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-5/6" />
        <div className="skeleton h-3 w-4/6" />
      </div>
      <div className="flex gap-2 pt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-6 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}
