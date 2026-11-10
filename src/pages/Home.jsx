import { useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeCard from "../components/ThemeCard";
import QuizCard from "../components/QuizCard";
import { themes } from "../data/themes";
import { quizList } from "../data/quizzes";
import { useProgress } from "../context/ProgressContext";
import { courseStats, formatNote, recommendedQuizId } from "../lib/course";

const steps = [
  "Lee el apartado entero, no solo el título en verde.",
  "Los términos marcados son los que después pregunta el cuestionario.",
  "Responde sin volver atrás. Lee la explicación aunque hayas acertado.",
  "Si la nota baja de 7, repite el nivel antes de pasar al siguiente.",
];

export default function Home() {
  const { state } = useProgress();
  const stats = courseStats(state);
  const nextId = recommendedQuizId(stats.perQuiz);
  const started = stats.temario > 0 || stats.quizMean > 0;
  const continueHref = state.lastStudy?.href || "/tema/1";

  useEffect(() => {
    document.title = "Entornos de Desarrollo · 1º DAW";
  }, []);

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">
            <span className="kicker-rule" aria-hidden="true" />
            Cuaderno de 1º DAW
          </p>
          <h1>Los apuntes de Entornos, listos para estudiar.</h1>
          <p className="lede">
            El texto completo de las tres unidades —entornos, Scrum y Git— y 75 preguntas en cinco
            niveles. Cada respuesta se corrige al momento, con la explicación de los apuntes.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" to={continueHref}>
              {started ? "Continuar el estudio" : "Empezar por la unidad 1"}
            </Link>
            <Link className="btn btn-ghost" to="/cuestionarios">
              Abrir cuestionarios
            </Link>
          </div>
          {state.lastStudy && <p className="hint">La última vez: {state.lastStudy.label}</p>}
        </div>
        <div className="wrap">
          <ul className="figures">
            <li>
              <strong>{stats.temario}%</strong>
              <span>Temario leído</span>
            </li>
            <li>
              <strong>{stats.covered}/75</strong>
              <span>Preguntas cubiertas</span>
            </li>
            <li>
              <strong>{formatNote(stats.averageNote)}</strong>
              <span>Nota media sobre 10</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section" id="temario">
        <div className="wrap">
          <div className="section-head">
            <h2>Temario</h2>
            <p>
              Conviene leerlas en orden. El porcentaje cuenta los apartados que ya has alcanzado
              en esta pantalla.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                percent={stats.perTheme.find((item) => item.id === theme.id)?.percent || 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="cuestionarios">
        <div className="wrap">
          <div className="section-head">
            <h2>Cuestionarios</h2>
            <p>
              Cinco niveles de 15 preguntas, de lo básico al detalle de compiladores, Scrum y Git.
              La nota es sobre 10 y se guarda el mejor intento.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {quizList.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                stats={stats.perQuiz.find((item) => item.id === quiz.id)}
                recommended={quiz.id === nextId}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="metodo">
        <div className="wrap">
          <div className="section-head">
            <h2>Cómo estudiarlo</h2>
            <p>Una vuelta corta. No hace falta cuenta: el avance vive en este navegador.</p>
          </div>
          <ol className="steps">
            {steps.map((step, index) => (
              <li key={step}>
                <span>0{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
