import { 
  X, 
  Trash2, 
  RotateCw, 
  RotateCcw,
  Scissors,
  Copy,
  FilePlus,
  FileOutput,
  CheckSquare,
  Square,
  Download,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Grid3x3,
  Rows,
  GripVertical
} from 'lucide-react';
import { useState } from 'react';

interface PDFPage {
  id: string;
  pageNumber: number;
  thumbnail: string;
  rotation: number;
}

interface OrganizePDFProps {
  onClose: () => void;
}

export function OrganizePDF({ onClose }: OrganizePDFProps) {
  const [pages, setPages] = useState<PDFPage[]>([
    { id: '1', pageNumber: 1, thumbnail: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=80', rotation: 0 },
    { id: '2', pageNumber: 2, thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80', rotation: 0 },
    { id: '3', pageNumber: 3, thumbnail: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=400&q=80', rotation: 0 },
    { id: '4', pageNumber: 4, thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80', rotation: 0 },
    { id: '5', pageNumber: 5, thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80', rotation: 0 },
    { id: '6', pageNumber: 6, thumbnail: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=80', rotation: 0 },
    { id: '7', pageNumber: 7, thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80', rotation: 0 },
    { id: '8', pageNumber: 8, thumbnail: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=400&q=80', rotation: 0 },
  ]);
  
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [zoom, setZoom] = useState(100);

  const togglePageSelection = (pageId: string) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(pageId)) {
      newSelected.delete(pageId);
    } else {
      newSelected.add(pageId);
    }
    setSelectedPages(newSelected);
  };

  const selectAll = () => {
    setSelectedPages(new Set(pages.map(p => p.id)));
  };

  const deselectAll = () => {
    setSelectedPages(new Set());
  };

  const deleteSelected = () => {
    const newPages = pages.filter(p => !selectedPages.has(p.id));
    setPages(newPages);
    setSelectedPages(new Set());
  };

  const rotateSelected = (degrees: number) => {
    const newPages = pages.map(page => {
      if (selectedPages.has(page.id)) {
        return { ...page, rotation: (page.rotation + degrees) % 360 };
      }
      return page;
    });
    setPages(newPages);
  };

  const extractSelected = () => {
    console.log('Extracting pages:', Array.from(selectedPages));
  };

  const insertPages = () => {
    const newPage: PDFPage = {
      id: Date.now().toString(),
      pageNumber: pages.length + 1,
      thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80',
      rotation: 0
    };
    setPages([...pages, newPage]);
  };

  const movePage = (fromIndex: number, toIndex: number) => {
    const newPages = [...pages];
    const [movedPage] = newPages.splice(fromIndex, 1);
    newPages.splice(toIndex, 0, movedPage);
    // Update page numbers
    newPages.forEach((page, index) => {
      page.pageNumber = index + 1;
    });
    setPages(newPages);
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Grid3x3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-neutral-900">Organize Pages</h2>
              <p className="text-sm text-neutral-500">
                {pages.length} pages • {selectedPages.size} selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-neutral-200 bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={selectAll}
              className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all text-sm flex items-center gap-2"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Select All</span>
            </button>

            <button
              onClick={deselectAll}
              className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all text-sm flex items-center gap-2"
            >
              <Square className="w-4 h-4" />
              <span>Deselect All</span>
            </button>

            <div className="w-px h-6 bg-neutral-300 mx-2"></div>

            <button
              onClick={() => rotateSelected(90)}
              disabled={selectedPages.size === 0}
              className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCw className="w-4 h-4" />
              <span>Rotate Right</span>
            </button>

            <button
              onClick={() => rotateSelected(-90)}
              disabled={selectedPages.size === 0}
              className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Rotate Left</span>
            </button>

            <button
              onClick={deleteSelected}
              disabled={selectedPages.size === 0}
              className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-500 transition-all text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>

            <div className="w-px h-6 bg-neutral-300 mx-2"></div>

            <button
              onClick={extractSelected}
              disabled={selectedPages.size === 0}
              className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileOutput className="w-4 h-4" />
              <span>Extract</span>
            </button>

            <button
              onClick={insertPages}
              className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all text-sm flex items-center gap-2"
            >
              <FilePlus className="w-4 h-4" />
              <span>Insert</span>
            </button>

            <button
              disabled={selectedPages.size === 0}
              className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy className="w-4 h-4" />
              <span>Duplicate</span>
            </button>

            <button
              disabled={selectedPages.size === 0}
              className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Scissors className="w-4 h-4" />
              <span>Split</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* View Mode */}
            <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Rows className="w-4 h-4" />
              </button>
            </div>

            <div className="w-px h-6 bg-neutral-300 mx-2"></div>

            {/* Zoom Controls */}
            <button
              onClick={() => setZoom(Math.max(50, zoom - 25))}
              className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ZoomOut className="w-4 h-4 text-neutral-600" />
            </button>
            <span className="text-sm text-neutral-600 w-12 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ZoomIn className="w-4 h-4 text-neutral-600" />
            </button>

            <div className="w-px h-6 bg-neutral-300 mx-2"></div>

            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-sm flex items-center gap-2 shadow-lg">
              <Download className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pages Grid/List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
            : 'space-y-3 max-w-4xl mx-auto'
        }>
          {pages.map((page, index) => {
            const isSelected = selectedPages.has(page.id);
            
            return (
              <div
                key={page.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('text/html', index.toString());
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const fromIndex = parseInt(e.dataTransfer.getData('text/html'));
                  movePage(fromIndex, index);
                }}
                className={`
                  bg-white rounded-xl border-2 transition-all cursor-move group
                  ${isSelected 
                    ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
                    : 'border-neutral-200 hover:border-blue-300 hover:shadow-md'
                  }
                  ${viewMode === 'list' ? 'flex items-center gap-4 p-4' : 'p-3'}
                `}
              >
                {/* Checkbox */}
                <div className={`
                  ${viewMode === 'grid' ? 'absolute top-3 left-3' : 'flex-shrink-0'}
                `}>
                  <button
                    onClick={() => togglePageSelection(page.id)}
                    className={`
                      w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                      ${isSelected
                        ? 'bg-blue-600 border-blue-600'
                        : 'bg-white border-neutral-300 hover:border-blue-400'
                      }
                    `}
                  >
                    {isSelected && (
                      <CheckSquare className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>

                {/* Page Number Badge */}
                <div className={`
                  ${viewMode === 'grid' ? 'absolute top-3 right-3' : 'flex-shrink-0'}
                `}>
                  <div className="px-2 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md text-xs shadow-md flex items-center gap-1">
                    <span>{page.pageNumber}</span>
                  </div>
                </div>

                {/* Thumbnail */}
                <div className={`
                  ${viewMode === 'grid' ? 'mt-8 mb-3' : 'flex-shrink-0'}
                  ${viewMode === 'list' ? 'w-32 h-40' : 'w-full aspect-[3/4]'}
                  bg-neutral-100 rounded-lg overflow-hidden relative
                `}>
                  <img
                    src={page.thumbnail}
                    alt={`Page ${page.pageNumber}`}
                    className="w-full h-full object-cover"
                    style={{ transform: `rotate(${page.rotation}deg)` }}
                  />
                  
                  {/* Drag Handle Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <GripVertical className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Page Info */}
                <div className={`
                  ${viewMode === 'list' ? 'flex-1' : ''}
                  text-center
                `}>
                  <div className="text-sm text-neutral-900 mb-1">
                    Page {page.pageNumber}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {page.rotation !== 0 && `Rotated ${page.rotation}°`}
                  </div>
                </div>

                {/* Quick Actions (List View) */}
                {viewMode === 'list' && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => rotateSelected(90)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <RotateCw className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => {
                        const newSelected = new Set([page.id]);
                        setSelectedPages(newSelected);
                        deleteSelected();
                      }}
                      className="w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {pages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-neutral-600 mb-2">No pages to organize</h3>
            <p className="text-sm text-neutral-400">Add pages to start organizing your document</p>
          </div>
        )}
      </div>

      {/* Footer Tips */}
      <div className="border-t border-neutral-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-neutral-600">
            <span className="flex items-center gap-1">
              <GripVertical className="w-3 h-3" />
              Drag to reorder
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckSquare className="w-3 h-3" />
              Click to select
            </span>
            <span>•</span>
            <span>Use toolbar for batch operations</span>
          </div>
          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <span>🇸🇦</span>
            <span>Made in Saudi Arabia • Tech Solutions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
