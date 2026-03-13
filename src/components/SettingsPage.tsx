import React, { useState } from 'react';
import { User, Shield, Bell, Globe, Moon, ChevronRight, Save, Key, Smartphone } from 'lucide-react';

export const SettingsPage = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Personal User'
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = (user.firstName?.charAt(0) || "") + (user.lastName?.charAt(0) || "");
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return (
    <div className="max-w-5xl space-y-12 pb-24">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Settings</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">Manage your vault preferences and account security.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        {/* Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
            { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
            { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
            { id: 'devices', label: 'Devices', icon: <Smartphone className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-bold transition-all ${
                item.id === 'profile' 
                ? 'bg-[#001f3f] text-white shadow-xl shadow-blue-900/20' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-transparent hover:border-slate-100'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-10">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-10 sm:p-12 shadow-sm">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-10">Personal Information</h3>
            <form className="space-y-10">
              <div className="flex flex-col sm:flex-row gap-8 items-center mb-12">
                <div className="w-24 h-24 rounded-[2.5rem] bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-600/20">
                  {initials}
                </div>
                <div className="text-center sm:text-left">
                  <button type="button" className="px-6 py-3 bg-[#001f3f] text-white rounded-xl font-bold text-sm hover:bg-blue-900 transition-all">
                    Update Photo
                  </button>
                  <p className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">Recommended: 400x400px</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    readOnly
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-400 cursor-not-allowed outline-none font-bold"
                  />
                </div>
              </div>

              <div className="pt-10 border-t border-slate-50 dark:border-slate-800 flex justify-end">
                <button 
                  type="button"
                  className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-3"
                >
                  <Save className="w-5 h-5" />
                  Save Settings
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-10 sm:p-12 shadow-sm">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-10">Vault Preferences</h3>
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white">Dark Interface</p>
                  <p className="text-base text-slate-500">Automatically switch theme based on system settings.</p>
                </div>
                <div className="w-16 h-8 bg-slate-100 dark:bg-slate-800 rounded-full p-1.5 relative cursor-pointer group">
                  <div className="w-5 h-5 bg-[#001f3f] dark:bg-blue-500 rounded-full transition-all group-hover:scale-110" />
                </div>
              </div>
              <div className="h-[1px] bg-slate-50 dark:bg-slate-800" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white">Master Key Rotation</p>
                  <p className="text-base text-slate-500">Enable quarterly prompts to rotate your encryption keys.</p>
                </div>
                <button className="text-sm font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest">Configure</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
