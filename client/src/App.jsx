import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    import('./api/leadApi').then(({ checkHealth }) => {
      checkHealth()
        .then(() => setApiStatus('online'))
        .catch(() => setApiStatus('offline'));
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar apiStatus={apiStatus} />
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
}
