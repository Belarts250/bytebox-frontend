import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Shield, Check, ArrowLeft, Loader2, Heart } from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
  onRegisterSuccess: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, onRegisterSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); 

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length > 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength();

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!agree) return;

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("Account created successfully");

    console.log("User created:", data);

    onNavigate('login');

  } catch (error) {
    console.error(error);
    alert("Server error");
  } finally {
    setIsLoading(false);
  }
  };

  return (
    <div className="min-h-screen bg-[#001f3f] flex items-center justify-center p-6 sm:p-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Left Side - Info */}
        <div className="lg:w-2/5 bg-slate-50 p-12 sm:p-16 flex flex-col justify-between">
          <div>
            <button onClick={() => onNavigate('get-started')} className="mb-12 flex items-center gap-2 text-gray-400 hover:text-[#001f3f] transition-colors font-bold group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
            </button>
            <h2 className="text-4xl font-extrabold text-[#001f3f] mb-8">Start your personal vault.</h2>
            <div className="space-y-10">
              {[
                { title: "Everything in one place", desc: "No more hunting through folders and apps.", icon: <User className="text-blue-600" /> },
                { title: "Your privacy, guaranteed", desc: "We never scan or sell your private data.", icon: <Shield className="text-green-600" /> },
                { title: "Built for individuals", desc: "Clean, simple, and powerful enough for you.", icon: <Heart className="text-red-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#001f3f]">{item.title}</h4>
                    <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center p-8 bg-blue-50 rounded-[2rem]">
            <p className="text-sm text-blue-800 font-bold uppercase tracking-widest">Join 50,000+ users</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-12 sm:p-16">
          <h1 className="text-3xl font-extrabold text-[#001f3f] mb-10">Create Account</h1>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">First Name</label>
                <input type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.25rem] focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" required placeholder="Alex" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Name</label>
                <input type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.25rem] focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" required placeholder="Smith" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.25rem] focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" placeholder="alex@example.com" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.25rem] focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" 
                  placeholder="At least 8 characters"
                  required 
                />
              </div>
              {/* Password strength bar */}
              <div className="mt-4 flex gap-2 h-1.5">
                {[25, 50, 75, 100].map((step) => (
                  <div 
                    key={step}
                    className={`flex-1 rounded-full transition-all duration-500 ${
                      strength >= step 
                        ? (strength <= 50 ? 'bg-orange-500' : 'bg-green-500') 
                        : 'bg-gray-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-start gap-4 py-4">
              <input 
                type="checkbox" 
                id="terms" 
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 w-5 h-5 rounded-[0.5rem] border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
              />
              <label htmlFor="terms" className="text-sm text-gray-500 leading-relaxed cursor-pointer">
                I agree to the <span className="text-blue-600 font-bold hover:underline">Terms of Service</span> and <span className="text-blue-600 font-bold hover:underline">Privacy Policy</span>.
              </label>
            </div>

            <button 
              disabled={isLoading || !agree}
              className="w-full py-5 bg-[#001f3f] text-white rounded-[1.5rem] font-bold text-lg shadow-xl shadow-blue-950/20 hover:bg-blue-900 transition-all disabled:opacity-50 disabled:shadow-none"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Create Free Account"}
            </button>

            <p className="text-center text-lg text-gray-500">
              Already have an account? 
              <button type="button" onClick={() => onNavigate('login')} className="ml-2 text-blue-600 font-extrabold hover:underline">Log in</button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
