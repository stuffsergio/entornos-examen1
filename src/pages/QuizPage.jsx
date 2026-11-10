import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import QuizCard from "../components/QuizCard";
import ProgressBar from "../components/ProgressBar";
import { quizList } from "../data/quizzes";
import { useProgress } from "../context/ProgressContext";
import {
  courseStats,
  easeOut,
  formatNote,
  medalFor,
  noteFromCorrect,
  presentQuiz,
  recommendedQuizId,
  resultCopy,
} from "../lib/course";

const letters = ["A", "B", "C", "D"];

export default function QuizPage() {
  const { quizId } = useParams();
  const quiz = quizList.find((item) => item.id === quizId) || null;
  const { state, recordQuiz, remember } = useProgress();
  const stats = courseStats(state);
  const reduce = useReducedMotion();
  const nextId = recommendedQuizId(stats.perQuiz);

  useEffect(() => {
    document.title = quiz
      ? `${presentQuiz(quiz).title} · Cuestionarios`
      : "Cuestionarios · Entornos de Desarrollo";
  }, [quiz]);

  if (!quiz) {
    return (
      <div className="quiz-page">
        <div className="wrap quiz-head">
          <p className="kicker">
            <span className="kicker-rule" aria-hidden="true" />
            Cinco niveles
          </p>
          <h1>Comprueba lo que has leído.</h1>
          <p className="lede">
            75 preguntas únicas, 15 en cada nivel. Al elegir una respuesta ves si es la de los
            apuntes y por qué. La mejor nota se queda guardada.
          </p>
        </div>
        <div className="wrap" style={{ marginTop: "2rem" }}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {quizList.map((item) => (
              <QuizCard
                key={item.id}
                quiz={item}
                stats={stats.perQuiz.find((entry) => entry.id === item.id)}
                recommended={item.id === nextId}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <QuizRunner
      key={quiz.id}
      quiz={quiz}
      stats={stats}
      reduce={reduce}
      recordQuiz={recordQuiz}
      remember={remember}
    />
  );
}

function QuizRunner({ quiz, stats, reduce, recordQuiz, remember }) {
  const meta = presentQuiz(quiz);
  const total = quiz.questions.length;
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [locked, setLocked] = useState(false);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);
  const lockRef = useRef(false);
  const busyRef = useRef(false);
  const pickedRef = useRef(null);
  const questionRef = useRef(null);
  const summaryRef = useRef(null);

  const levelIndex = quizList.findIndex((item) => item.id === quiz.id);
  const following = quizList[levelIndex + 1];
  const question = quiz.questions[step];

  useEffect(() => {
    remember({ href: `/cuestionarios/${quiz.id}`, label: `Nivel ${meta.level} · ${meta.title}` });
  }, [quiz.id, meta.level, meta.title, remember]);

  useEffect(() => {
    busyRef.current = false;
    if (step === 0) return;
    questionRef.current?.scrollIntoView({
      block: "start",
      behavior: reduce ? "auto" : "smooth",
    });
  }, [step, reduce]);

  useEffect(() => {
    function onKey(event) {
      if (done) return;
      const tag = event.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (["1", "2", "3", "4"].includes(event.key)) {
        const index = Number(event.key) - 1;
        if (question.options[index] != null) choose(index);
      }
      if (event.key === "Enter" && lockRef.current && tag !== "BUTTON" && tag !== "A") {
        event.preventDefault();
        advance();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function choose(index) {
    if (lockRef.current || done) return;
    lockRef.current = true;
    pickedRef.current = index;
    setPicked(index);
    setLocked(true);
  }

  function advance() {
    if (!lockRef.current || busyRef.current || done) return;
    busyRef.current = true;
    const choice = pickedRef.current;
    const entry = {
      id: question.id,
      picked: choice,
      correct: choice === question.answer,
    };
    const all = [...results, entry];
    setResults(all);

    if (step + 1 >= total) {
      setDone(true);
      recordQuiz(
        quiz.id,
        all.filter((item) => item.correct).length,
        total
      );
      return;
    }

    lockRef.current = false;
    pickedRef.current = null;
    setPicked(null);
    setLocked(false);
    setStep((value) => value + 1);
  }

  function retry() {
    lockRef.current = false;
    busyRef.current = false;
    pickedRef.current = null;
    setStep(0);
    setPicked(null);
    setLocked(false);
    setResults([]);
    setDone(false);
  }

  if (done) {
    const correct = results.filter((item) => item.correct).length;
    const note = noteFromCorrect(correct, total);
    const percent = Math.round((correct / total) * 100);
    const medal = medalFor(note);
    const misses = results
      .map((result, index) => ({ result, question: quiz.questions[index] }))
      .filter((item) => !item.result.correct);

    return (
      <div className="quiz-page">
        <div className="wrap" ref={summaryRef}>
          <p className="crumb">
            <Link to="/cuestionarios">Cuestionarios</Link>
            <span aria-hidden="true">/</span>
            <span>Nivel {meta.level}</span>
          </p>
          <motion.div
            className="summary"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.32, ease: easeOut }}
          >
            <div className="medal" style={{ "--medal-turn": `${percent}%` }}>
              <div className="medal-inner">
                <strong>{formatNote(note)}</strong>
                <span>{medal.name}</span>
              </div>
            </div>
            <div>
              <p className="kicker">
                <span className="kicker-rule" aria-hidden="true" />
                Nota sobre 10
              </p>
              <h1>
                {correct} de {total}. {percent}% de acierto.
              </h1>
              <p className="summary-copy">{resultCopy(note)}</p>
              <div className="actions">
                <button type="button" className="btn btn-primary" onClick={retry}>
                  Reintentar nivel
                </button>
                {following ? (
                  <Link className="btn btn-ghost" to={`/cuestionarios/${following.id}`}>
                    Siguiente nivel
                  </Link>
                ) : (
                  <Link className="btn btn-ghost" to="/cuestionarios">
                    Volver a los niveles
                  </Link>
                )}
              </div>
            </div>
          </motion.div>

          <section className="review" aria-label="Repaso">
            {misses.length === 0 ? (
              <>
                <h2>Sin fallos en este intento</h2>
                <p>Las 15 respuestas coinciden con los apuntes.</p>
              </>
            ) : (
              <>
                <h2>Qué conviene repasar</h2>
                {misses.map(({ result, question: item }) => (
                  <article key={item.id}>
                    <h3>{item.question}</h3>
                    <p>Tu respuesta: {item.options[result.picked]}</p>
                    <p className="right">En los apuntes: {item.options[item.answer]}</p>
                    <p>{item.explanation}</p>
                  </article>
                ))}
              </>
            )}
          </section>
        </div>
      </div>
    );
  }

  const progress = ((step + (locked ? 1 : 0)) / total) * 100;

  return (
    <div className="quiz-page">
      <div className="wrap">
        <p className="crumb">
          <Link to="/cuestionarios">Cuestionarios</Link>
          <span aria-hidden="true">/</span>
          <span>Nivel {meta.level}</span>
        </p>
        <div className="quiz-head">
          <p className="kicker">
            <span className="kicker-rule" aria-hidden="true" />
            {meta.full}
          </p>
          <ProgressBar
            value={progress}
            label={`Pregunta ${step + 1} de ${total}`}
            hint={stats.perQuiz.find((item) => item.id === quiz.id)?.note != null
              ? `Mejor nota ${formatNote(stats.perQuiz.find((item) => item.id === quiz.id).note)}`
              : meta.detail}
          />
        </div>

        <motion.div
          key={question.id}
          ref={questionRef}
          className="question-block"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.28, ease: easeOut }}
        >
          <h2 id="pregunta-actual">{question.question}</h2>
          <div className="options" role="radiogroup" aria-labelledby="pregunta-actual">
            {question.options.map((option, index) => {
              const isAnswer = index === question.answer;
              const isPicked = index === picked;
              const stateClass = locked && isAnswer ? "is-correct" : locked && isPicked ? "is-wrong" : "";
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={isPicked}
                  aria-disabled={locked}
                  className={`option ${stateClass}`}
                  onClick={() => choose(index)}
                >
                  <span className="option-key">{letters[index]}</span>
                  <span>
                    {option}
                    {locked && isAnswer && !isPicked && <small>Respuesta de los apuntes</small>}
                    {locked && isPicked && isAnswer && <small>Correcta</small>}
                    {locked && isPicked && !isAnswer && <small>No es esta</small>}
                  </span>
                </button>
              );
            })}
          </div>

          {locked && (
            <motion.div
              className="explain"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.24, ease: easeOut }}
            >
              <p className="explain-label">Explicación basada en los apuntes</p>
              <p>{question.explanation}</p>
            </motion.div>
          )}

          {locked && (
            <div className="actions">
              <button type="button" className="btn btn-primary" onClick={advance}>
                {step + 1 === total ? "Ver la nota" : "Siguiente pregunta"}
              </button>
            </div>
          )}
          <p className="keys">Teclas 1 a 4 para responder. Intro para seguir.</p>
        </motion.div>
      </div>
    </div>
  );
}
