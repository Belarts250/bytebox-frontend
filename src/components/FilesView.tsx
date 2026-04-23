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
    const matchesType =
      activeTab === "documents" ? file.type === "document" :
      activeTab === "images" ? file.type === "image" :
      activeTab === "videos" ? file.type === "video" :
      true;

    const matchesSearch = file.title?.toLowerCase().includes(searchQuery.toLowerCase());

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

  // ✅ icon helper
  const FileIcon = ({ type }: { type: string }) => {
    if (type === 'document') return <FileText className="w-5 h-5 text-blue-500" />;
    if (type === 'image') return <ImageIcon className="w-5 h-5 text-green-500" />;
    if (type === 'video') return <Video className="w-5 h-5 text-purple-500" />;
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold capitalize">{type}</h1>
          <p className="text-sm text-gray-500">Manage all your {type} in one place.</p>
        </div>

        <div className="flex items-center gap-3">

          {/* VIEW SWITCH */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button onClick={() => setViewMode('grid')}>
              <Grid />
            </button>
            <button onClick={() => setViewMode('list')}>
              <List />
            </button>
          </div>

          {/* UPLOAD BUTTON */}
          {onUpload && (
            <button
              onClick={onUpload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl"
            >
              <Plus className="w-4 h-4" />
              Upload
            </button>
          )}
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${type}...`}
          className="w-full pl-10 py-2 border rounded-xl"
        />
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading files...</p>
      ) : filteredFiles.length === 0 ? (
        <p>No files found</p>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-4' : 'space-y-2'}>
          {filteredFiles.map((file) => (
            <motion.div
              key={file.id}
              className="border p-4 rounded-xl flex justify-between items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <FileIcon type={file.type} />
                <div>
                  <h3>{file.title}</h3>
                  <p className="text-xs text-gray-500">{file.description}</p>
                </div>
              </div>

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
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {selectedFile && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-[400px]">
              <h2 className="font-bold">{selectedFile.title}</h2>
              <p className="text-sm text-gray-500">{selectedFile.description}</p>

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