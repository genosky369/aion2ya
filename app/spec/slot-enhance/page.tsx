'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Link from 'next/link';
import { Play, FileText, Database, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { tables, TableDef } from './table-data';
import { designDocContent } from './design-doc-content';

const GRADE_COLORS: Record<string, string> = {
  NORMAL: 'text-gray-400',
  RARE: 'text-blue-400',
  EPIC: 'text-purple-400',
  LEGENDARY: 'text-yellow-400',
  ANCIENT: 'text-red-400',
};

function GradeBadge({ grade }: { grade: string }) {
  return (
    <span className={`font-medium ${GRADE_COLORS[grade] || 'text-gray-300'}`}>
      {grade}
    </span>
  );
}

function DataTable({ table }: { table: TableDef }) {
  const [showDefs, setShowDefs] = useState(false);

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{table.name}</h3>
          <p className="text-sm text-gray-400">{table.description}</p>
        </div>
        <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
          {table.rows.length}행
        </span>
      </div>

      <button
        onClick={() => setShowDefs(!showDefs)}
        className="w-full px-4 py-2 text-left text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 flex items-center gap-1 border-b border-gray-700"
      >
        {showDefs ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        컬럼 정의 보기
      </button>

      {showDefs && (
        <div className="bg-gray-900/50 p-4 border-b border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left">
                <th className="pb-2 pr-4">컬럼</th>
                <th className="pb-2 pr-4">타입</th>
                <th className="pb-2 pr-4">필수</th>
                <th className="pb-2">설명</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {table.columnDefs.map((col) => (
                <tr key={col.name} className="border-t border-gray-800">
                  <td className="py-1.5 pr-4 font-mono text-blue-300">{col.name}</td>
                  <td className="py-1.5 pr-4 text-gray-500">{col.type}</td>
                  <td className="py-1.5 pr-4">{col.required === 'Y' ? '✓' : ''}</td>
                  <td className="py-1.5 text-gray-400">{col.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800/50">
              {table.headers.map((h) => (
                <th key={h} className="px-3 py-2 text-left text-gray-400 font-mono text-xs whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {table.rows.map((row, i) => (
              <tr key={i} className={`border-t border-gray-800 ${i % 2 === 0 ? '' : 'bg-gray-800/20'}`}>
                {row.map((cell, j) => {
                  const isGrade = table.headers[j] === 'grade';
                  const isSafe = table.headers[j] === 'isSafe' && cell === true;
                  const isRate = typeof cell === 'number' && (
                    table.headers[j].includes('Rate') || table.headers[j] === 'rate'
                  ) && cell <= 1;
                  return (
                    <td key={j} className={`px-3 py-1.5 whitespace-nowrap ${isSafe ? 'text-green-400 font-medium' : ''}`}>
                      {isGrade ? (
                        <GradeBadge grade={String(cell)} />
                      ) : isRate ? (
                        `${(Number(cell) * 100).toFixed(0)}%`
                      ) : typeof cell === 'boolean' ? (
                        cell ? '✓' : ''
                      ) : (
                        String(cell)
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={key++} className="bg-gray-900 border border-gray-700 rounded-lg p-4 my-3 overflow-x-auto text-sm text-gray-300 font-mono">
          {codeLines.join('\n')}
        </pre>
      );
      i++;
      continue;
    }

    // Table
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const headerCells = tableLines[0].split('|').filter(c => c.trim()).map(c => c.trim());
      const dataLines = tableLines.slice(2); // skip header + separator
      elements.push(
        <div key={key++} className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-gray-700 rounded">
            <thead>
              <tr className="bg-gray-800">
                {headerCells.map((c, ci) => (
                  <th key={ci} className="px-3 py-2 text-left text-gray-300 font-medium border-b border-gray-700">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataLines.map((dl, di) => {
                const cells = dl.split('|').filter(c => c.trim()).map(c => c.trim());
                return (
                  <tr key={di} className="border-b border-gray-800">
                    {cells.map((c, ci) => (
                      <td key={ci} className="px-3 py-1.5 text-gray-400">{c}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(<hr key={key++} className="my-6 border-gray-700" />);
      i++;
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      elements.push(<h1 key={key++} className="text-3xl font-bold text-white mt-8 mb-4">{formatInline(line.slice(2))}</h1>);
      i++; continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-bold text-white mt-8 mb-3 pb-2 border-b border-gray-700">{formatInline(line.slice(3))}</h2>);
      i++; continue;
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-xl font-semibold text-gray-200 mt-6 mb-2">{formatInline(line.slice(4))}</h3>);
      i++; continue;
    }
    if (line.startsWith('#### ')) {
      elements.push(<h4 key={key++} className="text-lg font-semibold text-gray-300 mt-4 mb-2">{formatInline(line.slice(5))}</h4>);
      i++; continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={key++} className="border-l-4 border-blue-500 bg-blue-500/10 pl-4 py-2 my-3 text-gray-300 text-sm">
          {quoteLines.map((ql, qi) => <p key={qi} className="my-0.5">{formatInline(ql)}</p>)}
        </blockquote>
      );
      continue;
    }

    // List items
    if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc list-inside my-2 space-y-1 text-gray-400">
          {listItems.map((li, idx) => <li key={idx}>{formatInline(li)}</li>)}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph
    elements.push(<p key={key++} className="text-gray-400 my-2">{formatInline(line)}</p>);
    i++;
  }

  return <>{elements}</>;
}

function formatInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let partKey = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(<span key={partKey++}>{formatCode(remaining.slice(0, boldMatch.index))}</span>);
      }
      parts.push(<strong key={partKey++} className="text-white font-semibold">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      continue;
    }

    // Inline code
    const codeMatch = remaining.match(/`([^`]+)`/);
    if (codeMatch && codeMatch.index !== undefined) {
      if (codeMatch.index > 0) {
        parts.push(<span key={partKey++}>{remaining.slice(0, codeMatch.index)}</span>);
      }
      parts.push(
        <code key={partKey++} className="bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch.index + codeMatch[0].length);
      continue;
    }

    parts.push(<span key={partKey++}>{remaining}</span>);
    break;
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

function formatCode(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let k = 0;

  while (remaining.length > 0) {
    const m = remaining.match(/`([^`]+)`/);
    if (m && m.index !== undefined) {
      if (m.index > 0) parts.push(<span key={k++}>{remaining.slice(0, m.index)}</span>);
      parts.push(
        <code key={k++} className="bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">{m[1]}</code>
      );
      remaining = remaining.slice(m.index + m[0].length);
      continue;
    }
    parts.push(<span key={k++}>{remaining}</span>);
    break;
  }
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export default function SlotEnhanceSpecPage() {
  const [selectedTable, setSelectedTable] = useState<string>(tables[0].id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">홈</Link>
            <span>/</span>
            <Link href="/spec" className="hover:text-white transition-colors">기획서</Link>
            <span>/</span>
            <span className="text-gray-300">장비 슬롯 강화</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            장비 슬롯 강화 시스템
          </h1>
          <p className="text-gray-400">
            마법기사 키우기 - 기획서 v0.5 | 시뮬레이터 & 데이터 테이블
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="simulator" className="w-full">
          <TabsList className="bg-gray-800/50 border border-gray-700 p-1 mb-6">
            <TabsTrigger value="simulator" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white gap-2">
              <Play className="w-4 h-4" />
              시뮬레이터
            </TabsTrigger>
            <TabsTrigger value="design-doc" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white gap-2">
              <FileText className="w-4 h-4" />
              기획서
            </TabsTrigger>
            <TabsTrigger value="tables" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white gap-2">
              <Database className="w-4 h-4" />
              데이터 테이블
            </TabsTrigger>
          </TabsList>

          {/* Simulator Tab */}
          <TabsContent value="simulator">
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">슬롯 강화 시뮬레이터</span>
                <a
                  href="/simulators/slot-enhance.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  새 탭에서 열기 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <iframe
                src="/simulators/slot-enhance.html"
                className="w-full border-0"
                style={{ height: 'calc(100vh - 220px)', minHeight: '700px' }}
                title="슬롯 강화 시뮬레이터"
              />
            </div>
          </TabsContent>

          {/* Design Doc Tab */}
          <TabsContent value="design-doc">
            <div className="max-w-4xl mx-auto bg-gray-900/30 border border-gray-700 rounded-lg p-6 md:p-10">
              <MarkdownRenderer content={designDocContent} />
            </div>
          </TabsContent>

          {/* Data Tables Tab */}
          <TabsContent value="tables">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Table Selector */}
              <div className="lg:w-64 shrink-0">
                <div className="sticky top-4 space-y-1">
                  <p className="text-sm text-gray-400 mb-3 font-medium">테이블 목록 ({tables.length}개)</p>
                  {tables.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTable(t.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedTable === t.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                      }`}
                    >
                      <div className="font-mono text-xs">{t.name}</div>
                      <div className="text-xs opacity-70 mt-0.5">{t.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Table */}
              <div className="flex-1 min-w-0">
                {tables
                  .filter((t) => t.id === selectedTable)
                  .map((t) => (
                    <DataTable key={t.id} table={t} />
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
