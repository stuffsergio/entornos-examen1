import { Children } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { nodeText, slugify } from "../lib/headings";

function heading(Tag) {
  return function Heading({ children }) {
    const text = nodeText(children).replace(/\s+/g, " ").trim();
    const id = slugify(text);
    const depth = Tag === "h2" ? "2" : "3";
    return (
      <Tag id={id} data-heading data-depth={depth}>
        {children}
      </Tag>
    );
  };
}

function Pre({ children }) {
  const code = Children.toArray(children).find((child) => child?.props?.className);
  const language = String(code?.props?.className || "").match(/language-([\w-]+)/)?.[1];

  return (
    <div className="codeframe">
      {language && <span className="codelang">{language}</span>}
      <pre>{children}</pre>
    </div>
  );
}

const components = {
  h1: () => null,
  h2: heading("h2"),
  h3: heading("h3"),
  pre: Pre,
};

export default function MarkdownViewer({ markdown }) {
  return (
    <article className="lesson">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
