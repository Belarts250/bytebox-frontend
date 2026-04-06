import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Grid, 
  List, 
  Filter, 
  Search,
  MoreVertical,
  Download,
  Trash2,
  ExternalLink,
  ChevronDown,
  Plus
} from 'lucide-react';
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

interface FilesViewProps {
  type: 'documents' | 'images' | 'videos';
  onUpload: () => void;
}

export const FilesView: React.FC<FilesViewProps> = ({ type, onUpload }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Mock data generator
  const getMockFiles = () => {
    const baseFiles = [
      { id: 1, name: 'Project_Proposal_2025.pdf', type: 'documents', ext: 'PDF', size: '1.2 MB', date: 'Jan 25, 2026', color: 'text-red-500' },
      { id: 2, name: 'Quarterly_Review.docx', type: 'documents', ext: 'DOCX', size: '850 KB', date: 'Jan 24, 2026', color: 'text-blue-500' },
      { id: 3, name: 'Brand_Guidelines_v1.pdf', type: 'documents', ext: 'PDF', size: '15.4 MB', date: 'Jan 20, 2026', color: 'text-red-500' },
      { id: 4, name: 'Hero_Banner_Main.png', type: 'images', ext: 'PNG', size: '4.5 MB', date: 'Jan 28, 2026', color: 'text-emerald-500' },
      { id: 5, name: 'Team_Lunch.jpg', type: 'images', ext: 'JPG', size: '2.1 MB', date: 'Jan 27, 2026', color: 'text-emerald-500' },
      { id: 6, name: 'Product_Launch_Event.mp4', type: 'videos', ext: 'MP4', size: '450 MB', date: 'Jan 15, 2026', color: 'text-purple-500' },
      { id: 7, name: 'App_Tutorial_v2.mp4', type: 'videos', ext: 'MP4', size: '82 MB', date: 'Jan 12, 2026', color: 'text-purple-500' },
    ];
    return baseFiles.filter(f => f.type === type);
  };

  const files = getMockFiles().filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const FileIcon = ({ type, color }: { type: string, color: string }) => {
    switch(type) {
      case 'documents': return <FileText className={color} />;
      case 'images': return <ImageIcon className={color} />;
      case 'videos': return <Video className={color} />;
      default: return <FileText className={color} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">{type}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage all your {type} in one place.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-400'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-400'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
            <ChevronDown className="w-4 h-4" />
          </button>

          <button 
            onClick={onUpload}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Upload {type === 'documents' ? 'Document' : type === 'images' ? 'Image' : 'Video'}
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${type}...`}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white shadow-sm"
        />
      </div>

      {files.length === 0 ? (
        <div className="py-32 text-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No files found</h3>
          <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or upload something new.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-3'}>
          {files.map((file) => (
            <motion.div 
              layout
              key={file.id}
              whileHover={{ y: -4 }}
              className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group transition-all shadow-sm
                ${viewMode === 'grid' ? 'rounded-[2rem] p-6' : 'rounded-2xl p-4 flex items-center justify-between'}
              `}
            >
              <div className={`flex items-center gap-4 ${viewMode === 'grid' ? 'flex-col items-start' : ''}`}>
                <div className={`rounded-2xl flex items-center justify-center ${viewMode === 'grid' ? 'w-full aspect-square bg-slate-50 dark:bg-slate-800 mb-4' : 'w-12 h-12 bg-slate-50 dark:bg-slate-800'}`}>
                  <FileIcon type={type} color={file.color + (viewMode === 'grid' ? ' w-12 h-12' : ' w-6 h-6')} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition-colors line-clamp-1">{file.name}</h4>
                  <p className="text-xs text-slate-400 font-medium">{file.ext} • {file.size} • {file.date}</p>
                </div>
              </div>

              <div className={`flex items-center gap-2 ${viewMode === 'grid' ? 'mt-6 pt-4 border-t border-slate-50 dark:border-slate-800 w-full justify-between' : ''}`}>
                <button 
                  onClick={() => setSelectedFile(file)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View
                </button>
                <div className="flex gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><Download className="w-4 h-4" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* File Preview Modal */}
      <AnimatePresence>
        {selectedFile && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFile(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row"
            >
              <div className="flex-1 bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-8 min-h-[400px]">
                 <FileIcon type={type} color={`${selectedFile.color} w-32 h-32 opacity-20`} />
              </div>
              <div className="w-full md:w-80 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{selectedFile.name}</h3>
                    <button onClick={() => setSelectedFile(null)} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <ChevronDown className="w-6 h-6 rotate-90" />
                    </button>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Details</p>
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <span className="text-slate-500">Size</span>
                        <span className="font-bold text-slate-900 dark:text-white text-right">{selectedFile.size}</span>
                        <span className="text-slate-500">Format</span>
                        <span className="font-bold text-slate-900 dark:text-white text-right">{selectedFile.ext}</span>
                        <span className="text-slate-500">Created</span>
                        <span className="font-bold text-slate-900 dark:text-white text-right">{selectedFile.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                    <Download className="w-4 h-4" /> Download File
                  </button>
                  <button className="w-full py-3 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold border border-slate-100 dark:border-slate-800">
                    Share Link
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
