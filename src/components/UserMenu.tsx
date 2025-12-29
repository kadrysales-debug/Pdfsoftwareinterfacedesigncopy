import { useState, useRef, useEffect } from 'react';
import { 
  User, 
  LogOut, 
  Settings, 
  HelpCircle, 
  ChevronDown, 
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Bell,
  Lock,
  CreditCard,
  Users,
  Globe,
  Calendar,
  Shield,
  MessageCircle,
  BookOpen,
  Video,
  X,
  Check,
  Zap,
  Crown,
  RefreshCw,
  Monitor,
  Moon,
  Sun,
  Eye,
  Volume2,
  Download,
  Upload,
  Cloud,
  HardDrive
} from 'lucide-react';

interface UserMenuProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export function UserMenu({ userName, userEmail, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [showWorkspaces, setShowWorkspaces] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showUpdateCheck, setShowUpdateCheck] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors group"
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-white text-sm">
              {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div className="text-left hidden lg:block">
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-900">{userName}</span>
              <span className="px-2 py-0.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full text-[10px] border border-indigo-200 flex items-center gap-1">
                <Briefcase className="w-2.5 h-2.5" />
                <span>Tech Solutions</span>
              </span>
            </div>
            <div className="text-xs text-neutral-500">{userEmail}</div>
          </div>
          <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
            <div className="px-4 py-3 border-b border-neutral-100">
              <div className="text-sm text-neutral-900">{userName}</div>
              <div className="text-xs text-neutral-500">{userEmail}</div>
            </div>

            <div className="py-2">
              <button
                onClick={() => {
                  setShowAccountSettings(true);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3"
              >
                <User className="w-4 h-4" />
                <span>Account Settings</span>
              </button>
              <button
                onClick={() => {
                  setShowPreferences(true);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3"
              >
                <Settings className="w-4 h-4" />
                <span>Preferences</span>
              </button>
              <button
                onClick={() => {
                  setShowHelpSupport(true);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help & Support</span>
              </button>
              <button
                onClick={() => {
                  setShowWorkspaces(true);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3"
              >
                <Briefcase className="w-4 h-4" />
                <span>Workspaces</span>
              </button>
            </div>

            <div className="border-t border-neutral-100 pt-2">
              <button
                onClick={() => {
                  setShowUpdateCheck(true);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Check for update</span>
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(true);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Account Settings Modal */}
      {showAccountSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setShowAccountSettings(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl text-white">Account Settings</h2>
              </div>
              <button onClick={() => setShowAccountSettings(false)} className="w-8 h-8 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Profile Section */}
              <div className="mb-6">
                <h3 className="text-sm text-neutral-500 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">
                        {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors">Change Photo</button>
                      <p className="text-xs text-neutral-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-neutral-700 mb-1">Full Name</label>
                      <input type="text" defaultValue={userName} className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-700 mb-1">Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input type="email" defaultValue={userEmail} className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-700 mb-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input type="tel" placeholder="+966 XX XXX XXXX" className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-700 mb-1">Location</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input type="text" placeholder="Riyadh, Saudi Arabia" className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="mb-6 pt-6 border-t border-neutral-200">
                <h3 className="text-sm text-neutral-500 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security & Privacy
                </h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg flex items-center justify-between transition-colors text-left">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-neutral-600" />
                      <div>
                        <p className="text-sm text-neutral-900">Change Password</p>
                        <p className="text-xs text-neutral-500">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-neutral-400 -rotate-90" />
                  </button>
                  <button className="w-full px-4 py-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg flex items-center justify-between transition-colors text-left">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-neutral-600" />
                      <div>
                        <p className="text-sm text-neutral-900">Two-Factor Authentication</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Enabled
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-neutral-400 -rotate-90" />
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="mb-6 pt-6 border-t border-neutral-200">
                <h3 className="text-sm text-neutral-500 mb-3 flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notification Preferences
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Email notifications', desc: 'Receive updates via email', enabled: true },
                    { label: 'Desktop notifications', desc: 'Show notifications on desktop', enabled: true },
                    { label: 'Document updates', desc: 'Notify when documents are modified', enabled: false }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded-lg">
                      <div>
                        <p className="text-sm text-neutral-900">{item.label}</p>
                        <p className="text-xs text-neutral-500">{item.desc}</p>
                      </div>
                      <div className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${item.enabled ? 'bg-blue-600' : 'bg-neutral-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ${item.enabled ? 'ml-5' : 'ml-0.5'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing */}
              <div className="pt-6 border-t border-neutral-200">
                <h3 className="text-sm text-neutral-500 mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Billing & Subscription
                </h3>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-amber-600" />
                      <span className="text-sm text-amber-900">Pro Plan</span>
                    </div>
                    <span className="px-2 py-1 bg-amber-600 text-white text-xs rounded-full">Active</span>
                  </div>
                  <p className="text-xs text-amber-800 mb-3">Unlimited documents • Advanced features • Priority support</p>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-white text-amber-700 border border-amber-300 rounded-lg text-xs hover:bg-amber-50 transition-colors">Manage Plan</button>
                    <button className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs hover:bg-amber-700 transition-colors">Upgrade</button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-6 pt-6 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button onClick={() => setShowAccountSettings(false)} className="px-6 py-2.5 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">Cancel</button>
                <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {showHelpSupport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setShowHelpSupport(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl text-white">Help & Support</h2>
              </div>
              <button onClick={() => setShowHelpSupport(false)} className="w-8 h-8 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Quick Help Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all text-left group">
                  <BookOpen className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm text-neutral-900 mb-1">Documentation</h3>
                  <p className="text-xs text-neutral-600">Browse guides and tutorials</p>
                </button>
                <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all text-left group">
                  <Video className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm text-neutral-900 mb-1">Video Tutorials</h3>
                  <p className="text-xs text-neutral-600">Learn with step-by-step videos</p>
                </button>
                <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all text-left group">
                  <MessageCircle className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm text-neutral-900 mb-1">Live Chat</h3>
                  <p className="text-xs text-neutral-600">Chat with support team</p>
                </button>
                <button className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all text-left group">
                  <Users className="w-8 h-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm text-neutral-900 mb-1">Community</h3>
                  <p className="text-xs text-neutral-600">Join our user community</p>
                </button>
              </div>

              {/* Contact Support */}
              <div className="bg-neutral-50 rounded-xl p-4 mb-6">
                <h3 className="text-sm text-neutral-700 mb-3 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Support Team
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-neutral-700 mb-1">Subject</label>
                    <input type="text" placeholder="How can we help you?" className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-700 mb-1">Message</label>
                    <textarea rows={4} placeholder="Describe your issue or question..." className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none" />
                  </div>
                  <button className="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-sm text-neutral-700 mb-3">Frequently Asked Questions</h3>
                <div className="space-y-2">
                  {[
                    { q: 'How do I upload a PDF document?', a: 'Click the + button in the sidebar or drag & drop files.' },
                    { q: 'Can I collaborate with my team?', a: 'Yes! Invite team members from Workspace settings.' },
                    { q: 'How to export annotated PDFs?', a: 'Use the Download button to save your annotated document.' },
                    { q: 'Is my data secure?', a: 'All documents are encrypted and stored securely in Saudi Arabia.' }
                  ].map((item, i) => (
                    <details key={i} className="group">
                      <summary className="px-4 py-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg cursor-pointer flex items-center justify-between">
                        <span className="text-sm text-neutral-900">{item.q}</span>
                        <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="px-4 py-3 text-sm text-neutral-600">{item.a}</div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Made in Saudi */}
              <div className="mt-6 pt-6 border-t border-neutral-200 flex items-center justify-center gap-2 text-sm text-green-700">
                <span>🇸🇦</span>
                <span>Made with ❤️ in Saudi Arabia</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Workspaces Modal */}
      {showWorkspaces && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setShowWorkspaces(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl text-white">Workspaces</h2>
              </div>
              <button onClick={() => setShowWorkspaces(false)} className="w-8 h-8 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Current Workspace */}
              <div className="mb-6">
                <h3 className="text-sm text-neutral-500 mb-3">Current Workspace</h3>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-neutral-900">Tech Solutions</h4>
                        <p className="text-sm text-neutral-600">12 members • 48 documents</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded-full">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-white text-indigo-700 border border-indigo-300 rounded-lg text-sm hover:bg-indigo-50 transition-colors flex items-center gap-1">
                      <Settings className="w-3.5 h-3.5" />
                      Manage
                    </button>
                    <button className="px-3 py-1.5 bg-white text-indigo-700 border border-indigo-300 rounded-lg text-sm hover:bg-indigo-50 transition-colors flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      Members
                    </button>
                  </div>
                </div>
              </div>

              {/* Other Workspaces */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm text-neutral-500">Your Workspaces</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">+ Create New</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Personal Projects', icon: '👤', members: '1 member', docs: '15 documents', color: 'from-blue-50 to-blue-100' },
                    { name: 'Marketing Team', icon: '📊', members: '8 members', docs: '32 documents', color: 'from-green-50 to-green-100' },
                    { name: 'Client Documents', icon: '📁', members: '5 members', docs: '67 documents', color: 'from-orange-50 to-orange-100' }
                  ].map((workspace, i) => (
                    <button key={i} className={`w-full p-4 bg-gradient-to-br ${workspace.color} hover:scale-[1.02] rounded-xl transition-all text-left group`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl">
                            {workspace.icon}
                          </div>
                          <div>
                            <h4 className="text-sm text-neutral-900">{workspace.name}</h4>
                            <p className="text-xs text-neutral-600">{workspace.members} • {workspace.docs}</p>
                          </div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-neutral-400 -rotate-90 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Workspace Features */}
              <div className="bg-neutral-50 rounded-xl p-4">
                <h3 className="text-sm text-neutral-700 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  Workspace Features
                </h3>
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Collaborate with team members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Shared document libraries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Role-based access control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Activity tracking and analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setShowLogoutConfirm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            {/* Icon */}
            <div className="pt-8 pb-4 flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 text-center">
              <h2 className="text-xl text-neutral-900 mb-2">Log Out</h2>
              <p className="text-sm text-neutral-600 mb-6">
                Are you sure you want to log out of your account?
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2.5 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    onLogout();
                  }}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Check Modal */}
      {showUpdateCheck && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setShowUpdateCheck(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            {/* Icon */}
            <div className="pt-8 pb-4 flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 text-center">
              <h2 className="text-xl text-neutral-900 mb-2">Check for update</h2>
              <p className="text-sm text-green-600 mb-6">
                Malaf is up to date
              </p>

              {/* Button */}
              <button
                onClick={() => setShowUpdateCheck(false)}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setShowPreferences(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-pink-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl text-white">Preferences</h2>
              </div>
              <button onClick={() => setShowPreferences(false)} className="w-8 h-8 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Appearance Settings */}
              <div className="mb-6">
                <h3 className="text-sm text-neutral-500 mb-3 flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Appearance
                </h3>
                <div className="space-y-3">
                  {/* Theme Selection */}
                  <div>
                    <label className="block text-sm text-neutral-700 mb-2">Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-xl text-left transition-all hover:scale-105">
                        <Sun className="w-6 h-6 text-blue-600 mb-2" />
                        <p className="text-sm text-neutral-900">Light</p>
                        <p className="text-xs text-neutral-600">Default theme</p>
                      </button>
                      <button className="p-4 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-left transition-all hover:scale-105">
                        <Moon className="w-6 h-6 text-neutral-600 mb-2" />
                        <p className="text-sm text-neutral-900">Dark</p>
                        <p className="text-xs text-neutral-600">Coming soon</p>
                      </button>
                      <button className="p-4 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-left transition-all hover:scale-105">
                        <Monitor className="w-6 h-6 text-neutral-600 mb-2" />
                        <p className="text-sm text-neutral-900">Auto</p>
                        <p className="text-xs text-neutral-600">System default</p>
                      </button>
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm text-neutral-700 mb-2">Language</label>
                    <div className="relative">
                      <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <select className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                        <option>العربية (Arabic)</option>
                        <option>English</option>
                        <option>Français</option>
                      </select>
                    </div>
                  </div>

                  {/* Display Density */}
                  <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-sm text-neutral-900">Compact view</p>
                      <p className="text-xs text-neutral-500">Reduce spacing between elements</p>
                    </div>
                    <div className="w-11 h-6 rounded-full bg-neutral-300 transition-colors cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ml-0.5" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-sm text-neutral-900">Show file preview</p>
                      <p className="text-xs text-neutral-500">Display document thumbnails</p>
                    </div>
                    <div className="w-11 h-6 rounded-full bg-blue-600 transition-colors cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ml-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Preferences */}
              <div className="mb-6 pt-6 border-t border-neutral-200">
                <h3 className="text-sm text-neutral-500 mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Document Preferences
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-neutral-700 mb-2">Default zoom level</label>
                    <select className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                      <option>Fit to width</option>
                      <option>Fit to page</option>
                      <option>100%</option>
                      <option>125%</option>
                      <option>150%</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-700 mb-2">Page layout</label>
                    <select className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                      <option>Single page</option>
                      <option>Continuous</option>
                      <option>Two pages</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-sm text-neutral-900">Auto-save documents</p>
                      <p className="text-xs text-neutral-500">Save changes automatically</p>
                    </div>
                    <div className="w-11 h-6 rounded-full bg-blue-600 transition-colors cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ml-5" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-sm text-neutral-900">Enable OCR</p>
                      <p className="text-xs text-neutral-500">Optical character recognition</p>
                    </div>
                    <div className="w-11 h-6 rounded-full bg-blue-600 transition-colors cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ml-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Storage & Downloads */}
              <div className="mb-6 pt-6 border-t border-neutral-200">
                <h3 className="text-sm text-neutral-500 mb-3 flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Storage & Downloads
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-neutral-700 mb-2">Download location</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <Download className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input type="text" defaultValue="~/Downloads" className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />
                      </div>
                      <button className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-sm">Browse</button>
                    </div>
                  </div>

                  {/* Storage Usage */}
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-900">Storage Used</span>
                      <span className="text-sm text-blue-600">4.2 GB / 10 GB</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600" style={{ width: '42%' }} />
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="px-3 py-1.5 bg-white text-blue-700 border border-blue-300 rounded-lg text-xs hover:bg-blue-50 transition-colors flex items-center gap-1">
                        <Cloud className="w-3.5 h-3.5" />
                        Manage Storage
                      </button>
                      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        Upgrade Plan
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-sm text-neutral-900">Clear cache on exit</p>
                      <p className="text-xs text-neutral-500">Free up space automatically</p>
                    </div>
                    <div className="w-11 h-6 rounded-full bg-neutral-300 transition-colors cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sound & Notifications */}
              <div className="pt-6 border-t border-neutral-200">
                <h3 className="text-sm text-neutral-500 mb-3 flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  Sound & Notifications
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-sm text-neutral-900">Sound effects</p>
                      <p className="text-xs text-neutral-500">Play sounds for actions</p>
                    </div>
                    <div className="w-11 h-6 rounded-full bg-blue-600 transition-colors cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ml-5" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-sm text-neutral-900">Notification sounds</p>
                      <p className="text-xs text-neutral-500">Audio alerts for notifications</p>
                    </div>
                    <div className="w-11 h-6 rounded-full bg-blue-600 transition-colors cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ml-5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-700 mb-2">Notification style</label>
                    <select className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                      <option>Banner (top-right)</option>
                      <option>Modal (center)</option>
                      <option>Toast (bottom-left)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-6 pt-6 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button onClick={() => setShowPreferences(false)} className="px-6 py-2.5 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">Cancel</button>
                <button className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-lg hover:from-orange-700 hover:to-pink-700 transition-all shadow-lg">Save Preferences</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}