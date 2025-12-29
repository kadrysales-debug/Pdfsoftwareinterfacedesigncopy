import { useState, useEffect } from 'react';
import { FileText, Mail, Lock, Sparkles, Shield, Zap, TrendingUp, Globe, Users } from 'lucide-react';

interface LoginPageProps {
  onLogin: (name: string, email: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onLogin(name.trim(), email.trim());
    }
  };

  const handleQuickLogin = () => {
    onLogin('Halla Mohamed', 'halla.mohamed@example.com');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const stats = [
    { icon: Users, label: 'Active Users', value: '2.4K+', color: 'from-blue-500 to-blue-600' },
    { icon: FileText, label: 'Documents', value: '150K+', color: 'from-purple-500 to-purple-600' },
    { icon: Shield, label: 'Secure', value: '100%', color: 'from-green-500 to-green-600' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Made in Saudi Arabia - Footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-green-200/50">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🇸🇦</span>
            <div className="text-left">
              <div className="text-xs text-neutral-500">Crafted with pride in</div>
              <div className="text-sm text-green-700">Saudi Arabia</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding & Info */}
          <div className="text-center lg:text-left space-y-8">
            <div>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-2xl relative">
                <FileText className="w-10 h-10 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <h1 className="text-5xl mb-4 text-neutral-900">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Malaf</span> | Document Suite
              </h1>
              
              <p className="text-xl text-neutral-600 mb-4">
                Professional PDF management at your fingertips
              </p>

              {/* Live time */}
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-white/50 mt-4">
                <Globe className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="text-sm text-neutral-500">Current Time</div>
                  <div className="text-lg text-neutral-800">{formatTime(currentTime)}</div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 text-center hover:scale-105 transition-transform">
                    <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl text-neutral-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-neutral-500">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-neutral-700">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span>Lightning-fast PDF processing</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-700">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-700">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span>Boost your productivity by 10x</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div>
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
              
              <div className="text-center mb-8">
                <h2 className="text-3xl text-neutral-900 mb-2">Welcome Back! 👋</h2>
                <p className="text-neutral-600">Sign in to continue your work</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-neutral-700 mb-2 flex items-center gap-2">
                    <span>Full Name</span>
                    <Sparkles className="w-3 h-3 text-blue-500" />
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors">
                      <User className="w-5 h-5 text-neutral-400 group-focus-within:text-blue-600" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-neutral-700 mb-2 flex items-center gap-2">
                    <span>Email Address</span>
                    <Mail className="w-3 h-3 text-purple-500" />
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors">
                      <Mail className="w-5 h-5 text-neutral-400 group-focus-within:text-purple-600" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Sign In
                    <span className="text-xl">→</span>
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-neutral-500 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-amber-500" />
                      Quick Access
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleQuickLogin}
                  className="w-full mt-4 py-4 bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-700 rounded-xl hover:from-neutral-200 hover:to-neutral-300 transition-all border-2 border-neutral-300 hover:border-blue-400 hover:shadow-lg relative group"
                >
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm shadow-md">
                      HM
                    </div>
                    Continue as Halla Mohamed
                  </span>
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-neutral-600 mt-6 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              Secure PDF management for professionals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}