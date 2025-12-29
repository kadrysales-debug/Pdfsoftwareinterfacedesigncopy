import { X } from 'lucide-react';
import { PDFFile } from '../App';

interface TabsBarProps {
  openFiles: PDFFile[];
  activeFileId: string | null;
  onSelectFile: (fileId: string) => void;
  onCloseFile: (fileId: string) => void;
}

export function TabsBar({ openFiles, activeFileId, onSelectFile, onCloseFile }: TabsBarProps) {
  if (openFiles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-b border-neutral-200 flex items-center gap-1 px-2 overflow-x-auto">
      {openFiles.map((file) => {
        const isActive = file.id === activeFileId;
        
        return (
          <div
            key={file.id}
            className={`group flex items-center gap-2 px-4 py-2 border-r border-neutral-200 cursor-pointer min-w-[180px] max-w-[220px] relative transition-colors ${
              isActive
                ? 'bg-blue-50 border-b-2 border-b-blue-600'
                : 'bg-neutral-50 hover:bg-neutral-100'
            }`}
            onClick={() => onSelectFile(file.id)}
          >
            {/* File Icon */}
            <div className={`w-5 h-6 rounded flex items-center justify-center text-xs ${
              isActive ? 'bg-blue-600 text-white' : 'bg-neutral-300 text-neutral-600'
            }`}>
              PDF
            </div>
            
            {/* File Name */}
            <span className={`flex-1 truncate text-sm ${
              isActive ? 'text-blue-900 font-medium' : 'text-neutral-700'
            }`}>
              {file.name}
            </span>
            
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseFile(file.id);
              }}
              className={`w-5 h-5 flex items-center justify-center rounded hover:bg-neutral-200 transition-colors ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
              title="Close"
            >
              <X className="w-3.5 h-3.5 text-neutral-600" />
            </button>
          </div>
        );
      })}
      
      {/* Tabs count indicator */}
      {openFiles.length > 3 && (
        <div className="px-3 py-2 text-xs text-neutral-500 whitespace-nowrap">
          {openFiles.length} files open
        </div>
      )}
    </div>
  );
}
