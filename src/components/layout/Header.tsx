'use client';

import React, { useState, useEffect } from 'react';
import {
  Menu,
  Clock,
  Calendar as CalendarIcon,
  Plus,
  Play,
  CheckCircle,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Header: React.FC<{ onMenuToggle?: () => void; onOpenNewTaskModal?: () => void }> = ({
  onMenuToggle,
  onOpenNewTaskModal,
}) => {
  const {
    theme,
    toggleTheme,
    currentSimulatedDate,
    setCurrentSimulatedDate,
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

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 lg:px-6 py-2.5 transition-colors">
      {/* Toast Notification */}
      {notification && (
        <div className="mb-2 p-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs flex items-center justify-between shadow-lg shadow-black/10 animate-fade">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
            <span className="font-medium">{notification}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu + Apple Clean Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div>
            <h1 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
              <span>Good Morning, Kushal</span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                MTech Data Science
              </span>
            </h1>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Placement & Skill Mastery Engine &bull; Target Jan 2027
            </p>
          </div>
        </div>

        {/* Right: Date Switcher + Light/Dark Toggle + Quick Action */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Sprint Date Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
            <CalendarIcon className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden md:inline text-[11px] text-zinc-400">Sprint Date:</span>
            <select
              value={currentSimulatedDate}
              onChange={(e) => setCurrentSimulatedDate(e.target.value)}
              className="bg-transparent text-zinc-900 dark:text-zinc-100 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="2026-09-27" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">2026-09-27 (Sprint Start)</option>
              <option value="2026-09-28" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">2026-09-28 (Monday Classes)</option>
              <option value="2026-10-02" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">2026-10-02 (PW Eve)</option>
              <option value="2026-10-03" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">2026-10-03 (PW Exam Day)</option>
              <option value="2026-10-05" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">2026-10-05 (Course Exam 1)</option>
              <option value="2026-10-07" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">2026-10-07 (Course Exam 2)</option>
              <option value="2026-10-12" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">2026-10-12 (L&T Exam Day)</option>
              <option value="2026-10-16" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">2026-10-16 (MOOC Exam Day)</option>
              <option value="2026-11-27" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">2026-11-27 (Project Defense)</option>
              <option value="2027-01-31" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">2027-01-31 (Placements Ready)</option>
            </select>
          </div>

          {/* Time (Asia/Kolkata) */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{currentTimeStr || '01:34 AM'} IST</span>
          </div>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>

          {/* Quick Focus Button */}
          {!activeTimer.isRunning && (
            <button
              onClick={() => startTimer(25, 'Placement', 'Focus Session')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-xs font-medium transition-all"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>25m Focus</span>
            </button>
          )}

          {/* Add Task Button */}
          {onOpenNewTaskModal && (
            <button
              onClick={onOpenNewTaskModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-semibold shadow-sm transition-all"
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
