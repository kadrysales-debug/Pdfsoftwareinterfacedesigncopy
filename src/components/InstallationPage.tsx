import { useState, useEffect } from 'react';
import { 
  Download, 
  HardDrive, 
  Settings, 
  CheckCircle2, 
  Loader2,
  FileText,
  Zap,
  Shield,
  Cloud,
  Folder,
  ChevronRight,
  SkipForward,
  Heart
} from 'lucide-react';

type InstallStage = 'downloading' | 'preparing' | 'installing' | 'configuring' | 'completing' | 'saudi' | 'completed';

interface InstallOption {
  id: string;
  label: string;
  description: string;
  icon: any;
  selected: boolean;
}

export function InstallationPage({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<InstallStage>('downloading');
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [autoProgress, setAutoProgress] = useState(true);
  const [installOptions, setInstallOptions] = useState<InstallOption[]>([
    {
      id: 'desktop',
      label: 'Create Desktop Shortcut',
      description: 'Add Malaf icon to your desktop',
      icon: HardDrive,
      selected: true
    },
    {
      id: 'autostart',
      label: 'Launch at Startup',
      description: 'Start Malaf when Windows starts',
      icon: Zap,
      selected: false
    },
    {
      id: 'cloud',
      label: 'Enable Cloud Sync',
      description: 'Sync documents across devices',
      icon: Cloud,
      selected: true
    },
    {
      id: 'default',
      label: 'Set as Default PDF Reader',
      description: 'Open PDF files with Malaf by default',
      icon: FileText,
      selected: true
    }
  ]);

  const stageInfo = {
    downloading: {
      title: 'Downloading Malaf',
      subtitle: 'Getting the latest version...',
      icon: Download,
      color: 'text-blue-600'
    },
    preparing: {
      title: 'Preparing Installation',
      subtitle: 'Extracting files and verifying integrity...',
      icon: Folder,
      color: 'text-purple-600'
    },
    installing: {
      title: 'Installing Components',
      subtitle: 'Setting up Malaf Document Suite...',
      icon: HardDrive,
      color: 'text-indigo-600'
    },
    configuring: {
      title: 'Configuring Settings',
      subtitle: 'Applying your preferences...',
      icon: Settings,
      color: 'text-blue-600'
    },
    completing: {
      title: 'Finalizing Installation',
      subtitle: 'Almost ready to use...',
      icon: Loader2,
      color: 'text-purple-600'
    },
    saudi: {
      title: 'Made in Saudi Arabia',
      subtitle: 'صُنع في المملكة العربية السعودية 🇸🇦',
      icon: Heart,
      color: 'text-green-600'
    },
    completed: {
      title: 'Installation Complete!',
      subtitle: 'Malaf is ready to use',
      icon: CheckCircle2,
      color: 'text-green-600'
    }
  };

  const files = [
    'core-engine.dll',
    'pdf-renderer.dll',
    'annotation-toolkit.dll',
    'ui-components.dll',
    'cloud-sync.dll',
    'security-manager.dll',
    'resources-ar.dll',
    'resources-en.dll'
  ];

  useEffect(() => {
    if (!autoProgress) return;
    
    let interval: any;
    
    const stages: InstallStage[] = ['downloading', 'preparing', 'installing', 'configuring', 'completing', 'saudi', 'completed'];
    let currentStageIndex = stages.indexOf(stage);

    interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          currentStageIndex++;
          if (currentStageIndex < stages.length) {
            setStage(stages[currentStageIndex]);
            return 0;
          } else {
            clearInterval(interval);
            return 100;
          }
        }
        return prev + 1;
      });

      // Update current file being processed
      if (stage === 'installing') {
        const fileIndex = Math.floor((progress / 100) * files.length);
        if (fileIndex < files.length) {
          setCurrentFile(files[fileIndex]);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [stage, autoProgress]);

  const handleStageClick = (clickedStage: string) => {
    setAutoProgress(false);
    setStage(clickedStage as InstallStage);
    setProgress(50); // Set to middle of stage
  };

  const toggleOption = (id: string) => {
    setInstallOptions(prev =>
      prev.map(opt => opt.id === id ? { ...opt, selected: !opt.selected } : opt)
    );
  };

  const CurrentIcon = stageInfo[stage].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-3xl w-full mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-2xl">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl mb-2 text-neutral-900">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Malaf</span>
            <span className="text-neutral-400 mx-2">|</span>
            <span className="text-neutral-700">Document Suite</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-green-700 bg-green-50 px-4 py-2 rounded-full inline-flex mt-3">
            <span>🇸🇦</span>
            <span>Made in Saudi Arabia</span>
          </div>
        </div>

        {/* Installation Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 mb-6">
          {/* Current Stage */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-4">
              <CurrentIcon className={`w-8 h-8 ${stageInfo[stage].color} ${stage === 'completing' || stage === 'downloading' ? 'animate-spin' : ''}`} />
            </div>
            <h2 className="text-2xl text-neutral-900 mb-2">{stageInfo[stage].title}</h2>
            <p className="text-neutral-600">{stageInfo[stage].subtitle}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">Progress</span>
              <span className="text-sm text-neutral-900">{progress}%</span>
            </div>
            <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            {currentFile && stage === 'installing' && (
              <p className="text-xs text-neutral-500 mt-2">Installing: {currentFile}</p>
            )}
          </div>

          {/* Installation Stages Timeline */}
          <div className="grid grid-cols-7 gap-1 mb-8">
            {Object.entries(stageInfo).map(([key, info], index) => {
              const Icon = info.icon;
              const isActive = key === stage;
              const isCompleted = Object.keys(stageInfo).indexOf(key) < Object.keys(stageInfo).indexOf(stage);
              
              // Special styling for Saudi stage
              const isSaudiStage = key === 'saudi';
              
              return (
                <button 
                  key={key} 
                  onClick={() => handleStageClick(key)}
                  className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isCompleted 
                      ? 'bg-green-100 text-green-600' 
                      : isActive 
                        ? isSaudiStage 
                          ? 'bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-500 ' + info.color
                          : 'bg-gradient-to-br from-blue-100 to-purple-100 ' + info.color 
                        : 'bg-neutral-100 text-neutral-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isSaudiStage && isActive ? (
                      <Icon className="w-5 h-5 animate-pulse" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isActive && (key === 'completing' || key === 'downloading') ? 'animate-spin' : ''}`} />
                    )}
                  </div>
                  <span className={`text-[10px] mt-1 text-center ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`}>
                    {isSaudiStage ? 'Saudi' : info.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Installation Options */}
          {stage !== 'completed' && (
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-sm text-neutral-700 mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Installation Options
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {installOptions.map(option => {
                  const OptionIcon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                        option.selected 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        option.selected ? 'border-blue-600 bg-blue-600' : 'border-neutral-300'
                      }`}>
                        {option.selected && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <OptionIcon className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                          <p className="text-sm text-neutral-900">{option.label}</p>
                        </div>
                        <p className="text-xs text-neutral-500">{option.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Skip Installation Button */}
              <button
                onClick={onComplete}
                className="w-full group px-6 py-4 bg-gradient-to-r from-neutral-50 to-neutral-100 hover:from-blue-50 hover:to-purple-50 border-2 border-neutral-200 hover:border-blue-300 text-neutral-700 hover:text-blue-700 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <SkipForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span className="font-medium">Skip Installation & Launch Now</span>
                <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          )}

          {/* Completion Message */}
          {stage === 'completed' && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full mb-6">
                <CheckCircle2 className="w-5 h-5" />
                <span>All components installed successfully!</span>
              </div>
              
              <button
                onClick={onComplete}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2"
              >
                <span>Launch Malaf Document Suite</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* System Info */}
        <div className="flex items-center justify-center gap-6 text-sm text-neutral-600">
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Secure Installation</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <HardDrive className="w-4 h-4 text-blue-600" />
            <span>v2.5.0 • 125 MB</span>
          </div>
        </div>
      </div>
    </div>
  );
}