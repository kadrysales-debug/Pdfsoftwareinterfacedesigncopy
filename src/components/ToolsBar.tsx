import { 
  MousePointer2, 
  Hand, 
  FileEdit, 
  MessageSquare, 
  FileSignature, 
  FileText, 
  StickyNote, 
  Eraser,
  Highlighter,
  Type,
  Image,
  Link2,
  FilePlus,
  Combine,
  FileOutput,
  FolderTree,
  Send,
  ScanText,
  Stamp
} from 'lucide-react';
import { useState } from 'react';

export function ToolsBar({ onToolSelect }: { onToolSelect?: (toolId: string) => void }) {
  const [selectedTool, setSelectedTool] = useState('select');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toolCategories = [
    {
      id: 'selection',
      label: 'Selection',
      tools: [
        { id: 'select', icon: MousePointer2, label: 'Select' },
        { id: 'hand', icon: Hand, label: 'Hand Tool' },
      ]
    },
    {
      id: 'create',
      label: 'Create & Combine',
      tools: [
        { id: 'create-pdf', icon: FilePlus, label: 'Create PDF' },
        { id: 'combine-pdf', icon: Combine, label: 'Combine PDF' },
      ]
    },
    {
      id: 'edit',
      label: 'Edit',
      tools: [
        { id: 'edit-text', icon: Type, label: 'Edit Text' },
        { id: 'edit-pdf', icon: FileEdit, label: 'Edit PDF' },
        { id: 'add-image', icon: Image, label: 'Add Image' },
        { id: 'add-link', icon: Link2, label: 'Add Link' },
      ]
    },
    {
      id: 'organize',
      label: 'Organize & Export',
      tools: [
        { id: 'organize-pdf', icon: FolderTree, label: 'Organize PDF' },
        { id: 'export-pdf', icon: FileOutput, label: 'Export PDF' },
      ]
    },
    {
      id: 'annotate',
      label: 'Annotate',
      tools: [
        { id: 'comment', icon: MessageSquare, label: 'Comment' },
        { id: 'send-comments', icon: Send, label: 'Send for Comments' },
        { id: 'highlight', icon: Highlighter, label: 'Highlight' },
        { id: 'note', icon: StickyNote, label: 'Sticky Note' },
        { id: 'stamp', icon: Stamp, label: 'Stamp' },
      ]
    },
    {
      id: 'document',
      label: 'Document Actions',
      tools: [
        { id: 'fill-sign', icon: FileSignature, label: 'Fill & Sign' },
        { id: 'scan-ocr', icon: ScanText, label: 'Scan & OCR' },
        { id: 'erase', icon: Eraser, label: 'Erase' },
      ]
    }
  ];

  const handleToolClick = (toolId: string, categoryId: string) => {
    setSelectedTool(toolId);
    setExpandedCategory(null);
    if (onToolSelect) {
      onToolSelect(toolId);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="relative flex">
      {/* Main vertical toolbar */}
      <div className="w-14 bg-white border-r border-neutral-200 flex flex-col items-center py-4 gap-2">
        {toolCategories.map((category) => {
          const firstTool = category.tools[0];
          const Icon = firstTool.icon;
          const isExpanded = expandedCategory === category.id;
          const isCategoryActive = category.tools.some(tool => tool.id === selectedTool);

          return (
            <div key={category.id} className="relative">
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all group relative ${
                  isCategoryActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
                title={category.label}
              >
                <Icon className="w-5 h-5" />
                
                {/* Hover tooltip */}
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                  {category.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-4px] w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-neutral-900"></div>
                </div>
              </button>

              {/* Expanded tool panel */}
              {isExpanded && (
                <div className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 px-1 z-50 min-w-[160px]">
                  <div className="px-2 pb-2 mb-2 border-b border-neutral-200">
                    <span className="text-xs text-neutral-500 uppercase tracking-wide">{category.label}</span>
                  </div>
                  {category.tools.map((tool) => {
                    const ToolIcon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleToolClick(tool.id, category.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedTool === tool.id
                            ? 'bg-blue-600 text-white'
                            : 'text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <ToolIcon className="w-4 h-4" />
                        <span>{tool.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Overlay to close expanded panel when clicking outside */}
      {expandedCategory && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setExpandedCategory(null)}
        />
      )}
    </div>
  );
}