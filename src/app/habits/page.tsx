'use client';

import React from 'react';
import {
  Flame,
  CheckCircle2,
  Circle,
  Brain,
  BarChart3,
  Code2,
  Rocket,
  Briefcase,
  Moon,
  Dumbbell,
  Activity,
  Award,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatDate } from '@/lib/utils';

export default function HabitsPage() {
  const { habits, toggleHabit, currentSimulatedDate } = useApp();

  // Generate last 28 days for the GitHub-style contribution heatmap
  const [cYear, cMonth, cDay] = currentSimulatedDate.split('-').map(Number);
  const baseDate = new Date(cYear, cMonth - 1, cDay);

  const past28Days: string[] = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    past28Days.push(`${y}-${m}-${day}`);
  }

  const getHabitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className="w-5 h-5 text-cyan-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-blue-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-purple-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-amber-400" />;
      case 'Moon':
        return <Moon className="w-5 h-5 text-indigo-400" />;
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5 text-emerald-400" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-cyan-400" />;
      default:
        return <Flame className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Habits & Consistency Engine</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              8 Core Non-Negotiables &bull; GitHub-Style Contribution Heatmap
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Focus Date</span>
            <span className="text-sm font-black text-amber-400 font-mono">
              {formatDate(currentSimulatedDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Habits Grid and Heatmap */}
      <div className="space-y-4">
        {habits.map((habit) => {
          const isDoneToday = !!habit.completions[currentSimulatedDate];

          return (
            <div
              key={habit.id}
              className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all backdrop-blur-xl shadow-lg space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
                    {getHabitIcon(habit.iconName)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      {habit.name}
                      <span className="text-[10px] font-normal text-slate-400 font-mono">
                        ({habit.targetDescription})
                      </span>
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                        <Flame className="w-3.5 h-3.5 fill-amber-400" />
                        {habit.streak} Day Streak
                      </span>
                      <span className="text-slate-600">&bull;</span>
                      <span className="text-xs text-slate-400">
                        Best: {habit.bestStreak} days
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1-Click Toggle for Today */}
                <button
                  onClick={() => toggleHabit(habit.id, currentSimulatedDate)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    isDoneToday
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {isDoneToday ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                      <span>Completed for Today!</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-slate-400" />
                      <span>Mark Done for Today</span>
                    </>
                  )}
                </button>
              </div>

              {/* GitHub-style 28-day Heatmap Row */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5 font-mono">
                  <span>28-Day Consistency Visualizer</span>
                  <span>{past28Days[0]} &rarr; {past28Days[past28Days.length - 1]}</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1">
                  {past28Days.map((dateStr) => {
                    const isCompleted = !!habit.completions[dateStr];
                    const isCurrent = dateStr === currentSimulatedDate;

                    return (
                      <button
                        key={dateStr}
                        onClick={() => toggleHabit(habit.id, dateStr)}
                        title={`${dateStr}: ${isCompleted ? 'Completed' : 'Missed'}`}
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg border transition-all flex items-center justify-center flex-shrink-0 cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-500 border-emerald-400 text-black font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-600 hover:border-slate-600'
                        } ${isCurrent ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950' : ''}`}
                      >
                        {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
