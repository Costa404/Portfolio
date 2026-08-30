import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
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
import PageTransition from "./components/PageTransition";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import LoadingIntro from "./components/LoadingIntro";
import { useSoundFX } from "./hooks/useSoundFX";
import InteractiveTerminal from "./components/InteractiveTerminal";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const location = useLocation();
  const { playWhoosh } = useSoundFX();
  const isFirstRender = useRef(true);

  // Play whoosh on page navigation (skip initial load)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    playWhoosh();
  }, [location.pathname, playWhoosh]);

  // Loading intro: only show on first visit per session
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem("portfolio-intro-seen");
  });

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    sessionStorage.setItem("portfolio-intro-seen", "true");
  }, []);

  return (
    <VisualFXProvider>
      <SmoothScroll>
        <div className="relative min-h-screen text-zinc-300 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
          {/* Loading Intro Sequence */}
          <AnimatePresence>
            {showIntro && <LoadingIntro onComplete={handleIntroComplete} />}
          </AnimatePresence>

          {/* Scroll Progress Indicator */}
          <ScrollProgress />

          {/* 3D WebGL Canvas Background */}
          <VisualFXCanvas />

          {/* Interactive Mouse Spotlight Halo */}
          <MouseSpotlight />

          {/* Hidden Terminal Easter Egg (Ctrl+K or backtick) */}
          <InteractiveTerminal />

          <ModalProvider>
            <ScrollToTop />
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <Navbar />

              <main className="pb-16 min-h-[75vh]">
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route
                      path="/"
                      element={
                        <PageTransition>
                          <HomePage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/projects"
                      element={
                        <PageTransition>
                          <ProjectsPage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/experience"
                      element={
                        <PageTransition>
                          <ExperiencePage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/about"
                      element={
                        <PageTransition>
                          <AboutPage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/contact"
                      element={
                        <PageTransition>
                          <ContactPage />
                        </PageTransition>
                      }
                    />
                    {/* Fallback redirect to Home */}
                    <Route
                      path="*"
                      element={
                        <PageTransition>
                          <HomePage />
                        </PageTransition>
                      }
                    />
                  </Routes>
                </AnimatePresence>
              </main>

              <VideoDemo />
              <DetailsProject />
            </div>
          </ModalProvider>
        </div>
      </SmoothScroll>
    </VisualFXProvider>
  );
};

export default App;
