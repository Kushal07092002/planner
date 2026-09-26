'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Flame } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { calculateDailyProductivityScore } from '@/lib/priorityEngine';

export const DailyScoreCard: React.FC = () => {
  const { tasks, currentSimulatedDate } = useApp();

  const score = calculateDailyProductivityScore(tasks, currentSimulatedDate);
  const todaysTasks = tasks.filter((t) => t.dueDate === currentSimulatedDate);
  const completed = todaysTasks.filter((t) => t.status === 'completed').length;

  const plannedMinutes = todaysTasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);
  const completedMinutes = todaysTasks
    .filter((t) => t.status === 'completed')
    .reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);

  useEffect(() => {
    if (score >= 80 && completed > 0) {
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.8 },
        });
      } catch (e) {
        // ignore
      }
    }
  }, [score, completed]);

  return (
    <div className="p-5 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Daily Productivity Score
            </h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono font-medium">
            Weighted Score
          </span>
        </div>

        <div className="flex items-baseline gap-3 my-2">
          <div className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {score}%
          </div>
          <div className="text-xs font-medium">
            {score >= 80 ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                <Flame className="w-3.5 h-3.5 fill-current" /> Outstanding Pace!
              </span>
            ) : score >= 50 ? (
              <span className="text-blue-600 dark:text-blue-400 font-medium">Solid Momentum</span>
            ) : (
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">Sprint Targets Pending</span>
            )}
          </div>
        </div>

        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
          Based on today&apos;s completed priority weighting.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 text-xs">
        <div className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Tasks Completed</span>
          <span className="font-semibold text-zinc-900 dark:text-white">
            {completed} / {todaysTasks.length}
          </span>
        </div>
        <div className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Planned Time</span>
          <span className="font-semibold text-zinc-900 dark:text-white">
            {(completedMinutes / 60).toFixed(1)}h / {(plannedMinutes / 60).toFixed(1)}h
          </span>
        </div>
      </div>
    </div>
  );
};
