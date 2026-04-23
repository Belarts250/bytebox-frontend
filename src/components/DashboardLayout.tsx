import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Moon, 
  Sun,
  ChevronDown,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab,
  onLogout 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'My Vault', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-5 h-5" /> },
    { id: 'images', label: 'Images', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'videos', label: 'Videos', icon: <Video className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = (user.firstName?.charAt(0) || "") + (user.lastName?.charAt(0) || "");
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();


  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
      {/* Sidebar */}
      <aside className="w-72 bg-[#001f3f] text-white flex flex-col fixed h-full z-20">
        <div className="p-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-md" />
            </div>
            <span className="text-2xl font-bold tracking-tight">DocuVault</span>
          </div>
        </div>

        <nav className="flex-1 px-6 py-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] transition-all font-bold ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' 
                : 'text-blue-100/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {activeTab === item.id && (
                <motion.div layoutId="activePill" className="ml-auto w-2 h-2 rounded-full bg-white shadow-sm" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-red-300 font-bold hover:text-red-100 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <header className="h-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-12 flex items-center justify-between sticky top-0 z-10">
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search your vault..." 
                className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button 
              onClick={toggleTheme}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-red-500 rounded-full border-[3px] border-white dark:border-slate-900" />
            </button>

            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-4 p-2 pr-4 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-blue-600/20">
                  {initials}
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white">{fullName}</p>
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Personal Account</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProfileOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-2.5 overflow-hidden"
                >
                  <button className="w-full text-left px-5 py-3 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300 transition-colors">Profile Details</button>
                  <button className="w-full text-left px-5 py-3 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300 transition-colors">Security</button>
                  <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-2" />
                  <button onClick={onLogout} className="w-full text-left px-5 py-3 text-sm font-bold hover:bg-red-50 text-red-600 rounded-xl transition-colors">Log Out</button>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-12 flex-1">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Global Upload FAB with Tooltip and Modal */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={() => setActiveTab('add-file')}
              className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 text-white rounded-[1.5rem] shadow-2xl shadow-blue-600/40 flex items-center justify-center hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 group z-50"
            >
              <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="font-bold">
            add new item
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
