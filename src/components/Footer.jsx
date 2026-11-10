import { Link } from "react-router-dom";
import { themes } from "../data/themes";
import { quizList } from "../data/quizzes";
import { presentQuiz } from "../lib/course";
import { useProgress } from "../context/ProgressContext";

export default function Footer() {
  const { resetProgress } = useProgress();

  function clearProgress() {
    const ok = window.confirm("Se borrará la lectura y las notas guardadas en este navegador.");
    if (ok) resetProgress();
  }

  return (
    <footer className="footer">
      <div className="footer-rule" />
      <div className="wrap footer-grid">
        <div>
          <p className="footer-title">Entornos de Desarrollo</p>
          <p className="muted">
            Cuaderno de 1º de Desarrollo de Aplicaciones Web. El texto es el de las tres unidades
            y las preguntas salen de esos apuntes.
          </p>
        </div>
        <div>
          <h2>Unidades</h2>
          <ul>
            {themes.map((theme) => (
              <li key={theme.id}>
                <Link to={`/tema/${theme.id}`}>
                  {theme.number} {theme.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Niveles</h2>
          <ul>
            {quizList.map((quiz) => {
              const meta = presentQuiz(quiz);
              return (
                <li key={quiz.id}>
                  <Link to={`/cuestionarios/${quiz.id}`}>
                    Nivel {meta.level}: {meta.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>El progreso se guarda solo en este navegador.</p>
        <button type="button" className="btn-text" onClick={clearProgress}>
          Borrar progreso
        </button>
      </div>
    </footer>
  );
}
