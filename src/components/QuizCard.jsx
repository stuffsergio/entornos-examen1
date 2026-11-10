import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import { formatNote, presentQuiz } from "../lib/course";
import { useMedia } from "../lib/useMedia";

export default function QuizCard({ quiz, stats, recommended }) {
  const reduce = useReducedMotion();
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const meta = presentQuiz(quiz);
  const motionProps = reduce || !fine
    ? {}
    : {
        whileHover: { scale: 1.03, y: -5 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring", stiffness: 300, damping: 20 },
      };

  return (
    <motion.article className="card" {...motionProps}>
      <Link to={`/cuestionarios/${quiz.id}`} className="card-link">
        <div className="card-kicker">
          <span>Nivel {meta.level}</span>
          {recommended && <span className="pill">Siguiente</span>}
        </div>
        <h3>{meta.title}</h3>
        <p>{meta.detail}</p>
        <ProgressBar
          value={stats?.percent || 0}
          label={stats?.attempts ? `Mejor nota ${formatNote(stats.note)}` : "Sin intentar"}
          hint={stats?.attempts ? `${stats.attempts} ${stats.attempts === 1 ? "intento" : "intentos"}` : "15 preguntas"}
        />
        <span className="card-go">{stats?.attempts ? "Repetir nivel" : "Empezar nivel"}</span>
      </Link>
    </motion.article>
  );
}
