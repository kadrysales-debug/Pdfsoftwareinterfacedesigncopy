import { useState } from 'react';
import { X, Upload, Lock, Shield, Eye, EyeOff, Check, ArrowLeft, Trash2, Key, FileDown, ShieldCheck } from 'lucide-react';

interface ProtectPDFProps {
  onClose?: () => void;
  onBack?: () => void;
}

interface PDFFileItem {
  id: string;
  name: string;
  size: string;
  pages: number;
  thumbnail: string;
}

export function ProtectPDF({ onClose, onBack }: ProtectPDFProps) {
  const [files, setFiles] = useState<PDFFileItem[]>([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [permissions, setPermissions] = useState({
    printing: true,
    copying: false,
    editing: false,
    commenting: true
  });
  const [encryptionLevel, setEncryptionLevel] = useState<'standard' | 'high'>('high');
  const [isProtecting, setIsProtecting] = useState(false);
  const [protectionProgress, setProtectionProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleFileUpload = () => {
    // Simulate file upload
    const newFiles: PDFFileItem[] = [
      {
        id: '1',
        name: 'Confidential_Report.pdf',
        size: '3.2 MB',
        pages: 24,
        thumbnail: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=80'
      },
      {
        id: '2',
        name: 'Contract_Agreement.pdf',
        size: '1.8 MB',
        pages: 12,
        thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80'
      }
    ];
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const passwordsMatch = password === confirmPassword && password.length > 0;
  const canProtect = files.length > 0 && passwordsMatch && password.length >= 6;

  const handleProtect = () => {
    if (!canProtect) return;
    
    setIsProtecting(true);
    setProtectionProgress(0);

    // Simulate protection process
    const interval = setInterval(() => {
      setProtectionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProtecting(false);
          setIsComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return { level: 'none', color: 'neutral', text: '' };
    if (password.length < 6) return { level: 'weak', color: 'red', text: 'Too short (min 6 characters)' };
    if (password.length < 10) return { level: 'medium', color: 'yellow', text: 'Medium strength' };
    return { level: 'strong', color: 'green', text: 'Strong password' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-red-50 via-white to-rose-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-red-200/30 to-rose-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-red-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-neutral-900">Protect PDF</h1>
                <p className="text-sm text-neutral-500">Secure your PDFs with password protection</p>
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
              <div className="p-6 border-b border-neutral-200 bg-gradient-to-r from-red-50 to-rose-50">
                <h2 className="flex items-center gap-2 text-neutral-900">
                  <Upload className="w-5 h-5 text-red-600" />
                  Select PDF Files
                </h2>
              </div>
              
              <div className="p-8">
                <div
                  onClick={handleFileUpload}
                  className="border-2 border-dashed border-red-300 rounded-2xl p-12 text-center hover:border-red-500 hover:bg-red-50/50 transition-all cursor-pointer group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-red-600" />
                  </div>
                  <p className="text-neutral-700 mb-2">Click to upload PDF files</p>
                  <p className="text-sm text-neutral-500">or drag and drop your files here</p>
                </div>

                {/* Files List */}
                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h3 className="text-sm text-neutral-700">Selected Files ({files.length})</h3>
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200 group hover:shadow-md transition-all"
                      >
                        <img
                          src={file.thumbnail}
                          alt={file.name}
                          className="w-12 h-12 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-neutral-900">{file.name}</p>
                          <p className="text-xs text-neutral-500">{file.size} • {file.pages} pages</p>
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

            {/* Security Settings */}
            {files.length > 0 && (
              <>
                {/* Password Protection */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                  <div className="p-6 border-b border-neutral-200 bg-gradient-to-r from-red-50 to-rose-50">
                    <h2 className="flex items-center gap-2 text-neutral-900">
                      <Key className="w-5 h-5 text-red-600" />
                      Password Protection
                    </h2>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    {/* Password Input */}
                    <div>
                      <label className="block text-sm text-neutral-700 mb-2">Set Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password (min 6 characters)"
                          className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all pr-12"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5 text-neutral-500" />
                          ) : (
                            <Eye className="w-5 h-5 text-neutral-500" />
                          )}
                        </button>
                      </div>
                      {password.length > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all ${
                                  strength.color === 'red' ? 'bg-red-500 w-1/3' :
                                  strength.color === 'yellow' ? 'bg-yellow-500 w-2/3' :
                                  'bg-green-500 w-full'
                                }`}
                              ></div>
                            </div>
                          </div>
                          <p className={`text-xs ${
                            strength.color === 'red' ? 'text-red-600' :
                            strength.color === 'yellow' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            {strength.text}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm text-neutral-700 mb-2">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all pr-12 ${
                            confirmPassword.length > 0
                              ? passwordsMatch
                                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                                : 'border-red-500 focus:border-red-500 focus:ring-red-200'
                              : 'border-neutral-300 focus:border-red-500 focus:ring-red-200'
                          }`}
                        />
                        <button
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5 text-neutral-500" />
                          ) : (
                            <Eye className="w-5 h-5 text-neutral-500" />
                          )}
                        </button>
                      </div>
                      {confirmPassword.length > 0 && (
                        <p className={`text-xs mt-2 ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                          {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                        </p>
                      )}
                    </div>

                    {/* Encryption Level */}
                    <div>
                      <label className="block text-sm text-neutral-700 mb-3">Encryption Level</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setEncryptionLevel('standard')}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            encryptionLevel === 'standard'
                              ? 'border-red-500 bg-gradient-to-br from-red-50 to-rose-50'
                              : 'border-neutral-200 hover:border-red-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-neutral-900">Standard (128-bit)</h3>
                            {encryptionLevel === 'standard' && (
                              <Check className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <p className="text-xs text-neutral-600">Compatible with all PDF readers</p>
                        </button>

                        <button
                          onClick={() => setEncryptionLevel('high')}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            encryptionLevel === 'high'
                              ? 'border-red-500 bg-gradient-to-br from-red-50 to-rose-50'
                              : 'border-neutral-200 hover:border-red-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-neutral-900">High (256-bit AES)</h3>
                            {encryptionLevel === 'high' && (
                              <Check className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <p className="text-xs text-neutral-600">Maximum security (Recommended)</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                  <div className="p-6 border-b border-neutral-200 bg-gradient-to-r from-red-50 to-rose-50">
                    <h2 className="flex items-center gap-2 text-neutral-900">
                      <Shield className="w-5 h-5 text-red-600" />
                      Document Permissions
                    </h2>
                  </div>
                  
                  <div className="p-8">
                    <div className="space-y-4">
                      {/* Printing */}
                      <label className="flex items-center gap-3 p-4 bg-white border border-neutral-200 rounded-xl hover:bg-red-50/50 hover:border-red-300 transition-all cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={permissions.printing}
                          onChange={(e) => setPermissions({ ...permissions, printing: e.target.checked })}
                          className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-neutral-900">Allow Printing</p>
                          <p className="text-xs text-neutral-500">Users can print this document</p>
                        </div>
                      </label>

                      {/* Copying */}
                      <label className="flex items-center gap-3 p-4 bg-white border border-neutral-200 rounded-xl hover:bg-red-50/50 hover:border-red-300 transition-all cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={permissions.copying}
                          onChange={(e) => setPermissions({ ...permissions, copying: e.target.checked })}
                          className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-neutral-900">Allow Copying Text & Images</p>
                          <p className="text-xs text-neutral-500">Users can copy content from document</p>
                        </div>
                      </label>

                      {/* Editing */}
                      <label className="flex items-center gap-3 p-4 bg-white border border-neutral-200 rounded-xl hover:bg-red-50/50 hover:border-red-300 transition-all cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={permissions.editing}
                          onChange={(e) => setPermissions({ ...permissions, editing: e.target.checked })}
                          className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-neutral-900">Allow Editing</p>
                          <p className="text-xs text-neutral-500">Users can modify document content</p>
                        </div>
                      </label>

                      {/* Commenting */}
                      <label className="flex items-center gap-3 p-4 bg-white border border-neutral-200 rounded-xl hover:bg-red-50/50 hover:border-red-300 transition-all cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={permissions.commenting}
                          onChange={(e) => setPermissions({ ...permissions, commenting: e.target.checked })}
                          className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-neutral-900">Allow Commenting</p>
                          <p className="text-xs text-neutral-500">Users can add comments and annotations</p>
                        </div>
                      </label>
                    </div>

                    {/* Security Info Box */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <p className="text-sm text-blue-900">
                        🔒 <strong>Security Notice:</strong> Password-protected PDFs use industry-standard encryption to keep your documents secure.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Protection Progress */}
            {isProtecting && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Lock className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl text-neutral-900 mb-2">Protecting Files...</h3>
                    <p className="text-sm text-neutral-500">Applying encryption and security settings</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-600">Progress</span>
                      <span className="text-red-600">{protectionProgress}%</span>
                    </div>
                    <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-300 rounded-full"
                        style={{ width: `${protectionProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            {files.length > 0 && !isProtecting && (
              <div className="flex justify-center">
                <button
                  onClick={handleProtect}
                  disabled={!canProtect}
                  className={`px-12 py-4 rounded-xl transition-all shadow-xl flex items-center gap-3 ${
                    canProtect
                      ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 hover:shadow-2xl hover:scale-105'
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  <span>Protect PDF Files</span>
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
                  <ShieldCheck className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl text-neutral-900 mb-3">Protection Applied!</h2>
                <p className="text-neutral-600 mb-8">Your PDF files are now password-protected and secure</p>

                {/* Security Summary */}
                <div className="mb-8 space-y-3">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 justify-center">
                      <Lock className="w-5 h-5 text-green-600" />
                      <p className="text-sm text-neutral-700">
                        <strong>Encryption:</strong> {encryptionLevel === 'high' ? '256-bit AES' : '128-bit'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 justify-center">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <p className="text-sm text-neutral-700">
                        <strong>Protected Files:</strong> {files.length} document{files.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <p className="text-sm text-neutral-700">
                      <strong>Permissions:</strong> {
                        Object.entries(permissions).filter(([_, v]) => v).map(([k]) => 
                          k.charAt(0).toUpperCase() + k.slice(1)
                        ).join(', ') || 'None'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button className="px-8 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:from-red-600 hover:to-rose-700 transition-all shadow-lg flex items-center gap-2">
                    <FileDown className="w-5 h-5" />
                    Download Protected Files
                  </button>
                  <button
                    onClick={() => {
                      setFiles([]);
                      setPassword('');
                      setConfirmPassword('');
                      setIsComplete(false);
                      setProtectionProgress(0);
                    }}
                    className="px-8 py-3 bg-white border-2 border-red-500 text-red-600 rounded-xl hover:bg-red-50 transition-all"
                  >
                    Protect More Files
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
