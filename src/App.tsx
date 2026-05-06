import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { GetStartedPage } from './components/GetStartedPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardHome } from './components/DashboardHome';
import { FilesView } from './components/FilesView';
import { SettingsPage } from './components/SettingsPage';
import { AddFilePage } from './components/AddFilePage';
import { AnimatePresence, motion } from 'framer-motion';

type Page =
  | 'landing'
  | 'get-started'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'documents'
  | 'images'
  | 'videos'
  | 'settings'
  | 'add-file';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 important for refreshing files after upload/delete
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshFiles = () => setRefreshKey(prev => prev + 1);

  // =========================
  // AUTH HANDLERS
  // =========================
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  // =========================
  // DASHBOARD CONTENT
  // =========================
  const renderDashboardContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardHome onUpload={() => setCurrentPage('add-file')} />
        );

      case 'documents':
      case 'images':
      case 'videos':
        return (
          <FilesView
            activeTab={currentPage}       // ✅ matches new FilesView
            refreshKey={refreshKey}       // ✅ triggers reload
            onUpload={() => setCurrentPage('add-file')}
          />
        );

      case 'settings':
        return <SettingsPage />;

      case 'add-file':
        return (
          <AddFilePage
            // defaultType="file"
            onBack={() => {
              setCurrentPage('documents'); // go back to list
              refreshFiles();              // 🔥 refresh data
            }}
          />
        );

      default:
        return null;
    }
  };

  // =========================
  // ROUTER
  // =========================
  const renderPage = () => {
    if (isLoggedIn) {
      return (
        <DashboardLayout
          activeTab={currentPage === 'dashboard' ? 'dashboard' : currentPage}
          setActiveTab={(tab) => setCurrentPage(tab as Page)}
          onLogout={handleLogout}
        >
          {renderDashboardContent()}
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
        return (
          <LoginPage
            onNavigate={navigate}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'register':
        return (
          <RegisterPage
            onNavigate={navigate}
            onRegisterSuccess={handleLoginSuccess}
          />
        );
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