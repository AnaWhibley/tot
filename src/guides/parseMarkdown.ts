import React from 'react';

function parseFrontmatter(src: string): { id: string; title: string; body: string } {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { id: '', title: '', body: src };

  const meta: Record<string, string> = {};
  m[1].split(/\r?\n/).forEach(line => {
    const idx = line.indexOf(':');
    if (idx !== -1) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  });

  return { id: meta['id'] ?? '', name: meta['name'] ?? '', title: meta['title'] ?? '', body: m[2] };
}

// **bold**, `code`, [text](url), ==highlight==
function parseInline(text: string): React.ReactNode[] {
  const re = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|==([^=]+)==/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));

    if (match[1] !== undefined) {
      nodes.push(React.createElement('strong', { key: key++ }, match[1]));
    } else if (match[2] !== undefined) {
      nodes.push(React.createElement('code', { key: key++ }, match[2]));
    } else if (match[3] !== undefined && match[4] !== undefined) {
      nodes.push(React.createElement('a', { key: key++, href: match[4] }, match[3]));
    } else if (match[5] !== undefined) {
      nodes.push(React.createElement('span', { key: key++, className: 'exampleDate' }, match[5]));
    }

    last = match.index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function parseBlocks(body: string): React.ReactNode {
  const blocks = body.trim().split(/\n\n+/);
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const block of blocks) {
    const lines = block.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    if (lines.every(l => /^[-*] /.test(l))) {
      elements.push(
        React.createElement(
          'ul',
          { key: key++ },
          ...lines.map((l, i) =>
            React.createElement('li', { key: i }, ...parseInline(l.replace(/^[-*] /, '')))
          )
        )
      );
    } else {
      elements.push(
        React.createElement('p', { key: key++ }, ...parseInline(lines.join(' ')))
      );
    }
  }

  return React.createElement(React.Fragment, null, ...elements);
}

export function parseMarkdown(src: string): { id: string; name: string; title: string; description: React.ReactNode } {
  const { id, name, title, body } = parseFrontmatter(src);
  return { id, name, title, description: parseBlocks(body) };
}
