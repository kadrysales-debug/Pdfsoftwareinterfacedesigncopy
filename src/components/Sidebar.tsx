import { 
  FileText, 
  ChevronLeft,
  ChevronRight,
  Search, 
  X,
  FolderOpen,
  Clock,
  Trash2,
  Users,
  Briefcase,
  TrendingUp,
  Sparkles,
  Star,
  Grid3x3,
  Upload,
  PenTool,
  FileSignature
} from 'lucide-react';
import { PDFFile } from '../App';
import { useState, useEffect } from 'react';

interface SidebarProps {
  files: PDFFile[];
  selectedFile: PDFFile | null;
  onSelectFile: (fileId: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onSignClick?: () => void;
  onUploadPDF?: (file: File) => void;
}

export function Sidebar({ files, selectedFile, onSelectFile, collapsed, onToggleCollapse, onSignClick, onUploadPDF }: SidebarProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [storageUsed, setStorageUsed] = useState(0);

  useEffect(() => {
    // Simulate storage calculation
    const totalSize = files.reduce((acc, file) => {
      const size = parseFloat(file.size);
      return acc + size;
    }, 0);
    setStorageUsed(totalSize);
  }, [files]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf' && onUploadPDF) {
      onUploadPDF(file);
      // Reset the input so the same file can be uploaded again
      event.target.value = '';
    }
  };

  if (collapsed) {
    return (
      <div className="w-14 bg-gradient-to-b from-neutral-50 to-neutral-100 border-r border-neutral-200 flex flex-col items-center py-4 gap-2">
        <button 
          onClick={onToggleCollapse}
          className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all hover:shadow-md"
        >
          <ChevronRight className="w-4 h-4 text-neutral-600" />
        </button>
        <div className="w-8 h-px bg-neutral-300 my-1"></div>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all group relative">
          <FolderOpen className="w-4 h-4 text-neutral-600 group-hover:text-blue-600" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all group">
          <Star className="w-4 h-4 text-neutral-600 group-hover:text-amber-500" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all group">
          <Clock className="w-4 h-4 text-neutral-600 group-hover:text-purple-600" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all group">
          <Trash2 className="w-4 h-4 text-neutral-600 group-hover:text-red-500" />
        </button>
      </div>
    );
  }

