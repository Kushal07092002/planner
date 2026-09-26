'use client';

import React from 'react';
import { Brain, BarChart3, Code2, Rocket, Briefcase, Play } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TaskCategory } from '@/types';

export const StudyTargetCards: React.FC = () => {
  const { startTimer, timeSessions, currentSimulatedDate } = useApp();

  // Compute minutes logged today for each category
  const todaysSessions = timeSessions.filter((s) => s.date === currentSimulatedDate);

  const getMinutesForCategory = (cat: TaskCategory) => {
    return todaysSessions
      .filter((s) => s.category === cat)
      .reduce((acc, s) => acc + (s.durationMinutes || 0), 0);
  };

  const targets = [
    {
      category: 'DSA' as TaskCategory,
      title: 'DSA Preparation',
      targetMinutes: 120,
      icon: Brain,
      color: 'from-cyan-500/20 to-cyan-950/40',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
      description: '2h Daily Target (Jan 2027 Placement Goal)',
    },
    {
      category: 'Data Science' as TaskCategory,
      title: 'Data Science Course',
      targetMinutes: 90,
      icon: BarChart3,
      color: 'from-blue-500/20 to-blue-950/40',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      description: '1.5h CodeWithHarry & ML Algorithms',
    },
    {
      category: 'Web Development' as TaskCategory,
      title: 'Web Development',
      targetMinutes: 60,
      icon: Code2,
      color: 'from-emerald-500/20 to-emerald-950/40',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      description: '1h Full-Stack & Next.js Strengthening',
    },
    {
      category: 'Major Project' as TaskCategory,
      title: 'Semester Project',
      targetMinutes: 90,
      icon: Rocket,
      color: 'from-purple-500/20 to-purple-950/40',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      description: '2-Month Sprint Deadline (Nov 27)',
    },
    {
      category: 'Placement' as TaskCategory,
      title: 'Placement & Exam Sprint',
      targetMinutes: 90,
      icon: Briefcase,
      color: 'from-amber-500/20 to-amber-950/40',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      description: 'Targeted Aptitude & PW / L&T Revision',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200">Today&apos;s Core Study Targets</h3>
        <span className="text-xs text-slate-400">Pillar Goals</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {targets.map((tgt, idx) => {
          const Icon = tgt.icon;
          const loggedMinutes = getMinutesForCategory(tgt.category);
          const percent = Math.min(100, Math.round((loggedMinutes / tgt.targetMinutes) * 100));

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl bg-gradient-to-b ${tgt.color} border ${tgt.borderColor} flex flex-col justify-between space-y-3 shadow-md`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-1.5 rounded-lg bg-slate-900/70 border border-slate-800">
                    <Icon className={`w-4 h-4 ${tgt.iconColor}`} />
                  </div>
                  <button
                    onClick={() => startTimer(Math.max(25, tgt.targetMinutes - loggedMinutes), tgt.category, `${tgt.title} Focus Block`)}
                    className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-cyan-900/60 text-slate-300 hover:text-cyan-300 border border-slate-700/60 text-[10px] font-bold flex items-center gap-1 transition-all"
                    title="Start Session Timer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Focus</span>
                  </button>
                </div>

                <h4 className="font-bold text-white text-xs">{tgt.title}</h4>
                <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">{tgt.description}</p>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                  <span className="text-slate-400">
                    {loggedMinutes}m / {tgt.targetMinutes}m
                  </span>
                  <span className={percent >= 100 ? 'text-emerald-400 font-bold' : 'text-cyan-400'}>
                    {percent}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percent >= 100 ? 'bg-emerald-400' : 'bg-gradient-to-r from-cyan-500 to-indigo-500'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
