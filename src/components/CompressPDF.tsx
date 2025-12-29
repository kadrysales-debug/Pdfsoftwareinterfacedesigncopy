import { useState } from 'react';
import { X, Upload, FileDown, Minimize2, Zap, Check, ArrowLeft, Trash2, File } from 'lucide-react';

interface CompressPDFProps {
  onClose?: () => void;
  onBack?: () => void;
}

interface PDFFileItem {
  id: string;
  name: string;
  size: string;
  sizeBytes: number;
  thumbnail: string;
}

export function CompressPDF({ onClose, onBack }: CompressPDFProps) {
  const [files, setFiles] = useState<PDFFileItem[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [compressedSize, setCompressedSize] = useState<string>('');
  const [compressionRatio, setCompressionRatio] = useState<number>(0);

  const handleFileUpload = () => {
    // Simulate file upload
    const newFiles: PDFFileItem[] = [
      {
        id: '1',
        name: 'Large_Document.pdf',
        size: '15.2 MB',
        sizeBytes: 15200000,
        thumbnail: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=80'
      },
      {
        id: '2',
        name: 'Presentation_Slides.pdf',
        size: '8.5 MB',
        sizeBytes: 8500000,
        thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80'
      }
    ];
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const getTotalSize = () => {
    const totalBytes = files.reduce((acc, file) => acc + file.sizeBytes, 0);
    return (totalBytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getCompressionInfo = () => {
    switch (compressionLevel) {
      case 'low':
        return { quality: '90%', reduction: '20-30%', speed: 'Fast' };
      case 'medium':
        return { quality: '75%', reduction: '40-60%', speed: 'Moderate' };
      case 'high':
        return { quality: '60%', reduction: '70-80%', speed: 'Slow' };
    }
  };

  const handleCompress = () => {
    setIsCompressing(true);
    setCompressionProgress(0);

    // Simulate compression process
    const interval = setInterval(() => {
      setCompressionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompressing(false);
          setIsComplete(true);
          
          // Calculate compressed size based on compression level
          const totalBytes = files.reduce((acc, file) => acc + file.sizeBytes, 0);
          let ratio = 0.5; // 50% for medium
          if (compressionLevel === 'low') ratio = 0.75; // 25% reduction
          if (compressionLevel === 'high') ratio = 0.25; // 75% reduction
          
          const compressed = totalBytes * ratio;
          setCompressedSize((compressed / (1024 * 1024)).toFixed(1) + ' MB');
          setCompressionRatio(Math.round((1 - ratio) * 100));
          
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const info = getCompressionInfo();

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-orange-300/20 to-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-neutral-200 px-8 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {(onClose || onBack) && (
              <button
                onClick={onClose || onBack}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-neutral-600" />
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Minimize2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-neutral-900">Compress PDF</h1>
                <p className="text-sm text-neutral-500">Reduce file size while maintaining quality</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-200">
              <span className="text-xs text-green-800">🇸🇦 Made in Saudi Arabia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 overflow-y-auto px-8 py-6">
        {!isComplete ? (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Upload Area */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
              <div className="p-6 border-b border-neutral-200 bg-gradient-to-r from-orange-50 to-amber-50">
                <h2 className="flex items-center gap-2 text-neutral-900">
                  <Upload className="w-5 h-5 text-orange-600" />
                  Select PDF Files
                </h2>
              </div>
              
              <div className="p-8">
                <div
                  onClick={handleFileUpload}
                  className="border-2 border-dashed border-orange-300 rounded-2xl p-12 text-center hover:border-orange-500 hover:bg-orange-50/50 transition-all cursor-pointer group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-orange-600" />
                  </div>
                  <p className="text-neutral-700 mb-2">Click to upload PDF files</p>
                  <p className="text-sm text-neutral-500">or drag and drop your files here</p>
                </div>

                {/* Files List */}
                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm text-neutral-700">Selected Files ({files.length})</h3>
                      <span className="text-sm text-neutral-500">Total Size: {getTotalSize()}</span>
                    </div>
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 group hover:shadow-md transition-all"
                      >
                        <img
                          src={file.thumbnail}
                          alt={file.name}
                          className="w-12 h-12 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-neutral-900">{file.name}</p>
                          <p className="text-xs text-neutral-500">{file.size}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(file.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Compression Settings */}
            {files.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                <div className="p-6 border-b border-neutral-200 bg-gradient-to-r from-orange-50 to-amber-50">
                  <h2 className="flex items-center gap-2 text-neutral-900">
                    <Zap className="w-5 h-5 text-orange-600" />
                    Compression Level
                  </h2>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Low Compression */}
                    <button
                      onClick={() => setCompressionLevel('low')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        compressionLevel === 'low'
                          ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg'
                          : 'border-neutral-200 hover:border-orange-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-neutral-900">Low</h3>
                        {compressionLevel === 'low' && (
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-2 text-left">
                        <p className="text-xs text-neutral-600">Quality: <span className="font-medium text-orange-600">90%</span></p>
                        <p className="text-xs text-neutral-600">Reduction: <span className="font-medium">20-30%</span></p>
                        <p className="text-xs text-neutral-600">Speed: <span className="font-medium">Fast</span></p>
                      </div>
                    </button>

                    {/* Medium Compression */}
                    <button
                      onClick={() => setCompressionLevel('medium')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        compressionLevel === 'medium'
                          ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg'
                          : 'border-neutral-200 hover:border-orange-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-neutral-900">Medium</h3>
                        {compressionLevel === 'medium' && (
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-2 text-left">
                        <p className="text-xs text-neutral-600">Quality: <span className="font-medium text-orange-600">75%</span></p>
                        <p className="text-xs text-neutral-600">Reduction: <span className="font-medium">40-60%</span></p>
                        <p className="text-xs text-neutral-600">Speed: <span className="font-medium">Moderate</span></p>
                      </div>
                    </button>

                    {/* High Compression */}
                    <button
                      onClick={() => setCompressionLevel('high')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        compressionLevel === 'high'
                          ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg'
                          : 'border-neutral-200 hover:border-orange-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-neutral-900">High</h3>
                        {compressionLevel === 'high' && (
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-2 text-left">
                        <p className="text-xs text-neutral-600">Quality: <span className="font-medium text-orange-600">60%</span></p>
                        <p className="text-xs text-neutral-600">Reduction: <span className="font-medium">70-80%</span></p>
                        <p className="text-xs text-neutral-600">Speed: <span className="font-medium">Slow</span></p>
                      </div>
                    </button>
                  </div>

                  {/* Compression Info Box */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-900">
                      💡 <strong>Tip:</strong> For documents with images, higher compression levels can significantly reduce file size.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Compression Progress */}
            {isCompressing && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Minimize2 className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl text-neutral-900 mb-2">Compressing Files...</h3>
                    <p className="text-sm text-neutral-500">Please wait while we optimize your PDFs</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-600">Progress</span>
                      <span className="text-orange-600">{compressionProgress}%</span>
                    </div>
                    <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300 rounded-full"
                        style={{ width: `${compressionProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            {files.length > 0 && !isCompressing && (
              <div className="flex justify-center">
                <button
                  onClick={handleCompress}
                  className="px-12 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-3"
                >
                  <Minimize2 className="w-5 h-5" />
                  <span>Compress PDF Files</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Success Screen */
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
              <div className="p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Check className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl text-neutral-900 mb-3">Compression Complete!</h2>
                <p className="text-neutral-600 mb-8">Your PDF files have been successfully compressed</p>

                {/* Compression Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                    <p className="text-sm text-neutral-600 mb-2">Original Size</p>
                    <p className="text-2xl text-orange-600">{getTotalSize()}</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <p className="text-sm text-neutral-600 mb-2">Compressed Size</p>
                    <p className="text-2xl text-green-600">{compressedSize}</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-neutral-600 mb-2">Space Saved</p>
                    <p className="text-2xl text-blue-600">{compressionRatio}%</p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all shadow-lg flex items-center gap-2">
                    <FileDown className="w-5 h-5" />
                    Download Compressed Files
                  </button>
                  <button
                    onClick={() => {
                      setFiles([]);
                      setIsComplete(false);
                      setCompressionProgress(0);
                    }}
                    className="px-8 py-3 bg-white border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-all"
                  >
                    Compress More Files
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
