import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import MarkdownViewer from "../components/MarkdownViewer";
import ProgressBar from "../components/ProgressBar";
import { findTheme, themes } from "../data/themes";
import { useProgress } from "../context/ProgressContext";
import { themePercent } from "../lib/course";
import { useMedia } from "../lib/useMedia";

export default function ThemeDetail() {
  const { themeId } = useParams();
  const theme = findTheme(themeId);
  const { state, markSeen, remember } = useProgress();
  const reduce = useReducedMotion();
  const wide = useMedia("(min-width: 960px)");
  const [indexOpen, setIndexOpen] = useState(false);
  const [activeId, setActiveId] = useState(theme?.headings[0]?.id || "");

  useEffect(() => {
    if (!theme) {
      document.title = "Unidad no encontrada · Entornos de Desarrollo";
      return;
    }
    document.title = `Unidad ${theme.number} · ${theme.title}`;
    remember({ href: `/tema/${theme.id}`, label: `Unidad ${theme.number} · ${theme.title}` });
    setActiveId(theme.headings[0]?.id || "");
  }, [theme, remember]);

  useEffect(() => {
    if (!theme) return undefined;
    const nodes = [...document.querySelectorAll("[data-heading]")];
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible.length) return;
        const current = visible[0].target;
        setActiveId(current.id);
        if (current.dataset.depth === "2") markSeen(theme.id, current.id);
      },
      { rootMargin: "-12% 0px -55% 0px", threshold: [0, 0.4, 1] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [theme, markSeen]);

  if (!theme) {
    return (
      <div className="wrap empty">
        <h1>Esa unidad no está en el temario.</h1>
        <p className="lede">Hay tres unidades: entornos, Scrum y Git.</p>
        <Link className="btn btn-primary" to="/#temario">
          Volver al temario
        </Link>
      </div>
    );
  }

  const index = themes.findIndex((item) => item.id === theme.id);
  const previous = themes[index - 1];
  const next = themes[index + 1];
  const chapters = theme.headings.filter((heading) => heading.depth === 2);
  const percent = themePercent(state.seen[theme.id] || [], theme.headings);

  function jump(event, id, depth) {
    event.preventDefault();
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    if (depth === 2) markSeen(theme.id, id);
    setActiveId(id);
  }

  return (
    <div className="wrap">
      <header className="theme-hero">
        <p className="crumb">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link to="/#temario">Temario</Link>
          <span aria-hidden="true">/</span>
          <span>Unidad {theme.number}</span>
        </p>
        <p className="kicker">
          <span className="kicker-rule" aria-hidden="true" />
          Unidad {theme.number}
        </p>
        <h1>{theme.title}</h1>
        <p className="lede">{theme.summary}</p>
        <p className="meta">
          {theme.minutes} min de lectura · {chapters.length} apartados
        </p>
        <ProgressBar value={percent} label="Lectura de la unidad" hint={`${percent}%`} />
      </header>

      <div className="lesson-layout">
        <details
          className="index-panel"
          open={wide || indexOpen}
          onToggle={(event) => {
            if (!wide) setIndexOpen(event.currentTarget.open);
          }}
        >
          <summary>Índice · {chapters.length} apartados</summary>
          <nav className="index" aria-label="Índice de la unidad">
            {theme.headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                data-depth={heading.depth}
                aria-current={activeId === heading.id ? "true" : undefined}
                onClick={(event) => jump(event, heading.id, heading.depth)}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </details>
        <div>
          <MarkdownViewer markdown={theme.markdown} />
          <nav className="pager" aria-label="Unidades contiguas">
            {previous ? (
              <Link to={`/tema/${previous.id}`}>Unidad {previous.number}</Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/tema/${next.id}`}>Unidad {next.number}</Link>
            ) : (
              <Link to="/cuestionarios">Ir a los cuestionarios</Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
