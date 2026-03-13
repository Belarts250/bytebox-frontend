import React from 'react';
import { motion } from 'motion/react';
import { LogIn, UserPlus, ArrowLeft, ShieldCheck, Globe, Zap } from 'lucide-react';

interface GetStartedPageProps {
  onNavigate: (page: string) => void;
}

export const GetStartedPage: React.FC<GetStartedPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <button 
          onClick={() => onNavigate('landing')}
          className="mb-8 flex items-center gap-2 text-gray-500 hover:text-[#001f3f] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-[#001f3f] mb-4"
          >
            Ready to secure your documents?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Choose how you'd like to proceed with DocuVault today.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center group cursor-pointer"
            onClick={() => onNavigate('login')}
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#001f3f] group-hover:text-white transition-colors text-blue-600">
              <LogIn className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#001f3f] mb-3">Welcome Back</h2>
            <p className="text-gray-600 mb-8">Access your existing secure vault and documents immediately.</p>
            <button className="w-full py-4 bg-[#001f3f] text-white rounded-xl font-bold hover:bg-blue-900 transition-colors">
              Login to Account
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center group cursor-pointer"
            onClick={() => onNavigate('register')}
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
              <UserPlus className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#001f3f] mb-3">New Member</h2>
            <p className="text-gray-600 mb-8">Create your private workspace and start managing files securely.</p>
            <button className="w-full py-4 bg-white text-[#001f3f] border-2 border-[#001f3f] rounded-xl font-bold hover:bg-slate-50 transition-colors">
              Create New Account
            </button>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: <ShieldCheck className="w-5 h-5 mx-auto mb-2 text-green-600" />, label: "Encrypted Storage" },
            { icon: <Globe className="w-5 h-5 mx-auto mb-2 text-blue-600" />, label: "Global Access" },
            { icon: <Zap className="w-5 h-5 mx-auto mb-2 text-amber-500" />, label: "Instant Uploads" }
          ].map((item, i) => (
            <div key={i} className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
