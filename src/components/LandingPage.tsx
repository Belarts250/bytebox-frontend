import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Shield, 
  Share2, 
  Search, 
  Layout, 
  HardDrive, 
  Clock, 
  ArrowRight,
  Menu,
  X,
  Mail,
  Send,
  User,
  MessageSquare
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      await res.json();
      setFormStatus('sent');
      
      // Reset form fields
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert('Failed to send message. Please try again later.');
      setFormStatus('idle');
    }
  };

  const features = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Personal Archives",
      description: "Keep all your personal documents, tax files, and medical records in one organized vault."
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Private & Secure",
      description: "State-of-the-art encryption ensures your private data stays exactly that—private."
    },
    {
      icon: <Share2 className="w-6 h-6 text-blue-600" />,
      title: "Easy Access",
      description: "Sync your files across your phone, tablet, and computer for instant access anywhere."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="w-10 h-10 bg-[#001f3f] rounded-xl flex items-center justify-center">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#001f3f] tracking-tight">DocuVault</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              <a href="#features" className="text-gray-600 hover:text-[#001f3f] transition-colors font-medium">Features</a>
              <a href="#contact" className="text-gray-600 hover:text-[#001f3f] transition-colors font-medium">Contact Us</a>
              <button 
                onClick={() => onNavigate('login')}
                className="text-[#001f3f] font-bold hover:opacity-80 transition-opacity"
              >
                Login
              </button>
              <button 
                onClick={() => onNavigate('get-started')}
                className="bg-[#001f3f] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/10"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-gray-100 px-6 py-8 flex flex-col gap-6"
          >
            <a href="#features" className="text-gray-600 font-medium">Features</a>
            <a href="#contact" className="text-gray-600 font-medium">Contact Us</a>
            <button onClick={() => onNavigate('login')} className="text-left font-bold text-[#001f3f]">Login</button>
            <button onClick={() => onNavigate('get-started')} className="bg-[#001f3f] text-white px-6 py-3 rounded-xl font-bold">Get Started</button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 lg:pt-56 lg:pb-40 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8">
              <Shield className="w-4 h-4" />
              <span>Personal Secure Storage</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-[#001f3f] leading-[1.1] mb-8">
              The only vault your <span className="text-blue-600">personal life</span> needs.
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Securely store your identification, financial documents, and family memories in a private cloud environment designed for individuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button 
                onClick={() => onNavigate('get-started')}
                className="bg-[#001f3f] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-blue-900 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-950/20 group"
              >
                Get Started for Free
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1760604359590-0f0dc7dbbf3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMGhvbWUlMjBvZmZpY2UlMjBvcmdhbml6YXRpb24lMjBtaW5pbWFsfGVufDF8fHx8MTc2OTc4NzM0NXww" 
                alt="Personal Home Office"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </div>
            {/* Floating UI elements */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-4 bg-white p-6 rounded-3xl shadow-2xl border border-gray-50 flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                <Shield className="text-green-600 w-8 h-8" />
              </div>
              <div>
                <p className="text-base font-bold text-gray-900">100% Private</p>
                <p className="text-sm text-gray-500">Zero-knowledge encryption</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 bg-slate-50 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#001f3f] mb-6">Built for your daily life</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Stop searching through emails and drawers. Find what you need instantly.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="mb-8 p-4 w-fit rounded-[1.25rem] bg-blue-50">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#001f3f] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-32 px-6 sm:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-20">
          <div className="flex-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#001f3f] mb-8">Simple organization for busy people</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              We've stripped away the complexity of enterprise tools to give you exactly what you need: a clean, fast, and secure place for your life's paperwork.
            </p>
            <div className="space-y-8">
              {[
                { title: "Intelligent Search", desc: "Find any receipt or letter by typing a single keyword.", icon: <Search className="w-6 h-6 text-blue-600" /> },
                { title: "History Logs", desc: "See exactly when you last accessed or edited a file.", icon: <Clock className="w-6 h-6 text-blue-600" /> },
                { title: "No Clutter", desc: "A minimal interface focused on your content.", icon: <HardDrive className="w-6 h-6 text-blue-600" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#001f3f]">{item.title}</h4>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
             <ImageWithFallback 
                src="https://images.unsplash.com/photo-1664574654529-b60630f33fdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwcGVyc29uJTIwdXNpbmclMjBsYXB0b3AlMjBhdCUyMGhvbWUlMjBjb3p5fGVufDF8fHx8MTc2OTc4NzM0NXww" 
                alt="Personal Use"
                className="w-full h-auto rounded-[2.5rem] shadow-2xl"
              />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-32 bg-slate-50 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-[#001f3f] p-12 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <p className="text-blue-100 opacity-80 mb-10">Have questions about our security? We're here to help you secure your digital life.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>support@docuvault.io</span>
                </div>
                <div className="flex items-center gap-4">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  <span>24/7 Priority Support</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Layout className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="flex-1 p-12">
            {formStatus === 'sent' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#001f3f]">Message Sent!</h3>
                <p className="text-gray-500">We'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input type="text" required placeholder="John Doe" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input type="email" required placeholder="john@example.com" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Message</label>
                  <textarea required rows={4} placeholder="How can we help?" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={formStatus === 'sending'}
                  className="w-full bg-[#001f3f] text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-900 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {formStatus === 'sending' ? 'Sending...' : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#001f3f] rounded-xl flex items-center justify-center">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#001f3f]">DocuVault</span>
          </div>
          <p className="text-gray-500 text-base">© 2026 DocuVault Systems Inc. Built for you.</p>
          <div className="flex gap-10">
            <a href="#" className="text-gray-400 hover:text-[#001f3f] font-medium">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#001f3f] font-medium">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
