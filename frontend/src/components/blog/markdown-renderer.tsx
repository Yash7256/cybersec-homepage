import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";

// ── Copy button for code blocks ───────────────────────────────────────────────
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50 opacity-0 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/80 group-hover:opacity-100"
    >
      {copied ? (
        <>
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 text-green-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

// ── Language badge ─────────────────────────────────────────────────────────────
function CodeBlock({
  lang,
  code,
  children,
}: {
  lang: string | null;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border border-white/10 bg-[oklch(0.12_0.04_285)]">
      {lang && (
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-1.5">
          <span className="font-mono text-xs text-white/40">{lang}</span>
        </div>
      )}
      <div className="relative overflow-x-auto">
        {children}
        <CopyButton code={code} />
      </div>
    </div>
  );
}

// ── Custom component map ──────────────────────────────────────────────────────
const components: Components = {
  // Code block — pre wraps a <code class="language-xxx">
  pre({ children, ...props }) {
    // Extract the code element from children
    const codeEl =
      children && typeof children === "object" && "props" in (children as object)
        ? (children as React.ReactElement<{ className?: string; children?: string }>)
        : null;

    const className = codeEl?.props?.className ?? "";
    const lang = (className.match(/language-(\S+)/) ?? [])[1] ?? null;
    const rawCode = codeEl?.props?.children;
    const code = typeof rawCode === "string" ? rawCode.replace(/\n$/, "") : "";

    return (
      <CodeBlock lang={lang} code={code}>
        <pre
          {...props}
          className="!m-0 !rounded-none !border-0 !bg-transparent overflow-x-auto p-4 text-sm leading-relaxed"
        >
          {children}
        </pre>
      </CodeBlock>
    );
  },

  // Inline code
  code({ className, children, ...props }) {
    // If className includes language-* it's inside a pre — let it render normally
    if (className?.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded-sm border border-white/10 bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.85em] text-purple-300"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Images — lazy loaded with rounded corners
  img({ src, alt, title }) {
    return (
      <span className="my-6 block">
        <img
          src={src}
          alt={alt ?? ""}
          title={title}
          loading="lazy"
          decoding="async"
          className="mx-auto rounded-lg border border-white/10 shadow-lg"
        />
        {alt && (
          <span className="mt-2 block text-center text-xs text-white/40">{alt}</span>
        )}
      </span>
    );
  },

  // Links — open external links in a new tab safely
  a({ href, children, ...props }) {
    const isExternal =
      href?.startsWith("http://") || href?.startsWith("https://");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },

  // Tables — responsive horizontal scroll wrapper
  table({ children, ...props }) {
    return (
      <div className="my-6 w-full overflow-x-auto rounded-lg border border-white/10">
        <table {...props} className="min-w-full">
          {children}
        </table>
      </div>
    );
  },

  // Blockquotes — styled as callouts
  blockquote({ children, ...props }) {
    return (
      <blockquote
        {...props}
        className="my-6 rounded-r-lg border-l-[3px] border-purple-500 bg-purple-900/10 px-5 py-4 text-white/80 not-italic"
      >
        {children}
      </blockquote>
    );
  },
};

// ── Public component ──────────────────────────────────────────────────────────
interface Props {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: Props) {
  return (
    <div
      className={[
        "prose prose-blog prose-invert max-w-none",
        "prose-headings:scroll-mt-20",
        "prose-a:text-purple-400",
        "prose-strong:text-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
