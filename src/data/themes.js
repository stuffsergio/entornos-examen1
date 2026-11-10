import tema1 from "./tema1.md?raw";
import tema2 from "./tema2.md?raw";
import tema3 from "./tema3.md?raw";
import { extractHeadings, readingMinutes } from "../lib/headings";

export const themes = [
  {
    id: "1",
    number: "01",
    title: "Entornos de Desarrollo",
    summary:
      "Software, hardware, ciclo de vida, modelos de desarrollo y el camino del código Java hasta la JVM.",
    markdown: tema1,
  },
  {
    id: "2",
    number: "02",
    title: "Scrum y metodologías ágiles",
    summary:
      "El manifiesto ágil, los tres roles, los cinco eventos, los artefactos y las métricas de un sprint.",
    markdown: tema2,
  },
  {
    id: "3",
    number: "03",
    title: "Git y control de versiones",
    summary:
      "Repositorio distribuido, los tres árboles, ramas, remotos y la forma de deshacer un error.",
    markdown: tema3,
  },
].map((theme) => ({
  ...theme,
  headings: extractHeadings(theme.markdown),
  minutes: readingMinutes(theme.markdown),
}));

export function findTheme(id) {
  return themes.find((theme) => theme.id === String(id)) || null;
}
