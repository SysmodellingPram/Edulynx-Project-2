
import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import GetStartedPage from './pages/GetStartedPage';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import DocumentsPage from './pages/DocumentsPage';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/login');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Determine main view based on hash
  const renderMainView = () => {
    switch (currentHash) {
      case '#/login':
        return <LoginPage />;
      case '#/get-started':
        return <GetStartedPage />;
      default:
        return (
          <div className="flex h-screen bg-[#F9FAFB]">
            <Sidebar activePage={activePage} onNavigate={setActivePage} />
            <main className="flex-1 overflow-y-auto">
              {activePage === 'dashboard' && <DashboardPage />}
              {activePage === 'chat' && <ChatPage />}
              {activePage === 'documents' && <DocumentsPage />}
              {activePage === 'profile' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold">My Profile</h2>
                  <p className="text-[#4B5563] mt-4">Profile management feature coming soon.</p>
                </div>
              )}
            </main>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderMainView()}
    </div>
  );
};

export default App;
