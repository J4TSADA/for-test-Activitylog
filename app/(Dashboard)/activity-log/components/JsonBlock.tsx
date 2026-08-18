'use client';

import { useState, type ReactNode } from 'react';
import { Copy, Check } from 'lucide-react';

type JsonBlockProps = {
  data: Record<string, unknown>;
};

function highlightLine(line: string, index: number): ReactNode {
  const parts: ReactNode[] = [];
  const keyMatch = /^(\s*)"([^"]+)":/.exec(line);
  let rest = line;

  if (keyMatch) {
    parts.push(
      <span key="indent">{keyMatch[1]}</span>,
      <span key="key" className="text-sky-300">
        &quot;{keyMatch[2]}&quot;
      </span>,
      <span key="colon" className="text-slate-400">
        :{' '}
      </span>,
    );
    rest = line.slice(keyMatch[0].length + 1);
  }

  const trimmed = rest.trim();
  let valueNode: ReactNode = null;

  if (/^".*"[,]?$/.test(trimmed)) {
    valueNode = <span className="text-emerald-400">{trimmed}</span>;
  } else if (/^(true|false|null)[,]?$/.test(trimmed)) {
    valueNode = <span className="text-orange-400">{trimmed}</span>;
  } else if (/^-?\d+(\.\d+)?[,]?$/.test(trimmed)) {
    valueNode = <span className="text-purple-300">{trimmed}</span>;
  } else if (trimmed) {
    valueNode = <span className="text-slate-300">{trimmed}</span>;
  }

  return (
    <div key={index}>
      {parts}
      {valueNode}
    </div>
  );
}

export function JsonBlock({ data }: JsonBlockProps) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    void navigator.clipboard?.writeText(json).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative rounded-md bg-slate-900 p-4">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
        aria-label="คัดลอก JSON"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
        {json.split('\n').map(highlightLine)}
      </pre>
    </div>
  );
}
