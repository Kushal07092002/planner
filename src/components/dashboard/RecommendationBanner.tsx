'use client';

import React from 'react';
import { Sparkles, Play, Target } from 'lucide-react';
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
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 shadow-sm relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              What Should I Do Now?
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium">
              {phaseInfo.phaseName}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              {recommendation.suggestedMinutes}m block
            </span>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {recommendation.title}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
              {recommendation.subtitle}
            </p>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Strategic Alignment: </span>
            {recommendation.reason}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2.5 flex-shrink-0">
          <button
            onClick={handleStartRecommendation}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{recommendation.actionText}</span>
          </button>

          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center md:text-right flex items-center justify-center md:justify-end gap-1 font-medium">
            <Target className="w-3.5 h-3.5 text-zinc-400" />
            Auto-prioritized by Sprint Engine
          </span>
        </div>
      </div>
    </div>
  );
};
