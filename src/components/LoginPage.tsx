import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft, Github, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      let data;

      try {
        data = await response.json();
      } catch {
        data = { message: "Invalid server response" };
      }

      if (!response.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      console.log("Login success:", data);

      // Save user and token if backend returns them
      if (data.email) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      setIsLoading(false);

      onLoginSuccess();

    } catch (error) {

      console.error(error);
      setError("Cannot connect to server");
      setIsLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left side - Visuals */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#001f3f] p-16 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
              <div className="w-7 h-7 bg-[#001f3f] rounded-lg" />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">DocuVault</span>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1667372283496-893f0b1e7c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHNlY3VyZSUyMGNsb3VkJTIwc3RvcmFnZSUyMHBlcnNvbmFsfGVufDF8fHx8MTc2OTc4NzM0NXww"
              alt="Secure Storage"
              className="w-full aspect-video object-cover"
            />
          </div>
          <div>
            <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">Your personal vault, <br />always within reach.</h2>
            <p className="text-blue-100/70 text-xl max-w-lg leading-relaxed">Secure access to your sensitive documents and memories with bank-grade encryption.</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-32 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px]" />
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white sm:p-12 lg:p-24">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          <button
            onClick={() => onNavigate('landing')}
            className="mb-12 flex items-center gap-2 text-gray-400 hover:text-[#001f3f] transition-colors font-bold group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-[#001f3f] mb-4">Welcome Back</h1>
            <p className="text-gray-500 text-lg">Enter your details to access your personal vault.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-700">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-14 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="remember" className="w-5 h-5 rounded-[0.5rem] border-gray-300 text-blue-600 cursor-pointer" />
              <label htmlFor="remember" className="text-base text-gray-600 cursor-pointer">Keep me logged in</label>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-2xl"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              disabled={isLoading}
              className="w-full py-5 bg-[#001f3f] text-white rounded-[1.5rem] font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-900 transition-all shadow-xl shadow-blue-950/20 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Log In"
              )}
            </button>

            <div className="relative py-4 flex items-center justify-center">
              <div className="w-full border-t border-gray-100" />
              <span className="px-4 bg-white text-gray-400 font-bold text-xs uppercase tracking-widest absolute">Or</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-[1.25rem] hover:bg-gray-50 transition-all font-bold text-gray-700 text-sm">
                <Globe className="w-5 h-5" /> Google
              </button>
              <button type="button" className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-[1.25rem] hover:bg-gray-50 transition-all font-bold text-gray-700 text-sm">
                <Github className="w-5 h-5" /> Github
              </button>
            </div>
          </form>

          <p className="mt-12 text-center text-gray-500 text-lg">
            New here?
            <button onClick={() => onNavigate('register')} className="ml-2 text-blue-600 font-extrabold hover:underline">Create an account</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
