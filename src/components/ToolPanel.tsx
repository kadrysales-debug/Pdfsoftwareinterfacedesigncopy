import { 
  X, 
  Upload, 
  Download,
  Plus,
  Minus,
  Type,
  Image,
  Link2,
  FileText,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Highlighter,
  Eraser,
  CircleDot,
  Square,
  Circle,
  ArrowRight,
  MessageSquare,
  StickyNote,
  Stamp,
  FileSignature,
  Settings,
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Trash2,
  Copy,
  Scissors,
  ClipboardPaste,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  FileEdit,
  Edit3,
  Wand2
} from 'lucide-react';

interface ToolPanelProps {
  selectedTool: string | null;
  onSelectTool: (tool: string | null) => void;
}

export function ToolPanel({ selectedTool, onSelectTool }: ToolPanelProps) {
  if (!selectedTool) return null;

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'select':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Type className="w-4 h-4 text-white" />
              </div>
              <span>Selection Tool</span>
            </h3>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Copy className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Copy Selection</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Scissors className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Cut Selection</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <ClipboardPaste className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Paste</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition-all text-left flex items-center gap-3">
                <Trash2 className="w-4 h-4 text-red-600" />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </div>
        );

      case 'hand':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
              <span>Hand Tool</span>
            </h3>
            
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-50 to-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-neutral-700">
                  <span className="text-blue-600 font-medium">💡 Tip:</span> Use hand tool to pan and navigate through your document
                </p>
              </div>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <ZoomIn className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Zoom In</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <ZoomOut className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Zoom Out</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <RotateCw className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Rotate Page</span>
              </button>
            </div>
          </div>
        );

      case 'create-pdf':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span>Create PDF</span>
            </h3>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-700 transition-all text-left flex items-center gap-3 shadow-lg">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Blank PDF</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Image className="w-4 h-4 text-blue-600" />
                <span className="text-sm">From Images</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Upload className="w-4 h-4 text-blue-600" />
                <span className="text-sm">From Files</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm">From Clipboard</span>
              </button>
            </div>
          </div>
        );

      case 'edit-text':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Type className="w-4 h-4 text-white" />
              </div>
              <span>Edit Text</span>
            </h3>
            
            <div className="space-y-3">
              {/* Font Style */}
              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Font Style</label>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                    <Bold className="w-4 h-4 mx-auto" />
                  </button>
                  <button className="flex-1 px-3 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                    <Italic className="w-4 h-4 mx-auto" />
                  </button>
                  <button className="flex-1 px-3 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                    <Underline className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>

              {/* Alignment */}
              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Text Alignment</label>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                    <AlignLeft className="w-4 h-4 mx-auto" />
                  </button>
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                    <AlignCenter className="w-4 h-4 mx-auto" />
                  </button>
                  <button className="flex-1 px-3 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                    <AlignRight className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>

              {/* Font Size */}
              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Font Size</label>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 bg-neutral-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center">
                    <Minus className="w-4 h-4" />
                  </button>
                  <input 
                    type="number" 
                    value="14" 
                    className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-center"
                  />
                  <button className="w-8 h-8 bg-neutral-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Color */}
              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Text Color</label>
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-black rounded-lg border-2 border-blue-600"></button>
                  <button className="w-8 h-8 bg-red-600 rounded-lg"></button>
                  <button className="w-8 h-8 bg-blue-600 rounded-lg"></button>
                  <button className="w-8 h-8 bg-green-600 rounded-lg"></button>
                  <button className="w-8 h-8 bg-yellow-500 rounded-lg"></button>
                  <button className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg flex items-center justify-center gap-2 hover:border-blue-400">
                    <Palette className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'add-image':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Image className="w-4 h-4 text-white" />
              </div>
              <span>Add Image</span>
            </h3>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-700 transition-all text-left flex items-center gap-3 shadow-lg">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Upload Image</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Image className="w-4 h-4 text-blue-600" />
                <span className="text-sm">From Gallery</span>
              </button>

              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Image Size</label>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs">Small</button>
                  <button className="flex-1 px-3 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs">Medium</button>
                  <button className="flex-1 px-3 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs">Large</button>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <RotateCw className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Rotate Image</span>
              </button>
            </div>
          </div>
        );

      case 'add-link':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Link2 className="w-4 h-4 text-white" />
              </div>
              <span>Add Link</span>
            </h3>
            
            <div className="space-y-3">
              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Link URL</label>
                <input 
                  type="url" 
                  placeholder="https://example.com" 
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm"
                />
              </div>

              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Link Text</label>
                <input 
                  type="text" 
                  placeholder="Click here" 
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm"
                />
              </div>

              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Link Type</label>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs">Web Page</button>
                  <button className="flex-1 px-3 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs">Email</button>
                  <button className="flex-1 px-3 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs">Page</button>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-700 transition-all text-left flex items-center justify-center gap-3 shadow-lg">
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Link</span>
              </button>
            </div>
          </div>
        );

      case 'edit-pdf':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <FileEdit className="w-4 h-4 text-white" />
              </div>
              <span>Edit PDF</span>
            </h3>
            
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wand2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-700 mb-1">
                      <span className="text-purple-600 font-medium">✨ Edit Mode Active</span>
                    </p>
                    <p className="text-xs text-neutral-600">
                      Click on any text in the PDF to edit it directly
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all text-left flex items-center gap-3 shadow-lg">
                <Edit3 className="w-4 h-4" />
                <span className="text-sm">Edit Text</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-left flex items-center gap-3">
                <Image className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Add/Edit Images</span>
              </button>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-left flex items-center gap-3">
                <Link2 className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Add Links</span>
              </button>

              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Text Formatting</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="px-2 py-2 bg-neutral-100 rounded-lg hover:bg-purple-600 hover:text-white transition-all">
                    <Bold className="w-4 h-4 mx-auto" />
                  </button>
                  <button className="px-2 py-2 bg-neutral-100 rounded-lg hover:bg-purple-600 hover:text-white transition-all">
                    <Italic className="w-4 h-4 mx-auto" />
                  </button>
                  <button className="px-2 py-2 bg-neutral-100 rounded-lg hover:bg-purple-600 hover:text-white transition-all">
                    <Underline className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-left flex items-center gap-3">
                <Trash2 className="w-4 h-4 text-red-600" />
                <span className="text-sm">Delete Selected</span>
              </button>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-left flex items-center gap-3">
                <Save className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Save Changes</span>
              </button>
            </div>
          </div>
        );

      case 'comment':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span>Comment</span>
            </h3>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-700 transition-all text-left flex items-center gap-3 shadow-lg">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Add Comment</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <StickyNote className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Add Sticky Note</span>
              </button>

              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Comment Color</label>
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-yellow-400 rounded-lg border-2 border-yellow-600"></button>
                  <button className="w-8 h-8 bg-red-400 rounded-lg"></button>
                  <button className="w-8 h-8 bg-blue-400 rounded-lg"></button>
                  <button className="w-8 h-8 bg-green-400 rounded-lg"></button>
                  <button className="w-8 h-8 bg-pink-400 rounded-lg"></button>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Show All Comments</span>
              </button>
            </div>
          </div>
        );

      case 'highlight':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Highlighter className="w-4 h-4 text-white" />
              </div>
              <span>Highlight Tool</span>
            </h3>
            
            <div className="space-y-3">
              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Highlight Color</label>
                <div className="flex gap-2">
                  <button className="w-10 h-10 bg-yellow-300 rounded-lg border-2 border-yellow-600 shadow-md"></button>
                  <button className="w-10 h-10 bg-green-300 rounded-lg"></button>
                  <button className="w-10 h-10 bg-blue-300 rounded-lg"></button>
                  <button className="w-10 h-10 bg-pink-300 rounded-lg"></button>
                  <button className="w-10 h-10 bg-orange-300 rounded-lg"></button>
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Opacity</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value="50" 
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-neutral-400 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Eraser className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Remove Highlight</span>
              </button>
            </div>
          </div>
        );

      case 'fill-sign':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <FileSignature className="w-4 h-4 text-white" />
              </div>
              <span>Fill & Sign</span>
            </h3>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-700 transition-all text-left flex items-center gap-3 shadow-lg">
                <FileSignature className="w-4 h-4" />
                <span className="text-sm">Add Signature</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Type className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Add Text Field</span>
              </button>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Square className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Add Checkbox</span>
              </button>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <CircleDot className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Add Radio Button</span>
              </button>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Save className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Save Form</span>
              </button>
            </div>
          </div>
        );

      case 'stamp':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Stamp className="w-4 h-4 text-white" />
              </div>
              <span>Stamp</span>
            </h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-8 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center gap-2">
                  <div className="text-2xl">✅</div>
                  <span className="text-xs">Approved</span>
                </button>
                <button className="px-4 py-8 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center gap-2">
                  <div className="text-2xl">❌</div>
                  <span className="text-xs">Rejected</span>
                </button>
                <button className="px-4 py-8 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center gap-2">
                  <div className="text-2xl">⭐</div>
                  <span className="text-xs">Priority</span>
                </button>
                <button className="px-4 py-8 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center gap-2">
                  <div className="text-2xl">🔒</div>
                  <span className="text-xs">Confidential</span>
                </button>
              </div>

              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-700 transition-all text-left flex items-center gap-3 shadow-lg">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Upload Custom Stamp</span>
              </button>
            </div>
          </div>
        );

      case 'scan-ocr':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span>Scan & OCR</span>
            </h3>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-700 transition-all text-left flex items-center gap-3 shadow-lg">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Scan Document</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Extract Text (OCR)</span>
              </button>

              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Language</label>
                <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm">
                  <option>Arabic - العربية</option>
                  <option>English</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Settings className="w-4 h-4 text-blue-600" />
                <span className="text-sm">OCR Settings</span>
              </button>
            </div>
          </div>
        );

      case 'erase':
        return (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Eraser className="w-4 h-4 text-white" />
              </div>
              <span>Erase Tool</span>
            </h3>
            
            <div className="space-y-3">
              <div className="bg-white border border-neutral-200 rounded-xl p-3">
                <label className="text-xs text-neutral-500 mb-2 block">Eraser Size</label>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value="10" 
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-neutral-400 mt-1">
                  <span>Small</span>
                  <span>Medium</span>
                  <span>Large</span>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Eraser className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Erase Annotations</span>
              </button>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Trash2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Clear All Annotations</span>
              </button>

              <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-3">
                <Undo className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Undo Last Action</span>
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🔧</div>
            <p className="text-sm text-neutral-500">Tool options will appear here</p>
          </div>
        );
    }
  };

  return (
    <div className="w-80 border-l border-neutral-200 bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-neutral-50 to-white">
        <h2 className="text-neutral-900">Tool Options</h2>
        <button
          onClick={() => onSelectTool(null)}
          className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-neutral-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderToolContent()}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-neutral-200 bg-gradient-to-r from-neutral-50 to-white">
        <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
          <span>🇸🇦</span>
          <span>Made in Saudi Arabia • Tech Solutions</span>
        </div>
      </div>
    </div>
  );
}