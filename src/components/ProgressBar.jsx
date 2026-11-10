import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "../lib/course";

export default function ProgressBar({ value = 0, label, hint }) {
  const reduce = useReducedMotion();
  const safe = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className="progress">
      {(label || hint) && (
        <div className="progress-meta">
          {label && <span>{label}</span>}
          {hint && <span>{hint}</span>}
        </div>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safe}
        aria-label={label || "Progreso"}
      >
        <motion.div
          className="progress-fill"
          initial={false}
          animate={{ width: `${safe}%` }}
          transition={reduce ? { duration: 0 } : { duration: 0.45, ease: easeOut }}
        />
      </div>
    </div>
  );
}
