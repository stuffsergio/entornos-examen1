import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ProgressProvider } from "./context/ProgressContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import ThemeDetail from "./pages/ThemeDetail";
import QuizPage from "./pages/QuizPage";

function ScrollHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/tema/:themeId" element={<ThemeDetail />} />
          <Route path="/cuestionarios" element={<QuizPage />} />
          <Route path="/cuestionarios/:quizId" element={<QuizPage />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <div className="app-shell">
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        <ScrollHash />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </ProgressProvider>
  );
}
