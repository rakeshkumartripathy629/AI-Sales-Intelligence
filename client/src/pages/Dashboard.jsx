import { useState } from 'react';
import LeadForm from '../components/LeadForm';
import BulkLeadForm from '../components/BulkLeadForm';
import LeadList from '../components/LeadList';
import { FullPageLoader } from '../components/Loader';

export default function Dashboard() {
  const [results, setResults] = useState([]);
  const [globalError, setGlobalError] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('single'); // single | bulk

  const handleSingleResult = (lead) => {
    setGlobalError(null);
    if (lead) {
      setResults((prev) => [lead, ...prev]);
      setRefreshKey((k) => k + 1);
    }
  };

  const handleBulkResults = (leads) => {
    setGlobalError(null);
    if (leads?.length) {
      setResults((prev) => [...leads, ...prev]);
      setRefreshKey((k) => k + 1);
    }
  };

  const handleError = (msg) => {
    setGlobalError(msg);
    setTimeout(() => setGlobalError(null), 6000);
  };

  const handleLoadingChange = (v) => setGlobalLoading(v);

  const stats = [
    { label: 'Total Analyzed', value: results.length, icon: '📊', color: '#00ff88' },
    {
      label: 'B2B Qualified',
      value: results.filter((r) => r.b2bQualification).length,
      icon: '✅',
      color: '#00ff88',
    },
    {
      label: 'Non-B2B',
      value: results.filter((r) => !r.b2bQualification).length,
      icon: '⊘',
      color: '#ff5f57',
    },
    {
      label: 'Avg Pages Scraped',
      value: results.length
        ? Math.round(results.reduce((a, r) => a + (r.pagesScraped || 0), 0) / results.length)
        : 0,
      icon: '📄',
      color: '#64a0ff',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {globalLoading && <FullPageLoader />}

      {/* Hero section */}
      <div className="mb-10 fade-up">
        <div className="flex items-center gap-2 mb-3">
          <span className="section-label">POWERED BY AI</span>
          <span className="w-8 h-px" style={{ background: 'rgba(0,255,136,0.3)' }} />
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-3"
          style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          Sales Intelligence
          <span style={{ color: '#00ff88' }}> Automator</span>
        </h1>
        <p className="text-sm max-w-xl" style={{ color: '#8b95a9', lineHeight: 1.7 }}>
          Instantly analyze company websites to extract B2B qualification signals, core services,
          target audience insights, and AI-generated sales questions.
        </p>
      </div>

      {/* Stats row */}
      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 fade-up fade-up-delay-1">
          {stats.map(({ label, value, icon, color }) => (
            <div key={label} className="card rounded-2xl px-4 py-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">{icon}</span>
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'Syne, sans-serif', color }}
                >
                  {value}
                </span>
              </div>
              <p
                className="text-xs"
                style={{
                  color: '#8b95a9',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.05em',
                }}
              >
                {label.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Global error banner */}
      {globalError && (
        <div
          className="mb-6 rounded-2xl p-4 flex items-start gap-3 fade-up"
          style={{ background: 'rgba(255,95,87,0.06)', border: '1px solid rgba(255,95,87,0.2)' }}
        >
          <svg
            className="flex-shrink-0 mt-0.5"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M8 2L14 13H2L8 2z" stroke="#ff5f57" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M8 6v3M8 11v.5" stroke="#ff5f57" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-medium"
              style={{ color: '#ff5f57', fontFamily: 'Syne, sans-serif' }}
            >
              Error
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,95,87,0.8)' }}>
              {globalError}
            </p>
          </div>
          <button onClick={() => setGlobalError(null)} style={{ color: '#ff5f57', opacity: 0.6 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 2l8 8M10 2l-8 8"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
        {/* Forms column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tab switcher */}
          <div
            className="flex rounded-xl p-1 gap-1"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {[
              {
                id: 'single',
                label: 'Single Lead',
                icon: (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                    <path
                      d="M6 4v2.5l1.5 1.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
              },
              {
                id: 'bulk',
                label: 'Bulk Leads',
                icon: (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect
                      x="1"
                      y="1"
                      width="4"
                      height="4"
                      rx="0.8"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <rect
                      x="7"
                      y="1"
                      width="4"
                      height="4"
                      rx="0.8"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <rect
                      x="1"
                      y="7"
                      width="4"
                      height="4"
                      rx="0.8"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <rect
                      x="7"
                      y="7"
                      width="4"
                      height="4"
                      rx="0.8"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                ),
              },
            ].map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  background: activeTab === id ? 'rgba(0,255,136,0.1)' : 'transparent',
                  border:
                    activeTab === id ? '1px solid rgba(0,255,136,0.2)' : '1px solid transparent',
                  color: activeTab === id ? '#00ff88' : '#8b95a9',
                }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Form content */}
          <div>
            {activeTab === 'single' ? (
              <LeadForm
                onResult={handleSingleResult}
                onError={handleError}
                onLoading={handleLoadingChange}
              />
            ) : (
              <BulkLeadForm
                onResults={handleBulkResults}
                onError={handleError}
                onLoading={handleLoadingChange}
              />
            )}
          </div>

          {/* How it works */}
          <div className="card rounded-2xl p-5">
            <p className="section-label mb-4">How It Works</p>
            <div className="space-y-3">
              {[
                {
                  step: '01',
                  title: 'Submit URL',
                  desc: 'Enter any company website URL to analyze',
                },
                {
                  step: '02',
                  title: 'AI Scrapes',
                  desc: 'Our AI scrapes and reads multiple pages',
                },
                {
                  step: '03',
                  title: 'Analysis',
                  desc: 'Extracts business signals and qualifies leads',
                },
                {
                  step: '04',
                  title: 'Get Insights',
                  desc: 'View detailed B2B profile and sales questions',
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-3">
                  <span
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{
                      background: 'rgba(0,255,136,0.08)',
                      color: '#00ff88',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.6rem',
                    }}
                  >
                    {step}
                  </span>
                  <div>
                    <p
                      className="text-xs font-semibold text-white"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {title}
                    </p>
                    <p className="text-xs" style={{ color: '#8b95a9' }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results column (right) */}
        <div className="lg:col-span-3">
          <LeadList newLeads={results} refreshTrigger={refreshKey} />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{
              color: '#4a5568',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
            }}
          >
            SALES INTELLIGENCE AUTOMATOR · BACKEND http://localhost:5000
          </p>
          <div className="flex items-center gap-4">
            <span
              className="text-xs"
              style={{
                color: '#4a5568',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
              }}
            >
              BUILD v1.0.0
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
