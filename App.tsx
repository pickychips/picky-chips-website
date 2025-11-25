import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { InvitationModal } from './components/InvitationModal';
import { ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Check local storage for previous session
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('picky_chips_auth');
    if (isAuthenticated === 'true') {
      setView(ViewState.DASHBOARD);
    }
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('picky_chips_auth', 'true');
    setView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    localStorage.removeItem('picky_chips_auth');
    setView(ViewState.LANDING);
  };

  return (
    <>
      {view === ViewState.LANDING && (
        <>
          <LandingPage onOpenInvite={() => setIsInviteModalOpen(true)} />
          <InvitationModal 
            isOpen={isInviteModalOpen} 
            onClose={() => setIsInviteModalOpen(false)}
            onSuccess={handleLoginSuccess}
          />
        </>
      )}
      
      {view === ViewState.DASHBOARD && (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
};

export default App;
