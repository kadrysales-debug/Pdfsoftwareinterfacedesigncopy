import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Toolbar } from './components/Toolbar';
import { PDFViewerAdvanced } from './components/PDFViewerAdvanced';
import { AnnotationPanel } from './components/AnnotationPanel';
import { ToolsBar } from './components/ToolsBar';
import { ToolPanel } from './components/ToolPanel';
import { LoginPage } from './components/LoginPage';
import { WelcomePage } from './components/WelcomePage';
import { InstallationPage } from './components/InstallationPage';
import { MarketingScreenshots } from './components/MarketingScreenshots';
import { CombinePDF } from './components/CombinePDF';
import { OrganizePDF } from './components/OrganizePDF';
import { CompressPDF } from './components/CompressPDF';
import { ProtectPDF } from './components/ProtectPDF';
import { TabsBar } from './components/TabsBar';

export interface PDFFile {
  id: string;
  name: string;
  pages: number;
  size: string;
  lastModified: string;
  thumbnail: string;
  fileUrl?: string; // For uploaded files
  fileData?: File; // Store the actual file object
}

export default function App() {
  const [openFiles, setOpenFiles] = useState<PDFFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showInstallation, setShowInstallation] = useState(true);
  const [showMarketing, setShowMarketing] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showCombinePDF, setShowCombinePDF] = useState(false);
  const [showOrganizePDF, setShowOrganizePDF] = useState(false);
  const [showCompressPDF, setShowCompressPDF] = useState(false);
  const [showProtectPDF, setShowProtectPDF] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showToolPanel, setShowToolPanel] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<PDFFile[]>([]);

  const mockFiles: PDFFile[] = [
    {
      id: '1',
      name: 'Annual Report 2024.pdf',
      pages: 45,
      size: '2.4 MB',
      lastModified: '2024-12-20',
      thumbnail: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=80'
    },
    {
      id: '2',
      name: 'Product Catalog.pdf',
      pages: 128,
      size: '8.7 MB',
      lastModified: '2024-12-18',
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80'
    },
    {
      id: '3',
      name: 'User Guide.pdf',
      pages: 24,
      size: '1.2 MB',
      lastModified: '2024-12-15',
      thumbnail: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=400&q=80'
    },
    {
      id: '4',
      name: 'Invoice_Dec_2024.pdf',
      pages: 3,
      size: '245 KB',
      lastModified: '2024-12-10',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80'
    },
    {
      id: '5',
      name: 'Presentation Slides.pdf',
      pages: 67,
      size: '5.3 MB',
      lastModified: '2024-12-05',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80'
    }
  ];

  // Combine mock files with uploaded files
  const allFiles = [...mockFiles, ...uploadedFiles];

  const handleLogin = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    setIsLoggedIn(true);
    setShowWelcome(true);
  };

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowWelcome(false);
    setUserName('');
    setUserEmail('');
    setOpenFiles([]);
    setActiveFileId(null);
  };

  const handleFeatureClick = (feature: string) => {
    // Reset all states
    setShowCombinePDF(false);
    setShowOrganizePDF(false);
    setShowCompressPDF(false);
    setShowProtectPDF(false);
    setSelectedTool(null);
    
    // Set the selected feature
    if (feature === 'fillsign') {
      setSelectedTool('fill-sign');
    } else if (feature === 'organize') {
      setShowOrganizePDF(true);
    } else if (feature === 'compress') {
      setShowCompressPDF(true);
    } else if (feature === 'protect') {
      setShowProtectPDF(true);
    } else {
      setActiveFeature(feature);
    }
  };

  const handleSelectFile = (fileId: string) => {
    // Find the file from allFiles
    const file = allFiles.find(f => f.id === fileId);
    if (!file) return;
    
    // Check if file is already open
    const isFileOpen = openFiles.some(f => f.id === fileId);
    
    if (!isFileOpen) {
      // Add to open files
      setOpenFiles(prev => [...prev, file]);
    }
    
    // Set as active file
    setActiveFileId(fileId);
    
    // Close welcome page when a file is opened
    if (showWelcome) {
      setShowWelcome(false);
    }
  };

  const handleCloseFile = (fileId: string) => {
    setOpenFiles(prev => {
      const newOpenFiles = prev.filter(f => f.id !== fileId);
      
      // If closing the active file, switch to another file
      if (activeFileId === fileId) {
        if (newOpenFiles.length > 0) {
          // Set the last file as active
          setActiveFileId(newOpenFiles[newOpenFiles.length - 1].id);
        } else {
          setActiveFileId(null);
        }
      }
      
      return newOpenFiles;
    });
  };

  const handleSignClick = () => {
    // Reset all features
    setShowCombinePDF(false);
    setShowOrganizePDF(false);
    setShowCompressPDF(false);
    setShowProtectPDF(false);
    
    // Open Fill & Sign tool
    setSelectedTool('fill-sign');
  };

  const handleUploadPDF = (file: File) => {
    // Create a new PDF file object
    const newFile: PDFFile = {
      id: `uploaded-${Date.now()}`,
      name: file.name,
      pages: Math.floor(Math.random() * 50) + 1, // Random pages for demo
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      lastModified: new Date().toISOString().split('T')[0],
      thumbnail: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=80',
      fileUrl: URL.createObjectURL(file),
      fileData: file
    };

    // Add to open files
    setOpenFiles(prev => [...prev, newFile]);
    
    // Add to uploadedFiles
    setUploadedFiles(prev => [...prev, newFile]);
    
    // Add to mockFiles (we'll need to make it a state for this to work properly)
    // For now, just set it as active
    setActiveFileId(newFile.id);
    
    // Close welcome page if open
    if (showWelcome) {
      setShowWelcome(false);
    }
  };

  // Show marketing screenshots page
  if (showMarketing) {
    return <MarketingScreenshots onNavigateToInstall={() => {
      setShowMarketing(false);
      setShowInstallation(true);
    }} />;
  }

  // Show installation page first
  if (showInstallation) {
    return <InstallationPage onComplete={() => setShowInstallation(false)} />;
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show welcome page if logged in but haven't started yet
  if (showWelcome) {
    return (
      <div className="flex h-screen bg-neutral-100">
        <Sidebar
          files={allFiles}
          selectedFile={activeFileId ? openFiles.find(file => file.id === activeFileId) : null}
          onSelectFile={handleSelectFile}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onSignClick={handleSignClick}
          onUploadPDF={handleUploadPDF}
        />
        
        <ToolsBar onToolSelect={(toolId) => {
          if (toolId === 'combine-pdf') {
            setShowCombinePDF(true);
            setShowOrganizePDF(false);
            setSelectedTool(null);
          } else if (toolId === 'organize-pdf') {
            setShowOrganizePDF(true);
            setShowCombinePDF(false);
            setSelectedTool(null);
          } else {
            setShowCombinePDF(false);
            setShowOrganizePDF(false);
            setSelectedTool(toolId);
          }
        }} />
        
        <div className="flex-1 flex flex-col">
          <Toolbar
            selectedFile={activeFileId ? openFiles.find(file => file.id === activeFileId) : null}
            showAnnotations={showAnnotations}
            onToggleAnnotations={() => setShowAnnotations(!showAnnotations)}
            userName={userName}
            userEmail={userEmail}
            onLogout={handleLogout}
            onFeatureClick={handleFeatureClick}
          />
          
          <TabsBar
            openFiles={openFiles}
            activeFileId={activeFileId}
            onSelectFile={setActiveFileId}
            onCloseFile={handleCloseFile}
          />
          
          <div className="flex-1 flex overflow-hidden">
            {showCombinePDF ? (
              <CombinePDF onClose={() => setShowCombinePDF(false)} />
            ) : showOrganizePDF ? (
              <OrganizePDF onClose={() => setShowOrganizePDF(false)} />
            ) : showCompressPDF ? (
              <CompressPDF onClose={() => setShowCompressPDF(false)} />
            ) : showProtectPDF ? (
              <ProtectPDF onClose={() => setShowProtectPDF(false)} />
            ) : (
              <>
                <WelcomePage userName={userName} onGetStarted={handleGetStarted} />
                
                {selectedTool && (
                  <ToolPanel toolId={selectedTool} onClose={() => setSelectedTool(null)} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show active feature page (e.g., Combine PDF)
  if (activeFeature === 'combine') {
    return <CombinePDF onBack={() => setActiveFeature(null)} />;
  }

  // Main application view
  return (
    <div className="flex h-screen bg-neutral-100">
      <Sidebar
        files={allFiles}
        selectedFile={activeFileId ? openFiles.find(file => file.id === activeFileId) : null}
        onSelectFile={handleSelectFile}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSignClick={handleSignClick}
        onUploadPDF={handleUploadPDF}
      />
      
      <ToolsBar onToolSelect={(toolId) => {
        if (toolId === 'combine-pdf') {
          setShowCombinePDF(true);
          setShowOrganizePDF(false);
          setSelectedTool(null);
        } else if (toolId === 'organize-pdf') {
          setShowOrganizePDF(true);
          setShowCombinePDF(false);
          setSelectedTool(null);
        } else {
          setShowCombinePDF(false);
          setShowOrganizePDF(false);
          setSelectedTool(toolId);
        }
      }} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Toolbar 
          onFeatureSelect={handleFeatureClick} 
          userName={userName}
          userEmail={userEmail}
        />
        <div className="flex-1 flex overflow-hidden">
          <ToolPanel 
            selectedTool={selectedTool} 
            onSelectTool={(tool) => setSelectedTool(tool)}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TabsBar
              openFiles={openFiles}
              activeFileId={activeFileId}
              onSelectFile={setActiveFileId}
              onCloseFile={handleCloseFile}
            />
            <PDFViewerAdvanced 
              selectedFile={activeFileId ? openFiles.find(file => file.id === activeFileId) || null : null}
              selectedTool={selectedTool}
            />
          </div>
          {showAnnotations && <AnnotationPanel onClose={() => setShowAnnotations(false)} />}
        </div>
      </div>
    </div>
  );
}