import React, { useEffect, useState } from 'react';
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

  // Mock data - replace with real API data
  const [files, setFiles] = useState<any[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try{
        setLoading(true)
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/${type}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setFiles(data);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [type]);

  const filteredFiles = files.filter((f)=>    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const FileIcon = ({ type, color }: { type: string, color: string }) => {
    switch(type) {
      case 'documents': return <FileText className={color} />;
      case 'images': return <ImageIcon className={color} />;
      case 'videos': return <Video className={color} />;
      default: return <FileText className={color} />;
    }
  };

  const deleteFile = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted file from the state
      setFiles(files.filter((f) => f.id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

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

            {/* LOADING */}
      {loading ? (
        <p className="text-gray-500">Loading files...</p>
      ) : filteredFiles.length === 0 ? (
        <p className="text-gray-500">No files found</p>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-4' : 'space-y-2'}>

          {filteredFiles.map((file) => (
            <motion.div
              key={file.id}
              className="border p-4 rounded-xl bg-white shadow-sm flex justify-between items-center"
              whileHover={{ scale: 1.02 }}
            >

              {/* LEFT SIDE */}
              <div className="flex items-center gap-3">
                <FileIcon type={type} color='text-blue-500' />
                <div>
                  <h3 className="font-semibold">{file.name}</h3>
                  <p className="text-xs text-gray-500">
                    {file.size} • {file.date}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <button onClick={() => setSelectedFile(file)}>
                  <ExternalLink size={18} />
                </button>

                <button>
                  <Download size={18} />
                </button>

                <button onClick={() => deleteFile(file.id)}>
                  <Trash2 size={18} className="text-red-500" />
                </button>

                <MoreVertical size={18} />
              </div>

            </motion.div>
          ))}

        </div>
      )}

      {/* FILE MODAL */}
      <AnimatePresence>
        {selectedFile && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-[400px]">
              <h2 className="font-bold text-lg">{selectedFile.name}</h2>
              <p className="text-sm text-gray-500 mt-2">
                Size: {selectedFile.size}
              </p>

              <button
                onClick={() => setSelectedFile(null)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};