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
import { VisualFXProvider } from "./context/VisualFXContext";
import { VisualFXCanvas } from "./components/VisualFXCanvas";
import { MouseSpotlight } from "./components/MouseSpotlight";
import { BackgroundControls } from "./components/BackgroundControls";

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
    <VisualFXProvider>
      <div className="relative min-h-screen text-zinc-300 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* 3D WebGL Canvas Background */}
        <VisualFXCanvas />

        {/* Interactive Mouse Spotlight Halo */}
        <MouseSpotlight />

        {/* Floating Visual FX Controls HUD */}
        <BackgroundControls />

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
    </VisualFXProvider>
  );
};

export default App;
