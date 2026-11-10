import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "ed-daw-progress";

const defaultState = {
  seen: { 1: [], 2: [], 3: [] },
  quizzes: {},
  lastStudy: null,
};

const ProgressContext = createContext(null);

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      seen: { ...defaultState.seen, ...(parsed.seen || {}) },
      quizzes: parsed.quizzes || {},
      lastStudy: parsed.lastStudy || null,
    };
  } catch {
    return defaultState;
  }
}

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const markSeen = useCallback((themeId, headingId) => {
    setState((prev) => {
      const current = prev.seen[themeId] || [];
      if (current.includes(headingId)) return prev;
      return {
        ...prev,
        seen: { ...prev.seen, [themeId]: [...current, headingId] },
      };
    });
  }, []);

  const recordQuiz = useCallback((quizId, correct, total) => {
    setState((prev) => {
      const previous = prev.quizzes[quizId] || { bestCorrect: 0, attempts: 0, lastCorrect: 0, total };
      return {
        ...prev,
        quizzes: {
          ...prev.quizzes,
          [quizId]: {
            total,
            attempts: previous.attempts + 1,
            lastCorrect: correct,
            bestCorrect: Math.max(previous.bestCorrect, correct),
          },
        },
      };
    });
  }, []);

  const remember = useCallback((lastStudy) => {
    setState((prev) => {
      if (prev.lastStudy?.href === lastStudy.href && prev.lastStudy?.label === lastStudy.label) {
        return prev;
      }
      return { ...prev, lastStudy };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState(defaultState);
  }, []);

  return (
    <ProgressContext.Provider value={{ state, markSeen, recordQuiz, remember, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress debe usarse dentro de ProgressProvider");
  return context;
}
