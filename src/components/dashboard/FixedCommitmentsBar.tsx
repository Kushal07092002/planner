'use client';

import React from 'react';
import { BookOpen, Dumbbell, Activity, Moon, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const FixedCommitmentsBar: React.FC = () => {
  const { currentSimulatedDate } = useApp();

  // Determine day of week from simulated date
  const [year, month, day] = currentSimulatedDate.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  const dayIndex = d.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

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
    <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Fixed Schedule Protections for {d.toLocaleDateString('en-US', { weekday: 'long' })}
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Moon className="w-3.5 h-3.5 text-indigo-400" /> 8h Sleep Protected (11:30 PM - 7:30 AM)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Classes */}
        <div
          className={`p-2.5 rounded-xl border flex items-center justify-between ${
            hasClasses
              ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
              : 'bg-slate-950/40 border-slate-800 text-slate-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <div>
              <span className="text-xs font-bold block">Department Classes</span>
              <span className="text-[10px] text-slate-400">
                {hasClasses ? '2 Hours Protected Block' : 'No Classes Today'}
              </span>
            </div>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${hasClasses ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-500'}`}>
            {hasClasses ? 'Mon/Tue/Wed/Fri' : 'Off'}
          </span>
        </div>

        {/* Gym */}
        <div
          className={`p-2.5 rounded-xl border flex items-center justify-between ${
            hasGym
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
              : 'bg-slate-950/40 border-slate-800 text-slate-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4" />
            <div>
              <span className="text-xs font-bold block">Gym & Strength</span>
              <span className="text-[10px] text-slate-400">
                {hasGym ? '2 Hours Workout Block' : 'Rest Day'}
              </span>
            </div>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${hasGym ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>
            {hasGym ? 'Mon/Tue/Thu/Fri' : 'Rest'}
          </span>
        </div>

        {/* Cricket */}
        <div
          className={`p-2.5 rounded-xl border flex items-center justify-between ${
            hasCricket
              ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-300'
              : 'bg-slate-950/40 border-slate-800 text-slate-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <div>
              <span className="text-xs font-bold block">Cricket Practice</span>
              <span className="text-[10px] text-slate-400">
                {hasCricket ? 'Weekend Ground Practice' : 'Weekday Rest'}
              </span>
            </div>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${hasCricket ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'}`}>
            {hasCricket ? 'Sat/Sun Active' : 'Off'}
          </span>
        </div>
      </div>
    </div>
  );
};
