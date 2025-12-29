import { Download, FileText, Layout, PenTool, User, Settings, MousePointer, Zap } from 'lucide-react';

export function MarketingScreenshots({ onNavigateToInstall }: { onNavigateToInstall?: () => void }) {
  const screenshots = [
    {
      id: 'hero',
      title: 'واجهة PDF احترافية',
      subtitle: 'PDF Viewer Interface',
      category: 'Main Interface',
      gradient: 'from-blue-600 to-purple-600',
      rotation: '-rotate-2',
      scale: 'scale-105'
    },
    {
      id: 'sidebar',
      title: 'إدارة الملفات',
      subtitle: 'File Management Sidebar',
      category: 'Sidebar',
      gradient: 'from-emerald-600 to-teal-600',
      rotation: 'rotate-1',
      scale: 'scale-100'
    },
    {
      id: 'toolbar',
      title: 'أدوات متقدمة',
      subtitle: 'Advanced Toolbar',
      category: 'Tools',
      gradient: 'from-orange-600 to-red-600',
      rotation: '-rotate-1',
      scale: 'scale-105'
    },
    {
      id: 'annotation',
      title: 'التعليقات التوضيحية',
      subtitle: 'Annotation Panel',
      category: 'Features',
      gradient: 'from-purple-600 to-pink-600',
      rotation: 'rotate-2',
      scale: 'scale-100'
    },
    {
      id: 'esign',
      title: 'التوقيع الإلكتروني',
      subtitle: 'Electronic Signature',
      category: 'eSign',
      gradient: 'from-green-600 to-emerald-600',
      rotation: '-rotate-1',
      scale: 'scale-105'
    },
    {
      id: 'user-menu',
      title: 'إعدادات المستخدم',
      subtitle: 'User Settings',
      category: 'Settings',
      gradient: 'from-indigo-600 to-blue-600',
      rotation: 'rotate-1',
      scale: 'scale-100'
    }
  ];

  const handleDownload = (id: string, title: string) => {
    // This would trigger a download of the screenshot
    console.log(`Downloading ${id}: ${title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-2xl">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 
            onClick={onNavigateToInstall}
            className="text-5xl mb-4 text-white cursor-pointer hover:scale-105 transition-transform"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Malaf</span>
            <span className="text-neutral-500 mx-3">|</span>
            <span className="text-neutral-300">Marketing Assets</span>
          </h1>
          <p className="text-xl text-neutral-400 mb-6">لقطات تسويقية احترافية من التطبيق</p>
          <div className="flex items-center justify-center gap-2 text-sm text-green-400 bg-green-500/10 px-6 py-3 rounded-full inline-flex border border-green-500/20">
            <span>🇸🇦</span>
            <span>Made in Saudi Arabia by Tech Solutions</span>
          </div>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {screenshots.map((shot, index) => (
            <div 
              key={shot.id}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Container */}
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-white/20">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs px-3 py-1.5 rounded-full bg-gradient-to-r ${shot.gradient} text-white shadow-lg`}>
                    {shot.category}
                  </span>
                  <button
                    onClick={() => handleDownload(shot.id, shot.title)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 group/btn"
                  >
                    <Download className="w-4 h-4 text-white group-hover/btn:animate-bounce" />
                  </button>
                </div>

                {/* Screenshot Preview */}
                <div className={`relative mb-4 ${shot.rotation} group-hover:rotate-0 transition-all duration-500 ${shot.scale} group-hover:scale-110`}>
                  <div className="aspect-[4/3] bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl relative">
                    {/* Decorative Screenshot Content */}
                    <div className="absolute inset-0 p-4">
                      {/* Mock Screenshot Content based on ID */}
                      {shot.id === 'hero' && (
                        <div className="h-full flex flex-col">
                          <div className="h-10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg mb-2"></div>
                          <div className="flex-1 bg-white/5 rounded-lg flex items-center justify-center">
                            <Layout className="w-16 h-16 text-blue-400/50" />
                          </div>
                        </div>
                      )}
                      {shot.id === 'sidebar' && (
                        <div className="h-full flex gap-2">
                          <div className="w-1/3 bg-gradient-to-b from-emerald-600/20 to-teal-600/20 rounded-lg flex flex-col gap-2 p-2">
                            <div className="h-8 bg-white/10 rounded"></div>
                            <div className="h-8 bg-white/10 rounded"></div>
                            <div className="h-8 bg-white/10 rounded"></div>
                          </div>
                          <div className="flex-1 bg-white/5 rounded-lg"></div>
                        </div>
                      )}
                      {shot.id === 'toolbar' && (
                        <div className="h-full flex flex-col">
                          <div className="flex gap-2 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-lg flex items-center justify-center">
                              <MousePointer className="w-5 h-5 text-orange-400" />
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-lg flex items-center justify-center">
                              <PenTool className="w-5 h-5 text-orange-400" />
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-lg flex items-center justify-center">
                              <Zap className="w-5 h-5 text-orange-400" />
                            </div>
                          </div>
                          <div className="flex-1 bg-white/5 rounded-lg"></div>
                        </div>
                      )}
                      {shot.id === 'annotation' && (
                        <div className="h-full flex flex-col gap-2">
                          <div className="h-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded"></div>
                          <div className="flex-1 bg-white/5 rounded flex items-center justify-center">
                            <PenTool className="w-16 h-16 text-purple-400/50" />
                          </div>
                        </div>
                      )}
                      {shot.id === 'esign' && (
                        <div className="h-full bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-6xl mb-2">✍️</div>
                            <div className="text-xs text-green-400">eSign</div>
                          </div>
                        </div>
                      )}
                      {shot.id === 'user-menu' && (
                        <div className="h-full flex flex-col gap-2">
                          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 rounded-lg p-2">
                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <div className="h-2 bg-white/20 rounded mb-1 w-3/4"></div>
                              <div className="h-2 bg-white/10 rounded w-1/2"></div>
                            </div>
                          </div>
                          <div className="flex-1 bg-white/5 rounded-lg"></div>
                        </div>
                      )}
                    </div>

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${shot.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Corner Accent */}
                    <div className={`absolute top-3 right-3 w-12 h-12 bg-gradient-to-br ${shot.gradient} opacity-20 rounded-full blur-xl`}></div>
                  </div>

                  {/* Shadow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${shot.gradient} opacity-20 blur-2xl -z-10 group-hover:opacity-40 transition-opacity duration-500`}></div>
                </div>

                {/* Title */}
                <div className="text-center">
                  <h3 className="text-lg text-white mb-1">{shot.title}</h3>
                  <p className="text-sm text-neutral-400">{shot.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download All Button */}
        <div className="text-center">
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-2xl hover:shadow-blue-500/50 hover:scale-105 inline-flex items-center gap-3">
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            <span className="text-lg">تحميل جميع الصور</span>
            <span className="text-sm opacity-75">(Download All)</span>
          </button>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2">High Quality</h3>
            <p className="text-sm text-neutral-400">دقة عالية للطباعة والنشر</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2">Ready to Use</h3>
            <p className="text-sm text-neutral-400">جاهزة للاستخدام الفوري</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2">Multiple Formats</h3>
            <p className="text-sm text-neutral-400">صيغ متعددة للتسويق</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-neutral-500 text-sm">
            هذه الصور مصممة خصيصاً للاستخدام في المواد التسويقية والبروشورات
          </p>
          <p className="text-neutral-600 text-xs mt-2">
            Marketing assets designed by Tech Solutions • Made in Saudi Arabia
          </p>
        </div>
      </div>
    </div>
  );
}