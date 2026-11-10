import { themes } from "../data/themes";
import { quizList } from "../data/quizzes";

export const easeOut = [0.23, 1, 0.32, 1];

export function themePercent(seen = [], headings = []) {
  const sections = headings.filter((heading) => heading.depth === 2);
  if (!sections.length) return 0;
  const read = sections.filter((heading) => seen.includes(heading.id)).length;
  return Math.round((read / sections.length) * 100);
}

export function noteFromCorrect(correct, total = 15) {
  if (!total) return 0;
  return Math.round((correct / total) * 100) / 10;
}

export function formatNote(note) {
  if (note == null || Number.isNaN(note)) return "—";
  return note.toFixed(1).replace(".", ",");
}

export function medalFor(note) {
  if (note == null) return { name: "Sin nota", rank: "none" };
  if (note >= 9) return { name: "Oro", rank: "gold" };
  if (note >= 7) return { name: "Plata", rank: "silver" };
  if (note >= 5) return { name: "Bronce", rank: "bronze" };
  return { name: "En práctica", rank: "practice" };
}

export function presentQuiz(quiz) {
  const level = Number(String(quiz.id).replace(/\D/g, ""));
  const body = quiz.name.replace(/^Cuestionario\s+\d+:\s*/i, "");
  const match = /^Nivel\s+(.+?)\s*\((.+)\)\s*$/.exec(body);
  return {
    level,
    title: match ? match[1] : body,
    detail: match ? match[2] : "",
    full: quiz.name,
  };
}

export function courseStats(state) {
  const perTheme = themes.map((theme) => ({
    id: theme.id,
    percent: themePercent(state.seen?.[theme.id] || [], theme.headings),
  }));
  const temario = average(perTheme.map((item) => item.percent));

  const perQuiz = quizList.map((quiz) => {
    const saved = state.quizzes?.[quiz.id];
    const attempts = saved?.attempts || 0;
    const bestCorrect = saved?.bestCorrect || 0;
    const total = quiz.questions.length;
    return {
      id: quiz.id,
      attempts,
      bestCorrect,
      total,
      percent: attempts ? Math.round((bestCorrect / total) * 100) : 0,
      note: attempts ? noteFromCorrect(bestCorrect, total) : null,
    };
  });

  const quizMean = average(perQuiz.map((item) => item.percent));
  const graded = perQuiz.filter((item) => item.note != null);
  const averageNote = graded.length
    ? graded.reduce((sum, item) => sum + item.note, 0) / graded.length
    : null;
  const overall = Math.round((temario + quizMean) / 2);
  const covered = perQuiz.reduce((sum, item) => sum + (item.attempts ? item.total : 0), 0);

  return { perTheme, temario, perQuiz, quizMean, averageNote, overall, covered };
}

export function recommendedQuizId(perQuiz) {
  const pending = quizList.find((quiz) => {
    const stats = perQuiz.find((item) => item.id === quiz.id);
    return !stats?.attempts;
  });
  if (pending) return pending.id;

  return [...perQuiz].sort((a, b) => a.percent - b.percent)[0]?.id || quizList[0].id;
}

export function resultCopy(note) {
  if (note >= 9) return "Este nivel está sólido. Puedes pasar al siguiente.";
  if (note >= 7) return "Has aprobado con margen. Repasa los fallos antes de seguir.";
  if (note >= 5) return "Has dado el mínimo. Conviene repetir el nivel.";
  return "Todavía no está. Vuelve al apartado que falla y repite el cuestionario.";
}

function average(values) {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}
