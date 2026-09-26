'use client';

import React from 'react';
import { BookOpen, Dumbbell, Activity, Moon, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const FixedCommitmentsBar: React.FC = () => {
  const { currentSimulatedDate } = useApp();

  const [year, month, day] = currentSimulatedDate.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  const dayIndex = d.getDay();

  const isMon = dayIndex === 1;
  const isTue = dayIndex === 2;
  const isWed = dayIndex === 3;
  const isThu = dayIndex === 4;
  const isFri = dayIndex === 5;
  const isSat = dayIndex === 6;
  const isSun = dayIndex === 0;

  const hasClasses = isMon || isTue || isWed || isFri;
  const hasGym = isMon || isTue || isThu || isFri;
  const hasCricket = isSat || isSun;

  return (
    <div className="p-4 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            Fixed Commitments ({d.toLocaleDateString('en-US', { weekday: 'long' })})
          </h3>
        </div>
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 font-medium">
          <Moon className="w-3.5 h-3.5 text-zinc-400" /> 8h Sleep Protected (11:30 PM - 7:30 AM)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Classes */}
        <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-zinc-500" />
            <div>
              <span className="text-xs font-semibold text-zinc-900 dark:text-white block">Department Classes</span>
              <span className="text-[10px] text-zinc-500">
                {hasClasses ? '2h Lecture Block' : 'No Classes Today'}
              </span>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
            {hasClasses ? 'Mon/Tue/Wed/Fri' : 'Off'}
          </span>
        </div>

        {/* Gym */}
        <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Dumbbell className="w-4 h-4 text-zinc-500" />
            <div>
              <span className="text-xs font-semibold text-zinc-900 dark:text-white block">Gym & Strength</span>
              <span className="text-[10px] text-zinc-500">
                {hasGym ? '2h Workout Session' : 'Rest Day'}
              </span>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
            {hasGym ? 'Mon/Tue/Thu/Fri' : 'Rest'}
          </span>
        </div>

        {/* Cricket */}
        <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-zinc-500" />
            <div>
              <span className="text-xs font-semibold text-zinc-900 dark:text-white block">Cricket Practice</span>
              <span className="text-[10px] text-zinc-500">
                {hasCricket ? 'Weekend Ground Practice' : 'Weekday Rest'}
              </span>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
            {hasCricket ? 'Active' : 'Off'}
          </span>
        </div>
      </div>
    </div>
  );
};
