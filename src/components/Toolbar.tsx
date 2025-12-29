import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  Printer, 
  Share2, 
  Search,
  PenTool,
  Type,
  Highlighter,
  Square,
  MessageSquare,
  Grid3x3,
  Maximize2,
  Briefcase,
  FilePlus,
  FileStack,
  FileEdit,
  FileOutput,
  FileSignature,
  ScanLine,
  Stamp,
  MessageCircle,
  Shield,
  FileArchive,
  Scissors,
  LayoutGrid
} from 'lucide-react';
import { PDFFile } from '../App';
import { useState } from 'react';
import { UserMenu } from './UserMenu';

interface ToolbarProps {
  selectedFile: PDFFile | null;
  showAnnotations: boolean;
  onToggleAnnotations: () => void;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  onFeatureClick?: (feature: string) => void;
}

export function Toolbar({ selectedFile, showAnnotations, onToggleAnnotations, userName, userEmail, onLogout, onFeatureClick }: ToolbarProps) {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));

  return (
    <div className="bg-white border-b border-neutral-200">
      {/* Main Toolbar */}
      <div className="px-4 py-2 flex items-center justify-between">
        {/* Left side - Logo/Brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-lg">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Malaf</span>
              <span className="text-neutral-400 mx-1">|</span>
              <span className="text-neutral-600 text-sm">Document Suite</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
              <span>🇸🇦</span>
              <span>Saudi</span>
            </div>
          </div>
          
          <div className="w-px h-6 bg-neutral-300" />
          
          <div className="flex items-center gap-3">
            {selectedFile && (
              <>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={handleZoomOut}
                    className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded transition-colors"
                    disabled={zoom <= 25}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="min-w-[3.5rem] text-center text-sm text-neutral-700">{zoom}%</span>
                  <button 
                    onClick={handleZoomIn}
                    className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded transition-colors"
                    disabled={zoom >= 300}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-px h-6 bg-neutral-300" />

                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded transition-colors text-neutral-700">←</button>
                  <input 
                    type="number" 
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    className="w-12 text-center border border-neutral-300 rounded px-1.5 py-1 text-sm"
                    min={1}
                    max={selectedFile.pages}
                  />
                  <span className="text-neutral-600 text-sm">/ {selectedFile.pages}</span>
                  <button className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded transition-colors text-neutral-700">→</button>
                </div>

                <div className="w-px h-6 bg-neutral-300" />

                <div className="flex items-center gap-0.5">
                  <button 
                    onClick={() => setViewMode('single')}
                    className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                      viewMode === 'single' ? 'bg-blue-600 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Team Name Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span className="text-sm text-indigo-700">Tech Solutions</span>
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text"
              placeholder="Search in document..."
              className="pl-9 pr-3 py-1.5 border border-neutral-300 rounded text-sm w-56 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {selectedFile && (
            <>
              <div className="w-px h-6 bg-neutral-300 mx-1" />
              <button className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded transition-colors" title="Rotate">
                <RotateCw className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded transition-colors" title="Download">
                <Download className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded transition-colors" title="Print">
                <Printer className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded transition-colors" title="Share">
                <Share2 className="w-4 h-4" />
              </button>
            </>
          )}

          {userName && userEmail && onLogout && (
            <>
              <div className="w-px h-6 bg-neutral-300 mx-1" />
              <UserMenu userName={userName} userEmail={userEmail} onLogout={onLogout} />
            </>
          )}
        </div>
      </div>

      {/* Annotation Toolbar */}
      {selectedFile && (
        <div className="px-4 py-2 border-t border-neutral-200 flex items-center gap-1">
          <span className="text-neutral-600 text-sm mr-2">Annotations:</span>
          <button 
            onClick={onToggleAnnotations}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
              showAnnotations ? 'bg-blue-600 text-white' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            Draw
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 rounded transition-colors">
            <Highlighter className="w-3.5 h-3.5" />
            Highlight
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 rounded transition-colors">
            <Type className="w-3.5 h-3.5" />
            Text
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 rounded transition-colors">
            <Square className="w-3.5 h-3.5" />
            Shape
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 rounded transition-colors">
            <MessageSquare className="w-3.5 h-3.5" />
            Comment
          </button>
        </div>
      )}

      {/* Features Toolbar - 12 Features */}
      <div className="px-4 py-3 border-t border-neutral-200 bg-gradient-to-r from-neutral-50 to-neutral-100">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button 
            onClick={() => onFeatureClick?.('create')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-700 hover:bg-white rounded-xl transition-all hover:shadow-md group min-w-[80px]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <FilePlus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Create</span>
          </button>

          <button 
            onClick={() => onFeatureClick?.('combine')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-700 hover:bg-white rounded-xl transition-all hover:shadow-md group min-w-[80px]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <FileStack className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Combine</span>
          </button>

          <button 
            onClick={() => onFeatureClick?.('edit')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-700 hover:bg-white rounded-xl transition-all hover:shadow-md group min-w-[80px]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <FileEdit className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Edit</span>
          </button>

          <button 
            onClick={() => onFeatureClick?.('export')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-700 hover:bg-white rounded-xl transition-all hover:shadow-md group min-w-[80px]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <FileOutput className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Export</span>
          </button>

          <button 
            onClick={() => onFeatureClick?.('fillsign')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-700 hover:bg-white rounded-xl transition-all hover:shadow-md group min-w-[80px]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <FileSignature className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Fill & Sign</span>
          </button>

          <button 
            onClick={() => onFeatureClick?.('scan')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-700 hover:bg-white rounded-xl transition-all hover:shadow-md group min-w-[80px]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <ScanLine className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Scan OCR</span>
          </button>

          <button 
            onClick={() => onFeatureClick?.('stamp')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-700 hover:bg-white rounded-xl transition-all hover:shadow-md group min-w-[80px]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <Stamp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Stamp</span>
          </button>

          <button 
            onClick={() => onFeatureClick?.('comments')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-700 hover:bg-white rounded-xl transition-all hover:shadow-md group min-w-[80px]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Comments</span>
          </button>

          <button 
            onClick={() => onFeatureClick?.('protect')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-700 hover:bg-white rounded-xl transition-all hover:shadow-md group min-w-[80px]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Protect</span>
          </button>

          <button 
            onClick={() => onFeatureClick?.('compress')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-700 hover:bg-white rounded-xl transition-all hover:shadow-md group min-w-[80px]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <FileArchive className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Compress</span>
          </button>

          <button 
            onClick={() => onFeatureClick?.('split')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-700 hover:bg-white rounded-xl transition-all hover:shadow-md group min-w-[80px]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Split</span>
          </button>

          <button 
            onClick={() => onFeatureClick?.('organize')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-neutral-700 hover:bg-white rounded-xl transition-all hover:shadow-md group min-w-[80px]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Organize</span>
          </button>
        </div>
      </div>
    </div>
  );
}