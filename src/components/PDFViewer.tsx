import { PDFFile } from '../App';
import { FileText, Edit3, Check, X as XIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface PDFViewerProps {
  selectedFile: PDFFile | null;
  selectedTool?: string | null;
}

interface Signature {
  id: string;
  x: number;
  y: number;
  pageIndex: number;
  text: string;
}

interface TextElement {
  id: string;
  x: number;
  y: number;
  pageIndex: number;
  text: string;
  fontSize: number;
  color: string;
  fontWeight: string;
  fontStyle: string;
  isEditing?: boolean;
}

export function PDFViewer({ selectedFile, selectedTool }: PDFViewerProps) {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [textElements, setTextElements] = useState<TextElement[]>([
    // Sample text elements
    { id: 'text-1', x: 100, y: 80, pageIndex: 0, text: 'Annual Report 2024', fontSize: 24, color: '#000000', fontWeight: 'bold', fontStyle: 'normal' },
    { id: 'text-2', x: 100, y: 140, pageIndex: 0, text: 'Click to edit this text...', fontSize: 16, color: '#333333', fontWeight: 'normal', fontStyle: 'normal' },
    { id: 'text-3', x: 100, y: 180, pageIndex: 0, text: 'You can edit any text in the document', fontSize: 14, color: '#555555', fontWeight: 'normal', fontStyle: 'normal' },
    { id: 'text-4', x: 100, y: 220, pageIndex: 0, text: 'Drag text to move it around', fontSize: 14, color: '#0066cc', fontWeight: 'normal', fontStyle: 'italic' },
    { id: 'text-5', x: 400, y: 80, pageIndex: 0, text: 'Financial Summary', fontSize: 18, color: '#1a1a1a', fontWeight: 'bold', fontStyle: 'normal' },
    { id: 'text-6', x: 400, y: 120, pageIndex: 0, text: 'Q4 2024 Results', fontSize: 14, color: '#666666', fontWeight: 'normal', fontStyle: 'normal' },
  ]);
  const [draggedSignature, setDraggedSignature] = useState<string | null>(null);
  const [isDraggingNew, setIsDraggingNew] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [draggedText, setDraggedText] = useState<string | null>(null);
  const [isDraggingText, setIsDraggingText] = useState(false);

  const handleAddSignature = (pageIndex: number, clientX: number, clientY: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newSignature: Signature = {
      id: `sig-${Date.now()}`,
      x,
      y,
      pageIndex,
      text: 'Your Signature'
    };

    setSignatures(prev => [...prev, newSignature]);
    setIsDraggingNew(false);
  };

  const handleSignatureDragStart = (e: React.DragEvent, signatureId: string) => {
    setDraggedSignature(signatureId);
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handlePageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handlePageDrop = (e: React.DragEvent, pageIndex: number) => {
    e.preventDefault();
    
    if (draggedSignature) {
      // Moving existing signature
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;

      setSignatures(prev => prev.map(sig => 
        sig.id === draggedSignature 
          ? { ...sig, x, y, pageIndex }
          : sig
      ));
      setDraggedSignature(null);
    } else if (isDraggingNew) {
      // Adding new signature
      const target = e.currentTarget as HTMLElement;
      handleAddSignature(pageIndex, e.clientX, e.clientY, target);
    }
  };

  const handleSignaturePanelDragStart = (e: React.DragEvent) => {
    setIsDraggingNew(true);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleTextElementClick = (textId: string) => {
    const textElement = textElements.find(te => te.id === textId);
    if (textElement) {
      setEditingTextId(textId);
      setEditingValue(textElement.text);
    }
  };

  const handleTextElementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  const handleTextElementSave = (textId: string) => {
    setTextElements(prev => prev.map(te => 
      te.id === textId 
        ? { ...te, text: editingValue, isEditing: false }
        : te
    ));
    setEditingTextId(null);
    setEditingValue('');
  };

  const handleTextElementCancel = () => {
    setEditingTextId(null);
    setEditingValue('');
  };

  const handleTextElementDelete = (textId: string) => {
    setTextElements(prev => prev.filter(te => te.id !== textId));
  };

  const handleAddNewText = () => {
    const newText: TextElement = {
      id: `text-${Date.now()}`,
      x: 150,
      y: 300,
      pageIndex: 0,
      text: 'New Text - Click to Edit',
      fontSize: 16,
      color: '#000000',
      fontWeight: 'normal',
      fontStyle: 'normal'
    };
    setTextElements(prev => [...prev, newText]);
  };

  const handleTextDragStart = (e: React.DragEvent, textId: string) => {
    setDraggedText(textId);
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleTextDragEnd = () => {
    setDraggedText(null);
  };

  const handleTextDrop = (e: React.DragEvent, pageIndex: number) => {
    e.preventDefault();
    
    if (draggedText) {
      // Moving existing text
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;

      setTextElements(prev => prev.map(te => 
        te.id === draggedText 
          ? { ...te, x, y, pageIndex }
          : te
      ));
      setDraggedText(null);
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

  // If it's an uploaded file with fileUrl, show it in iframe
  if (selectedFile.fileUrl) {
    return (
      <div className="flex-1 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100 overflow-auto relative">
        {/* Edit Mode Indicator */}
        {(selectedTool === 'edit-text' || selectedTool === 'edit-pdf') && (
          <div className="fixed top-24 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-2xl border border-white/20 p-4 z-50 w-72">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium">View Mode</h3>
                <p className="text-xs opacity-90">Viewing uploaded PDF</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20">
              <p className="text-xs opacity-80">
                Direct editing of uploaded PDFs requires PDF.js integration
              </p>
            </div>
          </div>
        )}

        {/* Signature Panel - shown when fill-sign tool is selected */}
        {selectedTool === 'fill-sign' && (
          <div className="fixed top-24 right-6 bg-white rounded-xl shadow-2xl border border-neutral-200 p-4 z-50">
            <h3 className="text-sm mb-3">Drag signature to PDF</h3>
            <div
              draggable
              onDragStart={handleSignaturePanelDragStart}
              onDragEnd={() => setIsDraggingNew(false)}
              className="cursor-move bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-dashed border-white/50"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">✍️</div>
                <div className="text-sm font-['Brush_Script_MT',_cursive]">Your Signature</div>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-3 text-center">
              Drag and drop on the PDF
            </p>
          </div>
        )}

        {/* Full Size PDF Container with iframe for uploaded files */}
        <div className="h-full w-full flex items-start justify-center py-6 px-4">
          <div className="w-full max-w-[900px] bg-white shadow-2xl border border-neutral-200">
            <iframe
              src={selectedFile.fileUrl}
              className="w-full border-0"
              style={{ 
                height: 'calc(100vh - 200px)',
                minHeight: '800px'
              }}
              title={selectedFile.name}
            />
          </div>
        </div>
      </div>
    );
  }

  // Full custom PDF viewer (no iframe) - for mock/demo files
  return (
    <div className="flex-1 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100 overflow-auto relative">
      {/* Edit Mode Indicator */}
      {(selectedTool === 'edit-text' || selectedTool === 'edit-pdf') && (
        <div className="fixed top-24 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-2xl border border-white/20 p-4 z-50 w-72">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Edit Mode Active</h3>
              <p className="text-xs opacity-90">Click on any text to edit</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/20 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Hover over text to see edit options</span>
            </div>
            <button
              onClick={handleAddNewText}
              className="w-full mt-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs flex items-center justify-center gap-2 transition-all border border-white/30"
            >
              <span className="text-lg">+</span>
              <span>Add New Text</span>
            </button>
          </div>
        </div>
      )}

      {/* Signature Panel - shown when fill-sign tool is selected */}
      {selectedTool === 'fill-sign' && (
        <div className="fixed top-24 right-6 bg-white rounded-xl shadow-2xl border border-neutral-200 p-4 z-50">
          <h3 className="text-sm mb-3">Drag signature to PDF</h3>
          <div
            draggable
            onDragStart={handleSignaturePanelDragStart}
            onDragEnd={() => setIsDraggingNew(false)}
            className="cursor-move bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-dashed border-white/50"
          >
            <div className="text-center">
              <div className="text-2xl mb-1">✍️</div>
              <div className="text-sm font-['Brush_Script_MT',_cursive]">Your Signature</div>
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-3 text-center">
            Drag and drop on the PDF
          </p>
        </div>
      )}

      {/* Full Size PDF Container */}
      <div className="h-full w-full flex items-start justify-center py-6 px-4">
        <div className="w-full max-w-[900px] space-y-4">
          {/* PDF Pages - Full Size Display */}
          {Array.from({ length: Math.min(selectedFile.pages, 5) }).map((_, index) => (
            <div 
              key={index}
              className="bg-white shadow-2xl relative mx-auto border border-neutral-200"
              style={{ 
                width: '100%',
                aspectRatio: '8.5 / 11'
              }}
              onDragOver={handlePageDragOver}
              onDrop={(e) => handlePageDrop(e, index)}
            >
              {/* Sample content overlay */}
              <div className="absolute inset-0 p-12 bg-white pointer-events-none">
                {/* Page Header */}
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

                {/* Main Title */}
                <div className="mb-6">
                  <div className="h-8 bg-gradient-to-r from-neutral-800 to-neutral-700 rounded w-2/3 mb-2" />
                  <div className="h-5 bg-neutral-600 rounded w-1/2" />
                </div>

                {/* Paragraphs */}
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
                    <div className="h-2.5 bg-neutral-300 rounded w-4/5" />
                  </div>

                  {/* Highlighted Section */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                    <div className="h-3 bg-blue-600 rounded w-1/4 mb-2" />
                    <div className="h-2 bg-blue-400/50 rounded w-full mb-1" />
                    <div className="h-2 bg-blue-400/50 rounded w-5/6" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-2.5 bg-neutral-300 rounded" />
                    <div className="h-2.5 bg-neutral-300 rounded w-11/12" />
                    <div className="h-2.5 bg-neutral-300 rounded" />
                    <div className="h-2.5 bg-neutral-300 rounded w-3/4" />
                  </div>

                  {/* Data Table Mockup */}
                  {index === 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="bg-neutral-100 rounded p-2">
                        <div className="h-2 bg-neutral-400 rounded w-3/4 mb-1" />
                        <div className="h-4 bg-neutral-700 rounded w-1/2" />
                      </div>
                      <div className="bg-neutral-100 rounded p-2">
                        <div className="h-2 bg-neutral-400 rounded w-3/4 mb-1" />
                        <div className="h-4 bg-neutral-700 rounded w-1/2" />
                      </div>
                      <div className="bg-neutral-100 rounded p-2">
                        <div className="h-2 bg-neutral-400 rounded w-3/4 mb-1" />
                        <div className="h-4 bg-neutral-700 rounded w-1/2" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Page Footer */}
                <div className="absolute bottom-8 left-12 right-12 flex justify-between items-center pt-4 border-t border-neutral-200">
                  <div className="h-2 bg-neutral-300 rounded w-32" />
                  <div className="h-2 bg-neutral-400 rounded w-16" />
                </div>
                
                {/* Sample annotation */}
                {index === 0 && (
                  <div className="absolute top-1/2 right-10 bg-yellow-100 border-2 border-yellow-400 p-3 rounded-lg max-w-xs pointer-events-auto shadow-lg">
                    <div className="flex items-start gap-2">
                      <div className="text-xl">💡</div>
                      <div>
                        <p className="text-yellow-900 text-xs mb-1">Sample Note</p>
                        <p className="text-yellow-800 text-xs opacity-80">Review this section carefully</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Render signatures for this page */}
              {signatures
                .filter(sig => sig.pageIndex === index)
                .map(signature => (
                  <div
                    key={signature.id}
                    draggable
                    onDragStart={(e) => handleSignatureDragStart(e, signature.id)}
                    style={{
                      position: 'absolute',
                      left: `${signature.x}px`,
                      top: `${signature.y}px`,
                      cursor: 'move'
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-white group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-['Brush_Script_MT',_cursive]">{signature.text}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSignatures(prev => prev.filter(s => s.id !== signature.id));
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <span className="text-xs">×</span>
                      </button>
                    </div>
                  </div>
                ))}
              
              {/* Render text elements for this page */}
              {textElements
                .filter(te => te.pageIndex === index)
                .map(textElement => (
                  <div
                    key={textElement.id}
                    className="absolute group"
                    style={{
                      left: `${textElement.x}px`,
                      top: `${textElement.y}px`,
                      pointerEvents: 'auto'
                    }}
                    draggable
                    onDragStart={(e) => handleTextDragStart(e, textElement.id)}
                    onDragEnd={handleTextDragEnd}
                    onDrop={(e) => handleTextDrop(e, index)}
                  >
                    {editingTextId === textElement.id ? (
                      <div className="flex items-start gap-1 bg-white p-2 rounded-lg shadow-lg border-2 border-blue-500">
                        <input
                          type="text"
                          value={editingValue}
                          onChange={handleTextElementChange}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleTextElementSave(textElement.id);
                            if (e.key === 'Escape') handleTextElementCancel();
                          }}
                          className="px-2 py-1 border border-neutral-200 rounded text-sm min-w-[200px]"
                          style={{
                            fontSize: `${textElement.fontSize}px`,
                            color: textElement.color,
                            fontWeight: textElement.fontWeight,
                            fontStyle: textElement.fontStyle
                          }}
                          autoFocus
                        />
                        <button
                          onClick={() => handleTextElementSave(textElement.id)}
                          className="bg-green-500 text-white p-1.5 rounded hover:bg-green-600 transition-all"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleTextElementCancel}
                          className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600 transition-all"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative inline-block">
                        <div
                          onClick={() => (selectedTool === 'edit-text' || selectedTool === 'edit-pdf') && handleTextElementClick(textElement.id)}
                          className={`px-2 py-1 rounded cursor-pointer transition-all ${
                            (selectedTool === 'edit-text' || selectedTool === 'edit-pdf')
                              ? 'hover:bg-blue-50 hover:ring-2 hover:ring-blue-400'
                              : ''
                          }`}
                        >
                          <span
                            style={{
                              fontSize: `${textElement.fontSize}px`,
                              color: textElement.color,
                              fontWeight: textElement.fontWeight,
                              fontStyle: textElement.fontStyle
                            }}
                          >
                            {textElement.text}
                          </span>
                          
                          {/* Edit icon on hover when edit tool is active */}
                          {(selectedTool === 'edit-text' || selectedTool === 'edit-pdf') && (
                            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTextElementClick(textElement.id);
                                }}
                                className="bg-blue-500 text-white p-1 rounded-full shadow-lg hover:bg-blue-600 transition-all"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTextElementDelete(textElement.id);
                                }}
                                className="bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-all"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              
              {/* Page number */}
              <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2.5 py-1 rounded text-xs">
                Page {index + 1}
              </div>
            </div>
          ))}
          
          {selectedFile.pages > 5 && (
            <div className="text-center py-6 text-neutral-500 text-sm">
              + {selectedFile.pages - 5} more pages
            </div>
          )}
        </div>
      </div>
    </div>
  );
}