'use client';

import React from 'react';
import { Brain, BarChart3, Code2, Rocket, Briefcase, Play } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TaskCategory } from '@/types';

export const StudyTargetCards: React.FC = () => {
  const { startTimer, timeSessions, currentSimulatedDate } = useApp();

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
      description: '2h Daily Target (Jan 2027 Goal)',
    },
    {
      category: 'Data Science' as TaskCategory,
      title: 'Data Science Course',
      targetMinutes: 90,
      icon: BarChart3,
      description: '1.5h CodeWithHarry & ML Lab',
    },
    {
      category: 'Web Development' as TaskCategory,
      title: 'Web Development',
      targetMinutes: 60,
      icon: Code2,
      description: '1h Full-Stack Strengthening',
    },
    {
      category: 'Major Project' as TaskCategory,
      title: 'Semester Project',
      targetMinutes: 90,
      icon: Rocket,
      description: '2-Month Sprint (Due Nov 27)',
    },
    {
      category: 'Placement' as TaskCategory,
      title: 'Placement & Exam Sprint',
      targetMinutes: 90,
      icon: Briefcase,
      description: 'PW & L&T Targeted Revision',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Today&apos;s Core Study Targets
        </h3>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Pillar Goals</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {targets.map((tgt, idx) => {
          const Icon = tgt.icon;
          const loggedMinutes = getMinutesForCategory(tgt.category);
          const percent = Math.min(100, Math.round((loggedMinutes / tgt.targetMinutes) * 100));

          return (
            <div
              key={idx}
              className="p-4 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <button
                    onClick={() => startTimer(Math.max(25, tgt.targetMinutes - loggedMinutes), tgt.category, `${tgt.title} Focus Block`)}
                    className="px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-medium flex items-center gap-1 transition-all"
                    title="Start Session Timer"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Focus</span>
                  </button>
                </div>

                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs">
                  {tgt.title}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                  {tgt.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] mb-1 font-mono text-zinc-600 dark:text-zinc-400">
                  <span>
                    {loggedMinutes}m / {tgt.targetMinutes}m
                  </span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {percent}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percent >= 100
                        ? 'bg-emerald-500'
                        : 'bg-zinc-900 dark:bg-zinc-100'
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
