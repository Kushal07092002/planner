'use client';

import React, { useState, useEffect } from 'react';
import {
  Menu,
  Clock,
  Calendar as CalendarIcon,
  Plus,
  Play,
  CheckCircle,
  Bell,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatDate } from '@/lib/utils';

export const Header: React.FC<{ onMenuToggle?: () => void; onOpenNewTaskModal?: () => void }> = ({
  onMenuToggle,
  onOpenNewTaskModal,
}) => {
  const {
    currentSimulatedDate,
    setCurrentSimulatedDate,
    phaseInfo,
    notification,
    startTimer,
    activeTimer,
  } = useApp();

  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    return 'Good Morning, Kushal';
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#090d16]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-6 py-3">
      {/* Toast Notification if present */}
      {notification && (
        <div className="mb-2 p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/50 text-cyan-200 text-xs flex items-center justify-between shadow-lg shadow-cyan-950/50 animate-bounce">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu + Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-base lg:text-lg font-bold text-white flex items-center gap-2">
              <span>{getGreeting()}</span>
              <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 font-normal">
                Final-Year MTech DS
              </span>
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span className="text-emerald-400 font-medium">🎯 Goal:</span> Placement & Technical Mastery by Jan 2027
            </p>
          </div>
        </div>

        {/* Right Side: Sprint Date Selector + Indian Clock + Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Simulated Sprint Date Switcher */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300">
            <CalendarIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline text-slate-400 text-[11px]">Sprint Date:</span>
            <select
              value={currentSimulatedDate}
              onChange={(e) => setCurrentSimulatedDate(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="2026-09-27" className="bg-slate-900 text-white">2026-09-27 (Sprint Day 1)</option>
              <option value="2026-09-28" className="bg-slate-900 text-white">2026-09-28 (Monday Classes)</option>
              <option value="2026-10-02" className="bg-slate-900 text-white">2026-10-02 (PW Eve)</option>
              <option value="2026-10-03" className="bg-slate-900 text-white">2026-10-03 (PW Exam Day)</option>
              <option value="2026-10-05" className="bg-slate-900 text-white">2026-10-05 (Course Exam 1)</option>
              <option value="2026-10-07" className="bg-slate-900 text-white">2026-10-07 (Course Exam 2)</option>
              <option value="2026-10-12" className="bg-slate-900 text-white">2026-10-12 (L&T Exam Day)</option>
              <option value="2026-10-16" className="bg-slate-900 text-white">2026-10-16 (MOOC Exam Day)</option>
              <option value="2026-11-27" className="bg-slate-900 text-white">2026-11-27 (Project Defense)</option>
              <option value="2027-01-31" className="bg-slate-900 text-white">2027-01-31 (Placements Goal)</option>
            </select>
          </div>

          {/* Time (Asia/Kolkata) */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentTimeStr || '01:34:41 AM'} IST</span>
          </div>

          {/* Quick Focus Pomodoro Start */}
          {!activeTimer.isRunning && (
            <button
              onClick={() => startTimer(25, 'Placement', 'Quick Focus Sprint')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/40 text-xs font-semibold transition-all hover:scale-105"
            >
              <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
              <span>25m Focus</span>
            </button>
          )}

          {/* Quick Add Task Button */}
          {onOpenNewTaskModal && (
            <button
              onClick={onOpenNewTaskModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Task</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
