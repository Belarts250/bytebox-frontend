import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { GetStartedPage } from './components/GetStartedPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardHome } from './components/DashboardHome';
import { FilesView } from './components/FilesView';
import { SettingsPage } from './components/SettingsPage';
import { AddFilePage } from './components/AddFilePage';
import { AnimatePresence, motion } from 'motion/react';

type Page = 'landing' | 'get-started' | 'login' | 'register' | 'dashboard' | 'documents' | 'images' | 'videos' | 'settings' | 'add-file';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
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
          {currentPage === 'dashboard' && <DashboardHome onUpload={() => setCurrentPage('add-file')} />}
          {currentPage === 'documents' && <FilesView type="documents" onUpload={() => setCurrentPage('add-file')} />}
          {currentPage === 'images' && <FilesView type="images" onUpload={() => setCurrentPage('add-file')} />}
          {currentPage === 'videos' && <FilesView type="videos" onUpload={() => setCurrentPage('add-file')} />}
          {currentPage === 'settings' && <SettingsPage />}
          {currentPage === 'add-file' && <AddFilePage onBack={() => setCurrentPage('dashboard')} />}
        </DashboardLayout>
      );
    }

    const navigate = (page: string) => setCurrentPage(page as Page);

    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      case 'get-started':
        return <GetStartedPage onNavigate={navigate} />;
      case 'login':
        return <LoginPage onNavigate={navigate} onLoginSuccess={handleLoginSuccess} />;
      case 'register':
        return <RegisterPage onNavigate={navigate} onRegisterSuccess={handleLoginSuccess} />;
      default:
        return <LandingPage onNavigate={navigate} />;
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
