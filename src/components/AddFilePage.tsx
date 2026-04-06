import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, FileText, Shield, Save } from 'lucide-react';
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface AddFilePageProps {
  onBack: () => void;
  defaultType?: 'document' | 'image' | 'video' | 'file';
}

export const AddFilePage: React.FC<AddFilePageProps> = ({ 
  onBack, 
  defaultType = 'file' 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    file: null as File | null
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log('Uploading file:', formData);
    onBack(); // Navigate back after upload
  };

  const titleText = defaultType === 'file' ? 'Add New Item' : `Add New ${defaultType.charAt(0).toUpperCase() + defaultType.slice(1)}`;

  return (
    <div className="max-w-5xl space-y-12 pb-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{titleText}</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400">Securely upload and organize your sensitive items.</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-10 sm:p-12 shadow-sm"
          >
            <form onSubmit={handleUpload} className="space-y-10">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Name of item</Label>
                <Input
                  id="name"
                  placeholder="e.g., Project_Proposal_2026"
                  className="w-full px-6 py-8 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-lg font-bold"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Upload File</Label>
                <div className="relative group">
                  <div className={`w-full aspect-video border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all group-hover:border-blue-500/30 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-500/5 ${formData.file ? 'bg-emerald-50/30 border-emerald-500/20' : 'bg-slate-50/30'}`}>
                    <div className={`p-4 rounded-2xl ${formData.file ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      {formData.file ? <Save className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900 dark:text-white">
                        {formData.file ? formData.file.name : 'Click to select or drag and drop'}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        {formData.file ? `${(formData.file.size / (1024 * 1024)).toFixed(2)} MB • ${formData.file.type || 'Unknown'}` : 'PDF, PNG, JPG, or MP4 up to 500MB'}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add a brief description of this item..."
                  className="w-full px-6 py-6 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white min-h-[150px] resize-none text-base"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="pt-8 border-t border-slate-50 dark:border-slate-800 flex justify-end gap-5">
                <Button 
                  variant="ghost" 
                  onClick={onBack}
                  className="px-10 py-5 rounded-2xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all h-14"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-3 h-14 text-lg"
                >
                  <Save className="w-5 h-5" />
                  Securely Upload
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-10">
          <div className="bg-[#001f3f] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-950/20">
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-extrabold leading-tight">Bank-Grade Encryption</h3>
              <p className="text-blue-100/60 leading-relaxed">Your files are encrypted before they even leave your device. Only you hold the master key.</p>
            </div>
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px]" />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white">Supported Types</h4>
            </div>
            <div className="grid grid-cols-2 gap-y-4">
              {[
                { ext: 'PDF', label: 'Documents' },
                { ext: 'JPG', label: 'Images' },
                { ext: 'PNG', label: 'Graphics' },
                { ext: 'MP4', label: 'Videos' },
              ].map((type) => (
                <div key={type.ext}>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{type.ext}</p>
                   <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{type.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
