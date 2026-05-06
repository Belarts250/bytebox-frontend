import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface FilesViewProps {
  activeTab: string;
  refreshKey: number;
  onUpload?: () => void;
}

export const FilesView: React.FC<FilesViewProps> = ({ 
  activeTab, 
  refreshKey,
  onUpload
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: correct useEffect syntax
  useEffect(() => {
    fetchFiles();
  }, [refreshKey]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/documents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      });

      const data = await res.json();
      console.log("REFRESH KEY:", refreshKey);
      console.log("FETCHED:", data);

      // ✅ ensure it's always an array
      setFiles(Array.isArray(data) ? data : data.files || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      setFiles([]);
    } finally {
      setLoading(false); // ✅ FIX: stop loading (NOT setFiles)
    }
  };

  // ✅ safe guard
  const safeFiles = Array.isArray(files) ? files : [];

  // ✅ define type properly
  const type = activeTab;

  // ✅ filtering by type + search
  const filteredFiles = safeFiles.filter(file => {
    const fileType = file.type?.toLowerCase();

    const matchesType =
      activeTab === "documents" ? fileType === "document" :
      activeTab === "images" ? fileType === "image" :
      activeTab === "videos" ? fileType === "video" :
      true;

    const matchesSearch =
      file.title?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const deleteFile = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/documents/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ update UI after delete
      
      setFiles(prev => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // ✅ icon helper
  const FileIcon = ({ type }: { type: string }) => {
    if (type === 'document') return <FileText className="w-6 h-6 text-blue-500" />;
    if (type === 'image') return <ImageIcon className="w-6 h-6 text-emerald-500" />;
    if (type === 'video') return <Video className="w-6 h-6 text-purple-500" />;
    return <FileText className="w-6 h-6 text-slate-500" />;
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white capitalize mb-2">{type}</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">Manage all your {type} in one place.</p>
        </div>

        <div className="flex items-center gap-4">

          {/* VIEW SWITCH */}
          <div className="hidden md:flex items-center bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-slate-50 dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-slate-50 dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* UPLOAD BUTTON */}
          {onUpload && (
            <button
              onClick={onUpload}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Upload New
            </button>
          )}
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${type}...`}
          className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white shadow-sm"
        />
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="p-10 text-center text-slate-400 font-bold bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          Loading your {type}...
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="p-10 text-center text-slate-400 font-bold bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          No {type} found. Try uploading something new!
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm divide-y divide-slate-50 dark:divide-slate-800/50'}>
          {filteredFiles.map((file) => (
            viewMode === 'grid' ? (
              <motion.div
                key={file.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between h-56"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors shadow-sm">
                    <FileIcon type={file.type} />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setSelectedFile(file)} className="p-2.5 text-slate-400 hover:text-blue-600 transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteFile(file.id)} className="p-2.5 text-slate-400 hover:text-red-500 transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg truncate group-hover:text-blue-600 transition-colors">{file.title}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest truncate mt-1.5">
                    {(file.fileType || '').split('/')[1]?.toUpperCase() || file.type} • {file.fileSize ? formatSize(file.fileSize) : 'Unknown size'}
                  </p>
                  <p className="text-xs font-bold text-slate-300 dark:text-slate-600 mt-1">
                    {file.uploadedAt ? new Date(file.uploadedAt).toLocaleDateString() : ''}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div key={file.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors shadow-sm">
                    <FileIcon type={file.type} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 transition-colors">{file.title}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                      {(file.fileType || '').split('/')[1]?.toUpperCase() || file.type} • {file.fileSize ? formatSize(file.fileSize) : 'Unknown size'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-bold text-slate-400">{file.uploadedAt ? new Date(file.uploadedAt).toLocaleDateString() : ''}</span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setSelectedFile(file)} className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                      <Download className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteFile(file.id)} className="p-2.5 text-slate-400 hover:text-red-500 transition-colors bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shadow-sm">
                  <FileIcon type={selectedFile.type} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white break-all">{selectedFile.title}</h2>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {(selectedFile.fileType || '').split('/')[1]?.toUpperCase() || selectedFile.type} • {selectedFile.fileSize ? formatSize(selectedFile.fileSize) : 'Unknown size'}
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 mb-6">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedFile.description || "No description provided."}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedFile(null)}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-6 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
                <button
                  className="flex-1 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};