'use client';

import React from 'react';
import { Sparkles, Play, ArrowRight, CheckCircle, Flame, Target } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getSmartRecommendation } from '@/lib/priorityEngine';

export const RecommendationBanner: React.FC = () => {
  const { tasks, exams, currentSimulatedDate, startTimer, phaseInfo } = useApp();

  const recommendation = getSmartRecommendation(tasks, exams, currentSimulatedDate);

  const handleStartRecommendation = () => {
    startTimer(
      recommendation.suggestedMinutes || 45,
      recommendation.category,
      recommendation.title
    );
  };

  return (
    <div className="p-5 lg:p-6 rounded-3xl bg-gradient-to-r from-cyan-950/70 via-indigo-950/60 to-purple-950/70 border border-cyan-500/40 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Background glow flair */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              What Should I Do Now?
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
              {phaseInfo.phaseName}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Suggested block: {recommendation.suggestedMinutes} mins
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              {recommendation.title}
            </h2>
            <p className="text-xs sm:text-sm text-cyan-200/80 font-medium mt-1">
              {recommendation.subtitle}
            </p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="font-semibold text-cyan-400">Strategic Alignment: </span>
            {recommendation.reason}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2.5 flex-shrink-0">
          <button
            onClick={handleStartRecommendation}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{recommendation.actionText}</span>
          </button>

          <span className="text-[11px] text-slate-400 text-center md:text-right flex items-center justify-center md:justify-end gap-1">
            <Target className="w-3.5 h-3.5 text-indigo-400" />
            Auto-prioritized by Placement Engine
          </span>
        </div>
      </div>
    </div>
  );
};
