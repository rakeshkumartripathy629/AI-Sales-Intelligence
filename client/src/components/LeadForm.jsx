import { useState } from 'react';
import Loader from './Loader';

export default function LeadForm({ onResult, onError }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const isValidUrl = (str) => {
    try {
      const u = new URL(str.startsWith('http') ? str : `https://${str}`);
      return u.hostname.includes('.');
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    setValidationError('');
    const trimmed = url.trim();
    if (!trimmed) {
      setValidationError('Please enter a URL.');
      return;
    }
    if (!isValidUrl(trimmed)) {
      setValidationError('Please enter a valid website URL.');
      return;
    }

    setLoading(true);
    try {
      const { leadService } = await import('../servises/Lead.servises');
      const result = await leadService.analyzeLead(trimmed);
      onResult(result?.data || result);
      setUrl('');
    } catch (err) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="card rounded-2xl p-6 fade-up">
      {/* Card header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="5" stroke="#00ff88" strokeWidth="1.5" />
            <path d="M8 5v3l2 2" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <h2
            className="text-sm font-semibold text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Single Lead Analysis
          </h2>
          <p className="text-xs" style={{ color: '#8b95a9' }}>
            Analyze one company website at a time
          </p>
        </div>
        <span className="ml-auto badge badge-success">LIVE</span>
      </div>

      <hr className="divider mb-5" />

      {/* URL Input */}
      <div className="space-y-2 mb-4">
        <label className="section-label block">Website URL</label>
        <div className="relative">
          {/* URL prefix icon */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1C3.69 1 1 3.69 1 7s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"
                stroke="#4a5568"
                strokeWidth="1.2"
              />
              <path
                d="M1 7h12M7 1c-1.5 2-2.5 4-2.5 6s1 4 2.5 6M7 1c1.5 2 2.5 4 2.5 6S8.5 11 7 13"
                stroke="#4a5568"
                strokeWidth="1.2"
              />
            </svg>
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setValidationError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="https://www.example.com"
            className="input-field w-full rounded-xl pl-9 pr-4 py-3 text-sm"
            disabled={loading}
          />
        </div>
        {validationError && (
          <p className="text-xs flex items-center gap-1.5" style={{ color: '#ff5f57' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#ff5f57" strokeWidth="1.2" />
              <path
                d="M6 3.5v3M6 8.5v.5"
                stroke="#ff5f57"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            {validationError}
          </p>
        )}
      </div>

      {/* Example hints */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        <span className="text-xs mr-1" style={{ color: '#4a5568' }}>
          Try:
        </span>
        {['https://stripe.com', 'https://notion.so', 'https://figma.com'].map((ex) => (
          <button
            key={ex}
            onClick={() => setUrl(ex)}
            className="text-xs px-2.5 py-1 rounded-full transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#8b95a9',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'rgba(0,255,136,0.3)';
              e.target.style.color = '#00ff88';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.07)';
              e.target.style.color = '#8b95a9';
            }}
          >
            {ex.replace('https://', '')}
          </button>
        ))}
      </div>

      {/* Analyze button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !url.trim()}
        className="btn-primary w-full rounded-xl py-3 text-sm flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader size="sm" text="" />
            <span>Analyzing Lead...</span>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Analyze Lead
          </>
        )}
      </button>
    </div>
  );
}
