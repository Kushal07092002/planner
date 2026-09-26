'use client';

import React from 'react';
import Link from 'next/link';
import { Target, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const PhaseProgressBanner: React.FC = () => {
  const { currentSimulatedDate } = useApp();

  const phases = [
    {
      id: 'p1',
      name: 'PW Sprint',
      range: 'Sep 27 - Oct 03',
      exam: 'PW Exam (Oct 3)',
      active: currentSimulatedDate <= '2026-10-03',
      done: currentSimulatedDate > '2026-10-03',
    },
    {
      id: 'p2',
      name: 'Course Exams',
      range: 'Oct 04 - Oct 07',
      exam: 'Exams (Oct 5 & 7)',
      active: currentSimulatedDate > '2026-10-03' && currentSimulatedDate <= '2026-10-07',
      done: currentSimulatedDate > '2026-10-07',
    },
    {
      id: 'p3',
      name: 'L&T Prep Sprint',
      range: 'Oct 08 - Oct 12',
      exam: 'L&T Exam (Oct 12)',
      active: currentSimulatedDate > '2026-10-07' && currentSimulatedDate <= '2026-10-12',
      done: currentSimulatedDate > '2026-10-12',
    },
    {
      id: 'p4',
      name: 'MOOCs Exam',
      range: 'Oct 13 - Oct 16',
      exam: 'MOOC (Oct 16)',
      active: currentSimulatedDate > '2026-10-12' && currentSimulatedDate <= '2026-10-16',
      done: currentSimulatedDate > '2026-10-16',
    },
    {
      id: 'p5',
      name: '2027 Mastery',
      range: 'Oct 17 - Jan 31',
      exam: 'Campus Placements',
      active: currentSimulatedDate > '2026-10-16',
      done: false,
    },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            October Placement Sprint (2026-09-27 to 2026-10-16)
          </h3>
        </div>
        <Link
          href="/missions"
          className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:underline"
        >
          View Roadmap <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {phases.map((p, idx) => (
          <div
            key={p.id}
            className={`p-3 rounded-2xl border transition-all ${
              p.active
                ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-400 dark:border-zinc-600 shadow-sm'
                : p.done
                ? 'bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200/60 dark:border-zinc-800/60 opacity-70'
                : 'bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200/60 dark:border-zinc-800/60 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-medium text-zinc-400">
                Phase {idx + 1}
              </span>
              {p.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ) : p.active ? (
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600" />
              )}
            </div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {p.name}
            </h4>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">{p.range}</p>
            <div className="mt-2 pt-1.5 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-[10px]">
              <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[100px]">{p.exam}</span>
              {p.active && (
                <span className="px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-semibold text-[9px]">
                  NOW
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
