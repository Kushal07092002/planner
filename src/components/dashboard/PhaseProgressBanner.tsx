'use client';

import React from 'react';
import Link from 'next/link';
import { Target, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const PhaseProgressBanner: React.FC = () => {
  const { currentSimulatedDate, phaseInfo } = useApp();

  const phases = [
    {
      id: 'p1',
      name: 'PW Sprint',
      range: 'Sep 27 - Oct 03',
      exam: 'PW Exam (Oct 3)',
      active: currentSimulatedDate <= '2026-10-03',
      done: currentSimulatedDate > '2026-10-03',
      color: 'border-amber-500 text-amber-400',
    },
    {
      id: 'p2',
      name: 'Course Exams',
      range: 'Oct 04 - Oct 07',
      exam: 'Exams (Oct 5 & 7)',
      active: currentSimulatedDate > '2026-10-03' && currentSimulatedDate <= '2026-10-07',
      done: currentSimulatedDate > '2026-10-07',
      color: 'border-rose-500 text-rose-400',
    },
    {
      id: 'p3',
      name: 'L&T Prep Sprint',
      range: 'Oct 08 - Oct 12',
      exam: 'L&T Exam (Oct 12)',
      active: currentSimulatedDate > '2026-10-07' && currentSimulatedDate <= '2026-10-12',
      done: currentSimulatedDate > '2026-10-12',
      color: 'border-cyan-500 text-cyan-400',
    },
    {
      id: 'p4',
      name: 'MOOCs Exam',
      range: 'Oct 13 - Oct 16',
      exam: 'MOOC (Oct 16)',
      active: currentSimulatedDate > '2026-10-12' && currentSimulatedDate <= '2026-10-16',
      done: currentSimulatedDate > '2026-10-16',
      color: 'border-indigo-500 text-indigo-400',
    },
    {
      id: 'p5',
      name: '2027 Mastery',
      range: 'Oct 17 - Jan 31',
      exam: 'Campus Placements',
      active: currentSimulatedDate > '2026-10-16',
      done: false,
      color: 'border-emerald-500 text-emerald-400',
    },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-200">
            October Placement Sprint (2026-09-27 to 2026-10-16)
          </h3>
        </div>
        <Link
          href="/missions"
          className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
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
                ? 'bg-gradient-to-b from-slate-800/90 to-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-500/40'
                : p.done
                ? 'bg-slate-950/40 border-emerald-900/40 opacity-70'
                : 'bg-slate-950/40 border-slate-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400">
                Phase {idx + 1}
              </span>
              {p.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : p.active ? (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-600" />
              )}
            </div>
            <h4 className={`text-xs font-bold ${p.active ? 'text-cyan-300' : 'text-white'}`}>
              {p.name}
            </h4>
            <p className="text-[10px] text-slate-400 mt-0.5">{p.range}</p>
            <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <span className="text-slate-300 font-semibold truncate max-w-[100px]">{p.exam}</span>
              {p.active && (
                <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[9px]">
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
