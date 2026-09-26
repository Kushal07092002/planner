'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Zap, CheckCircle2, Clock, Flame } from 'lucide-react';
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
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch (e) {
        // ignore
      }
    }
  }, [score, completed]);

  return (
    <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 backdrop-blur-xl shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Daily Productivity Score</h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-bold">
            Weighted Algorithm
          </span>
        </div>

        <div className="flex items-baseline gap-3 my-2">
          <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            {score}%
          </div>
          <div className="text-xs text-slate-300 font-medium">
            {score >= 80 ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-emerald-400" /> Outstanding Sprint Day!
              </span>
            ) : score >= 50 ? (
              <span className="text-cyan-400 font-semibold">Solid Momentum — Keep Pushing</span>
            ) : (
              <span className="text-amber-400 font-medium">Sprint Targets Pending</span>
            )}
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-1">
          Formula: <code className="text-indigo-300 bg-slate-900 px-1 py-0.5 rounded text-[10px]">Σ(task_weight × completion) / Σ(task_weight)</code>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Tasks Completed</span>
          <span className="font-bold text-white">
            {completed} / {todaysTasks.length} tasks
          </span>
        </div>
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Planned Focus Time</span>
          <span className="font-bold text-white">
            {(completedMinutes / 60).toFixed(1)}h / {(plannedMinutes / 60).toFixed(1)}h
          </span>
        </div>
      </div>
    </div>
  );
};
