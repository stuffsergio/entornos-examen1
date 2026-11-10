import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import { useMedia } from "../lib/useMedia";

export default function ThemeCard({ theme, percent }) {
  const reduce = useReducedMotion();
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const chapters = theme.headings.filter((heading) => heading.depth === 2).length;
  const motionProps = reduce || !fine
    ? {}
    : {
        whileHover: { scale: 1.03, y: -5 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring", stiffness: 300, damping: 20 },
      };

  return (
    <motion.article className="card" {...motionProps}>
      <Link to={`/tema/${theme.id}`} className="card-link">
        <div className="card-kicker">
          <span>Unidad {theme.number}</span>
          <span>{theme.minutes} min</span>
        </div>
        <h3>{theme.title}</h3>
        <p>{theme.summary}</p>
        <ProgressBar value={percent} label="Lectura" hint={`${percent}% · ${chapters} apartados`} />
        <span className="card-go">Leer la unidad</span>
      </Link>
    </motion.article>
  );
}
