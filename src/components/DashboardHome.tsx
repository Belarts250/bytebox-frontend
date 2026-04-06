import React from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Image as ImageIcon,
  Video,
  HardDrive,
  ArrowUpRight,
  MoreVertical,
  Download,
  Share2,
  ShieldCheck,
  Zap,
  Plus
} from 'lucide-react';

export const DashboardHome = ({ onUpload }: { onUpload: () => void }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const stats = [
    { label: 'Documents', count: '124', size: '1.2 GB', color: 'bg-blue-500', icon: <FileText className="w-5 h-5 text-white" /> },
    { label: 'Images', count: '452', size: '2.8 GB', color: 'bg-emerald-500', icon: <ImageIcon className="w-5 h-5 text-white" /> },
    { label: 'Videos', count: '12', size: '1.5 GB', color: 'bg-amber-500', icon: <Video className="w-5 h-5 text-white" /> },
    { label: 'Cloud Space', count: '18%', size: '5.5 / 30 GB', color: 'bg-indigo-500', icon: <HardDrive className="w-5 h-5 text-white" /> },
  ];

  const recentFiles = [
    { name: 'Passport_Copy.pdf', type: 'PDF', date: 'Just now', size: '1.2 MB', icon: <FileText className="text-red-500" /> },
    { name: 'House_Contract_Signed.pdf', type: 'PDF', date: '3 hours ago', size: '4.5 MB', icon: <FileText className="text-red-500" /> },
    { name: 'Vacation_Photo_01.jpg', type: 'JPG', date: 'Yesterday', size: '3.2 MB', icon: <ImageIcon className="text-emerald-500" /> },
    { name: 'Birthday_Greeting.mp4', type: 'MP4', date: 'Jan 28, 2026', size: '12.8 MB', icon: <Video className="text-purple-500" /> },
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Hello, {user.firstName}</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">Everything in your personal vault is secure.</p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-green-500" />
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Vault status: Encrypted</span>
        </div>
        <button 
          onClick={onUpload}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Quick Upload
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${stat.color} rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-${stat.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <button className="text-slate-300 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stat.count}</h3>
              <span className="text-sm font-bold text-slate-400">{stat.size}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Recent Files */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Recent Items</h2>
            <button className="text-sm font-extrabold text-blue-600 hover:text-blue-700 transition-colors">View all files</button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {recentFiles.map((file, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors shadow-sm">
                      {file.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 transition-colors">{file.name}</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{file.type} • {file.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-slate-400">{file.date}</span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Vault Health</h2>

          <div className="bg-[#001f3f] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-950/20">
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold mb-2">Everything's Backed Up</h3>
                <p className="text-blue-100/60 text-base leading-relaxed">Your files are mirrored across three secure data centers worldwide.</p>
              </div>
              <div className="pt-2">
                <button className="w-full bg-white text-[#001f3f] py-4 rounded-2xl font-extrabold hover:bg-blue-50 transition-colors">
                  Sync Settings
                </button>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4">Security Suggestion</h3>
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🛡️</span>
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                You haven't changed your master password in 6 months. Consider updating it for better security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
