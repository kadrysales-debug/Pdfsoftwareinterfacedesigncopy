import { PDFFile } from '../App';
import { FileText, Edit3, Check, X as XIcon, Trash2, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, ChevronDown, Printer, Save, RotateCw, ChevronsLeft, ChevronsRight, MousePointer, Type, Hand } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface PDFViewerAdvancedProps {
  selectedFile: PDFFile | null;
  selectedTool?: string | null;
}

interface Annotation {
  id: string;
  type: 'signature' | 'text' | 'highlight' | 'drawing';
  x: number;
  y: number;
  pageNumber: number;
  content?: string;
  width?: number;
  height?: number;
  color?: string;
  fontSize?: number;
}

export function PDFViewerAdvanced({ selectedFile, selectedTool }: PDFViewerAdvancedProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedAnnotation, setDraggedAnnotation] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingAnnotationId, setEditingAnnotationId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [pdfError, setPdfError] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectionMode, setSelectionMode] = useState<'text' | 'hand' | 'pointer'>('pointer');
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const numPages = selectedFile?.pages || 0;

  useEffect(() => {
    // Reset annotations when file changes
    setAnnotations([]);
    setCurrentPage(1);
    setPdfError(false);
  }, [selectedFile?.id]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, numPages));
  };

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTool || editingAnnotationId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    let newAnnotation: Annotation | null = null;

    if (selectedTool === 'edit-text' || selectedTool === 'edit-pdf') {
      newAnnotation = {
        id: `ann-${Date.now()}`,
        type: 'text',
        x,
        y,
        pageNumber: currentPage,
        content: 'New Text',
        fontSize: 16,
        color: '#000000'
      };
    } else if (selectedTool === 'fill-sign') {
      newAnnotation = {
        id: `ann-${Date.now()}`,
        type: 'signature',
        x,
        y,
        pageNumber: currentPage,
        content: 'Your Signature',
        fontSize: 18,
        color: '#1e40af'
      };
    } else if (selectedTool === 'highlight') {
      newAnnotation = {
        id: `ann-${Date.now()}`,
        type: 'highlight',
        x,
        y,
        pageNumber: currentPage,
        width: 150,
        height: 20,
        color: '#fef08a'
      };
    }

    if (newAnnotation) {
      setAnnotations(prev => [...prev, newAnnotation!]);
    }
  };

  const handleAnnotationDragStart = (e: React.MouseEvent, annotationId: string) => {
    e.stopPropagation();
    setDraggedAnnotation(annotationId);
    setIsDragging(true);
    
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleAnnotationDrag = (e: React.MouseEvent) => {
    if (!isDragging || !draggedAnnotation) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left - dragOffset.x) / scale;
    const y = (e.clientY - rect.top - dragOffset.y) / scale;

    setAnnotations(prev => prev.map(ann =>
      ann.id === draggedAnnotation
        ? { ...ann, x, y }
        : ann
    ));
  };

  const handleAnnotationDragEnd = () => {
    setIsDragging(false);
    setDraggedAnnotation(null);
  };

  const handleDeleteAnnotation = (annotationId: string) => {
    setAnnotations(prev => prev.filter(ann => ann.id !== annotationId));
  };

  const handleEditAnnotation = (annotationId: string, content: string) => {
    setEditingAnnotationId(annotationId);
    setEditingValue(content || '');
  };

  const handleSaveEdit = () => {
    if (editingAnnotationId) {
      setAnnotations(prev => prev.map(ann =>
        ann.id === editingAnnotationId
          ? { ...ann, content: editingValue }
          : ann
      ));
      setEditingAnnotationId(null);
      setEditingValue('');
    }
  };

  const handleCancelEdit = () => {
    setEditingAnnotationId(null);
    setEditingValue('');
  };

  const handleDownloadPDF = async () => {
    if (selectedFile?.fileUrl) {
      const link = document.createElement('a');
      link.href = selectedFile.fileUrl;
      link.download = selectedFile.name;
      link.click();
    }
  };

  if (!selectedFile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-500 text-sm">Select a PDF file to view</p>
        </div>
      </div>
    );
  }

  // For uploaded files with fileUrl - use enhanced iframe viewer
  const isUploadedFile = !!selectedFile.fileUrl;

  return (
    <div className="flex-1 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100 flex flex-col overflow-hidden">
      {/* Top Controls Bar */}
      <div className="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between shadow-sm">
        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 rounded-lg border border-neutral-200">
            <input
              type="number"
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= numPages) {
                  setCurrentPage(page);
                }
              }}
              className="w-12 text-center bg-transparent border-none outline-none text-sm"
              min={1}
              max={numPages}
            />
            <span className="text-sm text-neutral-500">/ {numPages}</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= numPages}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-all"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <div className="px-3 py-1.5 bg-neutral-50 rounded-lg border border-neutral-200 min-w-[80px] text-center">
            <span className="text-sm">{Math.round(scale * 100)}%</span>
          </div>

          <button
            onClick={handleZoomIn}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-all"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Print Button */}
          <button
            onClick={() => {
              if (selectedFile?.fileUrl) {
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = selectedFile.fileUrl;
                document.body.appendChild(iframe);
                iframe.onload = () => {
                  iframe.contentWindow?.print();
                };
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Printer className="w-4 h-4" />
            <span className="text-sm">Print</span>
          </button>

          {/* Save Button */}
          <button
            onClick={() => {
              // This would save annotations to the PDF
              alert('Annotations saved! (In production, this would use pdf-lib to save to the actual PDF file)');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            <span className="text-sm">Save</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Download</span>
          </button>

          {/* More Tools Menu */}
          <div className="relative">
            <button
              onClick={() => setShowToolsMenu(!showToolsMenu)}
              className="flex items-center gap-1 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-all"
            >
              <span className="text-sm">Tools</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Tools Dropdown Menu */}
            {showToolsMenu && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-neutral-200 py-2 z-50">
                {/* Navigation Tools */}
                <div className="px-3 py-2 border-b border-neutral-100">
                  <p className="text-xs text-neutral-500 mb-2">Navigation</p>
                  
                  <button
                    onClick={() => {
                      setCurrentPage(1);
                      setShowToolsMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-all text-left"
                  >
                    <ChevronsLeft className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-sm">First Page</div>
                      <div className="text-xs text-neutral-500">Jump to beginning</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentPage(numPages);
                      setShowToolsMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-all text-left"
                  >
                    <ChevronsRight className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-sm">Last Page</div>
                      <div className="text-xs text-neutral-500">Jump to end</div>
                    </div>
                  </button>
                </div>

                {/* View Tools */}
                <div className="px-3 py-2 border-b border-neutral-100">
                  <p className="text-xs text-neutral-500 mb-2">View</p>
                  
                  <button
                    onClick={() => {
                      setRotation((rotation + 90) % 360);
                      setShowToolsMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-all text-left"
                  >
                    <RotateCw className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="text-sm">Rotate Page</div>
                      <div className="text-xs text-neutral-500">Rotate 90° clockwise</div>
                    </div>
                  </button>
                </div>

                {/* Selection Tools */}
                <div className="px-3 py-2">
                  <p className="text-xs text-neutral-500 mb-2">Selection Mode</p>
                  
                  <button
                    onClick={() => {
                      setSelectionMode('pointer');
                      setShowToolsMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left ${
                      selectionMode === 'pointer' ? 'bg-blue-50' : 'hover:bg-neutral-50'
                    }`}
                  >
                    <MousePointer className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="text-sm">Pointer Tool</div>
                      <div className="text-xs text-neutral-500">Select and interact</div>
                    </div>
                    {selectionMode === 'pointer' && (
                      <div className="ml-auto w-2 h-2 bg-green-600 rounded-full"></div>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSelectionMode('text');
                      setShowToolsMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left ${
                      selectionMode === 'text' ? 'bg-blue-50' : 'hover:bg-neutral-50'
                    }`}
                  >
                    <Type className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="text-sm">Text Selection</div>
                      <div className="text-xs text-neutral-500">Select text to copy</div>
                    </div>
                    {selectionMode === 'text' && (
                      <div className="ml-auto w-2 h-2 bg-indigo-600 rounded-full"></div>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSelectionMode('hand');
                      setShowToolsMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left ${
                      selectionMode === 'hand' ? 'bg-blue-50' : 'hover:bg-neutral-50'
                    }`}
                  >
                    <Hand className="w-4 h-4 text-orange-600" />
                    <div>
                      <div className="text-sm">Hand Tool</div>
                      <div className="text-xs text-neutral-500">Pan and scroll</div>
                    </div>
                    {selectionMode === 'hand' && (
                      <div className="ml-auto w-2 h-2 bg-orange-600 rounded-full"></div>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tool Indicator */}
      {selectedTool && (
        <div className="fixed top-24 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-2xl border border-white/20 p-4 z-50 w-72">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium">
                {selectedTool === 'edit-text' || selectedTool === 'edit-pdf' ? 'Text Mode' : 
                 selectedTool === 'fill-sign' ? 'Signature Mode' :
                 selectedTool === 'highlight' ? 'Highlight Mode' : 'Active Tool'}
              </h3>
              <p className="text-xs opacity-90">Click on PDF to add</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-xs opacity-80">
              {isUploadedFile 
                ? 'Annotations are overlay-based. For native PDF editing, advanced libraries required.' 
                : 'Demo mode - Try editing this sample document'}
            </p>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-center">
          {isUploadedFile ? (
            // Enhanced iframe viewer with annotation overlay
            <div className="relative inline-block shadow-2xl">
              <div 
                className="relative bg-white border border-neutral-200"
                style={{
                  width: `${850 * scale}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top center'
                }}
              >
                <iframe
                  ref={iframeRef}
                  src={selectedFile.fileUrl}
                  className="w-full border-0"
                  style={{ 
                    height: '1100px',
                    pointerEvents: selectedTool ? 'none' : 'auto'
                  }}
                  title={selectedFile.name}
                  onError={() => setPdfError(true)}
                />
                
                {/* Annotation Overlay Layer */}
                {selectedTool && (
                  <div 
                    ref={containerRef}
                    className="absolute inset-0 cursor-crosshair"
                    onClick={handlePageClick}
                    onMouseMove={isDragging ? handleAnnotationDrag : undefined}
                    onMouseUp={handleAnnotationDragEnd}
                    onMouseLeave={handleAnnotationDragEnd}
                    style={{ pointerEvents: 'auto' }}
                  >
                    {/* Render Annotations */}
                    {annotations
                      .filter(ann => ann.pageNumber === currentPage)
                      .map(annotation => (
                        <div
                          key={annotation.id}
                          className={`absolute cursor-move group ${isDragging && draggedAnnotation === annotation.id ? 'z-50' : 'z-10'}`}
                          style={{
                            left: `${annotation.x}px`,
                            top: `${annotation.y}px`,
                            transform: isDragging && draggedAnnotation === annotation.id ? 'scale(1.05)' : 'scale(1)',
                            transition: isDragging && draggedAnnotation === annotation.id ? 'none' : 'transform 0.2s'
                          }}
                          onMouseDown={(e) => handleAnnotationDragStart(e, annotation.id)}
                        >
                          {annotation.type === 'highlight' ? (
                            <div
                              className="opacity-50 hover:opacity-70 transition-opacity relative"
                              style={{
                                width: `${annotation.width || 100}px`,
                                height: `${annotation.height || 20}px`,
                                backgroundColor: annotation.color || '#fef08a'
                              }}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAnnotation(annotation.id);
                                }}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600 text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ) : editingAnnotationId === annotation.id ? (
                            <div className="flex items-center gap-1 bg-white p-2 rounded-lg shadow-xl border-2 border-blue-500">
                              <input
                                type="text"
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveEdit();
                                  if (e.key === 'Escape') handleCancelEdit();
                                }}
                                className="px-2 py-1 border border-neutral-200 rounded text-sm min-w-[150px]"
                                style={{
                                  fontSize: `${annotation.fontSize || 16}px`,
                                  color: annotation.color
                                }}
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSaveEdit();
                                }}
                                className="bg-green-500 text-white p-1.5 rounded hover:bg-green-600 transition-all"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelEdit();
                                }}
                                className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600 transition-all"
                              >
                                <XIcon className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="relative">
                              <div
                                className={`px-3 py-2 rounded-lg shadow-lg transition-all ${
                                  annotation.type === 'signature'
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-2 border-white'
                                    : 'bg-white border-2 border-blue-400'
                                }`}
                                style={{
                                  fontSize: `${annotation.fontSize || 16}px`,
                                  color: annotation.type === 'signature' ? 'white' : annotation.color,
                                  fontFamily: annotation.type === 'signature' ? 'cursive' : 'inherit'
                                }}
                              >
                                {annotation.content}
                              </div>
                              
                              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditAnnotation(annotation.id, annotation.content || '');
                                  }}
                                  className="w-6 h-6 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAnnotation(annotation.id);
                                  }}
                                  className="w-6 h-6 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all flex items-center justify-center"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}

                {pdfError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-red-400 mx-auto mb-3" />
                      <p className="text-red-600 mb-2">Failed to load PDF</p>
                      <p className="text-sm text-neutral-500">The file may be corrupted or in an unsupported format</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Custom viewer for demo files
            <div
              ref={containerRef}
              className="relative inline-block shadow-2xl bg-white border border-neutral-200 cursor-crosshair"
              onClick={handlePageClick}
              onMouseMove={isDragging ? handleAnnotationDrag : undefined}
              onMouseUp={handleAnnotationDragEnd}
              onMouseLeave={handleAnnotationDragEnd}
              style={{ 
                width: `${850 * scale}px`,
                height: `${1100 * scale}px`,
                transformOrigin: 'top center'
              }}
            >
              {/* Demo PDF Content */}
              <div className="absolute inset-0 p-12 pointer-events-none">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mb-3" />
                    <div className="h-3 bg-neutral-700 rounded w-32" />
                  </div>
                  <div className="text-right">
                    <div className="h-2 bg-neutral-400 rounded w-24 mb-1" />
                    <div className="h-2 bg-neutral-400 rounded w-28" />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="h-8 bg-gradient-to-r from-neutral-800 to-neutral-700 rounded w-2/3 mb-2" />
                  <div className="h-5 bg-neutral-600 rounded w-1/2" />
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="h-2.5 bg-neutral-300 rounded" />
                    <div className="h-2.5 bg-neutral-300 rounded" />
                    <div className="h-2.5 bg-neutral-300 rounded w-11/12" />
                    <div className="h-2.5 bg-neutral-300 rounded w-5/6" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-2.5 bg-neutral-300 rounded" />
                    <div className="h-2.5 bg-neutral-300 rounded" />
                    <div className="h-2.5 bg-neutral-300 rounded w-10/12" />
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                    <div className="h-3 bg-blue-600 rounded w-1/4 mb-2" />
                    <div className="h-2 bg-blue-400/50 rounded w-full mb-1" />
                    <div className="h-2 bg-blue-400/50 rounded w-5/6" />
                  </div>
                </div>

                <div className="absolute bottom-12 right-12 text-xs text-neutral-400">
                  Page {currentPage} / {numPages}
                </div>
              </div>

              {/* Annotations for demo files */}
              {annotations
                .filter(ann => ann.pageNumber === currentPage)
                .map(annotation => (
                  <div
                    key={annotation.id}
                    className={`absolute cursor-move group ${isDragging && draggedAnnotation === annotation.id ? 'z-50' : 'z-10'}`}
                    style={{
                      left: `${annotation.x}px`,
                      top: `${annotation.y}px`,
                      transform: isDragging && draggedAnnotation === annotation.id ? 'scale(1.05)' : 'scale(1)',
                      transition: isDragging && draggedAnnotation === annotation.id ? 'none' : 'transform 0.2s'
                    }}
                    onMouseDown={(e) => handleAnnotationDragStart(e, annotation.id)}
                  >
                    {annotation.type === 'highlight' ? (
                      <div
                        className="opacity-50 hover:opacity-70 transition-opacity relative"
                        style={{
                          width: `${annotation.width || 100}px`,
                          height: `${annotation.height || 20}px`,
                          backgroundColor: annotation.color || '#fef08a'
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAnnotation(annotation.id);
                          }}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ) : editingAnnotationId === annotation.id ? (
                      <div className="flex items-center gap-1 bg-white p-2 rounded-lg shadow-xl border-2 border-blue-500">
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit();
                            if (e.key === 'Escape') handleCancelEdit();
                          }}
                          className="px-2 py-1 border border-neutral-200 rounded text-sm min-w-[150px]"
                          style={{
                            fontSize: `${annotation.fontSize || 16}px`,
                            color: annotation.color
                          }}
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveEdit();
                          }}
                          className="bg-green-500 text-white p-1.5 rounded hover:bg-green-600 transition-all"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelEdit();
                          }}
                          className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600 transition-all"
                        >
                          <XIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <div
                          className={`px-3 py-2 rounded-lg shadow-lg transition-all ${
                            annotation.type === 'signature'
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-2 border-white'
                              : 'bg-white border-2 border-blue-400'
                          }`}
                          style={{
                            fontSize: `${annotation.fontSize || 16}px`,
                            color: annotation.type === 'signature' ? 'white' : annotation.color,
                            fontFamily: annotation.type === 'signature' ? 'cursive' : 'inherit'
                          }}
                        >
                          {annotation.content}
                        </div>
                        
                        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAnnotation(annotation.id, annotation.content || '');
                            }}
                            className="w-6 h-6 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAnnotation(annotation.id);
                            }}
                            className="w-6 h-6 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all flex items-center justify-center"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}