import { useState } from 'react';
import Loader from './Loader';

export default function BulkLeadForm({ onResults, onError }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const lineCount = text.split('\n').filter((l) => l.trim()).length;

  const handleSubmit = async () => {
    setValidationError('');
    if (!text.trim()) {
      setValidationError('Please enter at least one URL.');
      return;
    }
    if (lineCount > 20) {
      setValidationError('Maximum 20 leads per bulk request.');
      return;
    }

    setLoading(true);
    try {
      const { leadService } = await import('../servises/Lead.servises');
      const result = await leadService.bulkAnalyze(text);
      onResults(result?.data || []);
      setText('');
    } catch (err) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSampleData = () => {
    setText(`https://www.stripe.com\nhttps://www.notion.so\nhttps://www.figma.com`);
  };

  return (
    <div className="card rounded-2xl p-6 fade-up fade-up-delay-1">
      {/* Card header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: 'rgba(100,160,255,0.08)',
            border: '1px solid rgba(100,160,255,0.2)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1" stroke="#64a0ff" strokeWidth="1.5" />
            <rect x="9" y="2" width="5" height="5" rx="1" stroke="#64a0ff" strokeWidth="1.5" />
            <rect x="2" y="9" width="5" height="5" rx="1" stroke="#64a0ff" strokeWidth="1.5" />
            <rect x="9" y="9" width="5" height="5" rx="1" stroke="#64a0ff" strokeWidth="1.5" />
          </svg>
        </div>
        <div>
          <h2
            className="text-sm font-semibold text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Bulk Lead Analysis
          </h2>
          <p className="text-xs" style={{ color: '#8b95a9' }}>
            Analyze up to 20 leads at once
          </p>
        </div>
        <span className="ml-auto badge badge-info">BATCH</span>
      </div>

      <hr className="divider mb-5" />

      {/* Textarea */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <label className="section-label">URLs (one per line)</label>
          <div className="flex items-center gap-3">
            {lineCount > 0 && (
              <span
                className="text-xs"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: lineCount > 20 ? '#ff5f57' : '#00ff88',
                  fontSize: '0.65rem',
                }}
              >
                {lineCount}/20 leads
              </span>
            )}
            <button
              onClick={handleSampleData}
              className="text-xs px-2.5 py-1 rounded-full transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: '#8b95a9',
              }}
            >
              Load Sample
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setValidationError('');
          }}
          placeholder={'https://company1.com\nhttps://company2.com\nhttps://company3.com'}
          rows={6}
          className="input-field textarea w-full rounded-xl px-4 py-3 text-sm font-mono"
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', lineHeight: '1.7' }}
          disabled={loading}
        />
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

      {/* Info hint */}
      <div
        className="flex items-start gap-2 mb-5 px-3 py-2.5 rounded-xl"
        style={{ background: 'rgba(100,160,255,0.05)', border: '1px solid rgba(100,160,255,0.12)' }}
      >
        <svg
          className="flex-shrink-0 mt-0.5"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <circle cx="6" cy="6" r="5" stroke="#64a0ff" strokeWidth="1.2" />
          <path d="M6 5v4M6 3.5v.5" stroke="#64a0ff" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <p className="text-xs" style={{ color: '#64a0ff', opacity: 0.8 }}>
          Enter each website URL on a new line. URLs without{' '}
          <code
            className="mx-0.5"
            style={{ background: 'rgba(255,255,255,0.08)', padding: '0 4px', borderRadius: 3 }}
          >
            https://
          </code>{' '}
          will be processed automatically.
        </p>
      </div>

      {/* Analyze button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !text.trim() || lineCount > 20}
        className="w-full rounded-xl py-3 text-sm flex items-center justify-center gap-2 font-semibold transition-all"
        style={{
          fontFamily: 'Syne, sans-serif',
          background: 'linear-gradient(135deg, rgba(100,160,255,0.2), rgba(100,160,255,0.1))',
          border: '1px solid rgba(100,160,255,0.3)',
          color: loading || !text.trim() ? 'rgba(100,160,255,0.4)' : '#64a0ff',
          cursor: loading || !text.trim() ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => {
          if (!loading && text.trim()) {
            e.currentTarget.style.background =
              'linear-gradient(135deg, rgba(100,160,255,0.3), rgba(100,160,255,0.15))';
            e.currentTarget.style.borderColor = 'rgba(100,160,255,0.5)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            'linear-gradient(135deg, rgba(100,160,255,0.2), rgba(100,160,255,0.1))';
          e.currentTarget.style.borderColor = 'rgba(100,160,255,0.3)';
        }}
      >
        {loading ? (
          <>
            <Loader size="sm" text="" />
            <span>
              Analyzing {lineCount} Lead{lineCount !== 1 ? 's' : ''}...
            </span>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect
                x="1.5"
                y="1.5"
                width="4"
                height="4"
                rx="0.5"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <rect
                x="8.5"
                y="1.5"
                width="4"
                height="4"
                rx="0.5"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <rect
                x="1.5"
                y="8.5"
                width="4"
                height="4"
                rx="0.5"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <rect
                x="8.5"
                y="8.5"
                width="4"
                height="4"
                rx="0.5"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
            Analyze {lineCount > 0 ? `${lineCount} ` : ''}Leads
          </>
        )}
      </button>
    </div>
  );
}
