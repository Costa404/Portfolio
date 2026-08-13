import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DetailsProject from "./pages/DetailsProject";
import { ModalProvider } from "./pages/useModal";
import VideoDemo from "./pages/VideoDemo";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <div className="relative min-h-screen text-zinc-300 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 2026 Dark Grid Ambient Canvas */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#08090c]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`, 
            backgroundSize: '24px 24px' 
          }} 
        />
        
        {/* Soft Ambient Lights */}
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-900/20 via-purple-900/15 to-transparent blur-[140px]" />
        <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-950/10 blur-[160px]" />
      </div>

      <ModalProvider>
        <ScrollToTop />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
          
          <main className="pb-16 min-h-[75vh]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Fallback redirect to Home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          
          <VideoDemo />
          <DetailsProject />
        </div>
      </ModalProvider>
    </div>
  );
};

export default App;
