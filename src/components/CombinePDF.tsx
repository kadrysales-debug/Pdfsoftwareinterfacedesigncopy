import { Upload, X, FileText, ArrowUpDown, Combine, Download, Plus } from 'lucide-react';
import { useState } from 'react';

interface PDFFileToCombine {
  id: string;
  name: string;
  size: string;
  pages: number;
}

export function CombinePDF({ onClose }: { onClose: () => void }) {
  const [files, setFiles] = useState<PDFFileToCombine[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleAddFiles = () => {
    // Simulate adding files
    const newFiles: PDFFileToCombine[] = [
      {
        id: Date.now().toString() + '1',
        name: 'Document_Part_1.pdf',
        size: '1.2 MB',
        pages: 15
      },
      {
        id: Date.now().toString() + '2',
        name: 'Document_Part_2.pdf',
        size: '2.4 MB',
        pages: 23
      }
    ];
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const handleCombine = () => {
    // Simulate combining files
    console.log('Combining files:', files);
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    const newFiles = [...files];
    const [movedFile] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, movedFile);
    setFiles(newFiles);
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Combine className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-neutral-900">Combine PDF Files</h2>
              <p className="text-sm text-neutral-500">Merge multiple PDF files into one document</p>
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

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center mb-6 transition-all ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-neutral-300 hover:border-blue-400 hover:bg-blue-50/50'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleAddFiles();
            }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-neutral-900 mb-2">Drop PDF files here</h3>
                <p className="text-sm text-neutral-500 mb-4">or click the button below to browse</p>
              </div>
              <button
                onClick={handleAddFiles}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Files</span>
              </button>
              <p className="text-xs text-neutral-400 flex items-center gap-2 mt-2">
                <span>🇸🇦</span>
                <span>Made in Saudi Arabia • Tech Solutions</span>
              </p>
            </div>
          </div>

          {/* Files List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Files to Combine ({files.length})</span>
                </h3>
                <span className="text-sm text-neutral-500 flex items-center gap-1">
                  <ArrowUpDown className="w-4 h-4" />
                  Drag to reorder
                </span>
              </div>

              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={file.id}
                    className="bg-white border border-neutral-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all group"
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
                      moveFile(fromIndex, index);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Order Number */}
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-md flex-shrink-0">
                        {index + 1}
                      </div>

                      {/* File Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-red-600" />
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <div className="text-neutral-900 truncate">{file.name}</div>
                        <div className="text-sm text-neutral-500 flex items-center gap-3">
                          <span>{file.pages} pages</span>
                          <span>•</span>
                          <span>{file.size}</span>
                        </div>
                      </div>

                      {/* Drag Handle */}
                      <div className="cursor-move text-neutral-400 group-hover:text-neutral-600 transition-colors">
                        <ArrowUpDown className="w-5 h-5" />
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFile(file.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded-lg transition-colors group/btn"
                      >
                        <X className="w-4 h-4 text-neutral-400 group-hover/btn:text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-neutral-200">
                <button
                  onClick={handleAddFiles}
                  className="px-6 py-3 bg-white border-2 border-neutral-300 text-neutral-700 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add More Files</span>
                </button>

                <button
                  onClick={handleCombine}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Combine className="w-4 h-4" />
                  <span>Combine {files.length} Files</span>
                </button>

                <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mt-4">
                <div className="flex gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="text-sm text-neutral-900 mb-1">Tips:</h4>
                    <ul className="text-xs text-neutral-600 space-y-1">
                      <li>• Drag files to reorder them before combining</li>
                      <li>• The combined PDF will maintain the order shown above</li>
                      <li>• You can add more files at any time</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {files.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-neutral-600 mb-2">No files added yet</h3>
              <p className="text-sm text-neutral-400">Add PDF files to start combining them</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}