  const getTabColor = (tab: string) => {
    switch(tab) {
      case 'all': return 'from-blue-500 to-blue-600';
      case 'starred': return 'from-amber-500 to-amber-600';
      case 'recent': return 'from-purple-500 to-purple-600';
      case 'trash': return 'from-red-500 to-red-600';
      case 'esign': return 'from-emerald-500 to-teal-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const getTabIcon = (tab: string) => {
    switch(tab) {
      case 'starred': return '⭐';
      case 'recent': return '⚡';
      case 'trash': return '🗑️';
      case 'esign': return '✍️';
      default: return '📁';
    }
  };

  return (
    <div className="w-72 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 border-r border-neutral-200 flex flex-col">
      {/* Header with gradient */}
      <div className="px-4 py-4 border-b border-neutral-200 bg-gradient-to-r from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 opacity-50"></div>
        <div className="relative flex items-center justify-between">
          <h1 className="flex items-center gap-2.5 text-neutral-900">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="leading-tight">Malaf</div>
              <div className="text-xs text-neutral-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{files.length} documents</span>
              </div>
            </div>
          </h1>
          <button 
            onClick={onToggleCollapse}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/80 rounded-lg transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-600" />
          </button>
        </div>
      </div>

      {/* Upload Button with Animation */}
      <div className="p-3">
        <label htmlFor="pdf-upload" className="w-full group relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <Upload className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Upload PDF</span>
          <div className="absolute top-0 right-0 text-2xl opacity-20">📄</div>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Navigation Tabs */}
      <nav className="px-3 pb-3 border-b border-neutral-200">
        <div className="space-y-1">
          <button 
            onClick={() => setActiveTab('all')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative overflow-hidden group ${
              activeTab === 'all' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30' 
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <FolderOpen className="w-4 h-4 relative z-10" />
            <span className="relative z-10">All Files</span>
            {activeTab === 'all' && <span className="ml-auto text-xl">{getTabIcon('all')}</span>}
            <div className={`absolute inset-0 bg-gradient-to-r ${getTabColor('all')} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
          </button>

          <button 
            onClick={() => setActiveTab('starred')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative overflow-hidden group ${
              activeTab === 'starred' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30' 
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Star className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Starred</span>
            {activeTab === 'starred' && <span className="ml-auto text-xl">{getTabIcon('starred')}</span>}
          </button>

          <button 
            onClick={() => setActiveTab('recent')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative overflow-hidden group ${
              activeTab === 'recent' 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30' 
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Clock className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Recent</span>
            {activeTab === 'recent' && <span className="ml-auto text-xl">{getTabIcon('recent')}</span>}
          </button>

          <button 
            onClick={() => setActiveTab('trash')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative overflow-hidden group ${
              activeTab === 'trash' 
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30' 
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Trash2 className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Trash</span>
            {activeTab === 'trash' && <span className="ml-auto text-xl">{getTabIcon('trash')}</span>}
          </button>

          <button 
            onClick={() => setActiveTab('esign')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative overflow-hidden group ${
              activeTab === 'esign' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30' 
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <FileSignature className="w-4 h-4 relative z-10" />
            <span className="relative z-10">eSign</span>
            {activeTab === 'esign' && <span className="ml-auto text-xl">{getTabIcon('esign')}</span>}
          </button>
        </div>
      </nav>

      {/* Team/Workspace Info Card */}
      <div className="mx-3 my-3 p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl border border-indigo-100 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 text-6xl opacity-10">🏢</div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-neutral-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Team Workspace</span>
            </span>
            <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-full text-[10px]">Pro</span>
          </div>
          
          {/* Company/Organization Name */}
          <div className="mb-3 pb-3 border-b border-indigo-200/50">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-neutral-900">Tech Solutions Co.</div>
                <div className="text-xs text-neutral-500">Digital Department</div>
              </div>
            </div>
          </div>
          
          {/* Team Members Avatars */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs shadow-md">M</div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 border-2 border-white flex items-center justify-center text-white text-xs shadow-md">A</div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 border-2 border-white flex items-center justify-center text-white text-xs shadow-md">S</div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 border-2 border-white flex items-center justify-center text-white text-xs shadow-md">K</div>
            </div>
            <span className="text-xs text-neutral-500">+6 members</span>
          </div>
          
          {/* Team Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-600 flex items-center gap-1">
                <Grid3x3 className="w-3 h-3 text-purple-600" />
                Active Projects
              </span>
              <span className="text-purple-600">8</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                Collaboration Rate
              </span>
              <span className="text-green-600">+24%</span>
            </div>
          </div>
        </div>
      </div>

      {/* eSign Card - Electronic Signature */}
      <div className="mx-3 mb-3 p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-xl border border-emerald-200 relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 text-5xl opacity-10 group-hover:scale-110 transition-transform">✍️</div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-emerald-300/20 rounded-full blur-2xl group-hover:bg-emerald-400/30 transition-colors"></div>
        
        <div className="relative z-10">
          {/* Header with Icon */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <FileSignature className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm text-neutral-900">eSign</h3>
                <p className="text-xs text-neutral-500">Digital Signature</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
            Sign your documents digitally with secure electronic signatures
          </p>

          {/* Stats/Features */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-600 flex items-center gap-1">
                <PenTool className="w-3 h-3 text-emerald-600" />
                Pending Signatures
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">3</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-600 flex items-center gap-1">
                <FileText className="w-3 h-3 text-teal-600" />
                Signed Documents
              </span>
              <span className="text-teal-600">127</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-xs hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 group-hover:scale-[1.02]" onClick={onSignClick}>
            <FileSignature className="w-3.5 h-3.5" />
            <span>Sign Documents</span>
          </button>

          {/* Saudi Arabia Badge */}
          <div className="mt-3 pt-3 border-t border-emerald-200/50 flex items-center justify-center gap-1.5 text-xs text-emerald-700">
            <span>🇸🇦</span>
            <span>Legally Valid in KSA</span>
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-neutral-600 text-xs uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Recent Files
          </span>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{files.length}</span>
        </div>
        
        <div className="space-y-2">
          {files.map((file, index) => (
            <button
              key={file.id}
              onClick={() => onSelectFile(file.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all hover:shadow-md group relative overflow-hidden ${
                selectedFile?.id === file.id 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500 shadow-lg' 
                  : 'bg-white border border-neutral-200 hover:border-blue-300'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Thumbnail with overlay */}
              <div className="relative">
                <img 
                  src={file.thumbnail} 
                  alt={file.name}
                  className="w-12 h-16 object-cover rounded-lg border-2 border-neutral-200 flex-shrink-0 shadow-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                {selectedFile?.id === file.id && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 text-left overflow-hidden min-w-0">
                <div className="truncate text-neutral-900 text-sm mb-1">{file.name}</div>
                <div className="flex items-center gap-2 text-neutral-500 text-xs">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {file.pages} pages
                  </span>
                  <span>•</span>
                  <span>{file.size}</span>
                </div>
                <div className="text-neutral-400 text-xs mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {file.lastModified}
                </div>
              </div>

              {/* Hover action */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle star/favorite action
                  }}
                  className="w-6 h-6 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-amber-50 cursor-pointer"
                >
                  <Star className="w-3 h-3 text-neutral-400 hover:text-amber-500" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}