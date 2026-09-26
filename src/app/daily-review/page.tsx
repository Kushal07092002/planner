'use client';

import React, { useState } from 'react';
import {
  BookOpenCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap,
  Battery,
  Flame,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatDate } from '@/lib/utils';

export default function DailyReviewPage() {
  const {
    tasks,
    dailyReviews,
    saveDailyReview,
    rolloverUnfinishedTasks,
    currentSimulatedDate,
  } = useApp();

  const todaysTasks = tasks.filter((t) => t.dueDate === currentSimulatedDate);
  const completedTasks = todaysTasks.filter((t) => t.status === 'completed');
  const missedTasks = todaysTasks.filter((t) => t.status !== 'completed');

  // Form State
  const [completedSummary, setCompletedSummary] = useState(
    completedTasks.map((t) => t.title).join('\n')
  );
  const [failedSummary, setFailedSummary] = useState(
    missedTasks.map((t) => t.title).join('\n')
  );
  const [reasonForMiss, setReasonForMiss] = useState('');
  const [moveToTomorrow, setMoveToTomorrow] = useState(
    missedTasks.map((t) => t.title).join('\n')
  );
  const [tomorrowPriority, setTomorrowPriority] = useState('');
  const [energyLevel, setEnergyLevel] = useState(8);
  const [productivityLevel, setProductivityLevel] = useState(8);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveDailyReview({
      date: currentSimulatedDate,
      completedSummary,
      failedSummary,
      reasonForMiss,
      moveToTomorrow,
      tomorrowPriority,
      energyLevel,
      productivityLevel,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  const handleRollover = () => {
    rolloverUnfinishedTasks();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-400">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Daily Evening Review</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Reflect, Log Insights, and Intelligently Prepare Tomorrow&apos;s Mission
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Reviewing Date</span>
          <span className="text-sm font-bold text-cyan-400 font-mono">
            {formatDate(currentSimulatedDate)}
          </span>
        </div>
      </div>

      {/* Success Banner */}
      {isSaved && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between shadow-lg animate-bounce">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Daily Evening Review logged successfully to memory!</span>
          </div>
        </div>
      )}

      {/* 7-Question Review Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Q1 & Q2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-2">
            <label className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> 1. What did I complete today?
            </label>
            <textarea
              rows={3}
              required
              value={completedSummary}
              onChange={(e) => setCompletedSummary(e.target.value)}
              placeholder="List completed milestones, problem counts, or lessons..."
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-2">
            <label className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" /> 2. What did I fail to complete?
            </label>
            <textarea
              rows={3}
              value={failedSummary}
              onChange={(e) => setFailedSummary(e.target.value)}
              placeholder="Unfinished tasks or skipped study blocks..."
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Q3 & Q4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-2">
            <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Zap className="w-4 h-4" /> 3. Why did I miss it? (Root Cause)
            </label>
            <textarea
              rows={3}
              value={reasonForMiss}
              onChange={(e) => setReasonForMiss(e.target.value)}
              placeholder="Overestimation, low energy, distraction, unexpected department delay..."
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
                <RotateCcw className="w-4 h-4" /> 4. What should move to tomorrow?
              </label>
              <button
                type="button"
                onClick={handleRollover}
                className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 hover:bg-cyan-900/60 font-bold border border-cyan-500/30"
              >
                Auto 1-Click Rollover
              </button>
            </div>
            <textarea
              rows={3}
              value={moveToTomorrow}
              onChange={(e) => setMoveToTomorrow(e.target.value)}
              placeholder="Tasks to migrate into tomorrow's plan..."
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Q5 */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-2">
          <label className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Flame className="w-4 h-4" /> 5. What is tomorrow&apos;s NUMBER ONE priority?
          </label>
          <input
            type="text"
            required
            value={tomorrowPriority}
            onChange={(e) => setTomorrowPriority(e.target.value)}
            placeholder="e.g. Physics Wallah 50 questions sprint or DSA 2 Medium Graphs problems"
            className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Q6 & Q7: Energy & Productivity Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Battery className="w-4 h-4 text-emerald-400" /> 6. Energy Level (1 to 10)
              </label>
              <span className="text-lg font-black text-emerald-400 font-mono">{energyLevel}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" /> 7. Productivity Score (1 to 10)
              </label>
              <span className="text-lg font-black text-cyan-400 font-mono">{productivityLevel}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={productivityLevel}
              onChange={(e) => setProductivityLevel(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white text-xs font-bold shadow-xl shadow-indigo-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <BookOpenCheck className="w-4 h-4" />
            <span>Save & Complete Daily Review</span>
          </button>
        </div>
      </form>
    </div>
  );
}
