import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { GetStartedPage } from './components/GetStartedPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardHome } from './components/DashboardHome';
import { FilesView } from './components/FilesView';
import { SettingsPage } from './components/SettingsPage';
import { AnimatePresence, motion } from 'motion/react';

type Page = 'landing' | 'get-started' | 'login' | 'register' | 'dashboard' | 'documents' | 'images' | 'videos' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sync state when login/logout happens
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  // Simple Router Logic
  const renderPage = () => {
    if (isLoggedIn) {
      return (
        <DashboardLayout 
          activeTab={currentPage === 'dashboard' ? 'dashboard' : currentPage} 
          setActiveTab={(tab) => setCurrentPage(tab as Page)}
          onLogout={handleLogout}
        >
          {currentPage === 'dashboard' && <DashboardHome />}
          {currentPage === 'documents' && <FilesView type="documents" />}
          {currentPage === 'images' && <FilesView type="images" />}
          {currentPage === 'videos' && <FilesView type="videos" />}
          {currentPage === 'settings' && <SettingsPage />}
        </DashboardLayout>
      );
    }

    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'get-started':
        return <GetStartedPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} onLoginSuccess={handleLoginSuccess} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentPage} onRegisterSuccess={handleLoginSuccess} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage + (isLoggedIn ? '-auth' : '-public')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
