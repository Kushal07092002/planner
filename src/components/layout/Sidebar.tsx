'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  Calendar,
  Target,
  Briefcase,
  Brain,
  BarChart3,
  Code2,
  Rocket,
  Video,
  Flame,
  Timer,
  TrendingUp,
  Settings,
  Sparkles,
  BookOpenCheck,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' },
  { name: 'Today', icon: CalendarCheck, route: '/today' },
  { name: 'Calendar', icon: Calendar, route: '/calendar' },
  { name: 'Missions', icon: Target, route: '/missions' },
  { name: 'Placements', icon: Briefcase, route: '/placements' },
  { name: 'DSA', icon: Brain, route: '/dsa' },
  { name: 'Data Science', icon: BarChart3, route: '/data-science' },
  { name: 'Web Development', icon: Code2, route: '/web-development' },
  { name: 'Major Project', icon: Rocket, route: '/project' },
  { name: 'Client Work', icon: Video, route: '/client-work' },
  { name: 'Habits', icon: Flame, route: '/habits' },
  { name: 'Time Tracker', icon: Timer, route: '/time-tracker' },
  { name: 'Analytics', icon: TrendingUp, route: '/analytics' },
  { name: 'Settings', icon: Settings, route: '/settings' },
];

export const Sidebar: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({
  isOpen = true,
  onClose,
}) => {
  const pathname = usePathname();
  const { currentSimulatedDate, phaseInfo, activeTimer, theme, toggleTheme } = useApp();

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white/95 dark:bg-[#0c0c0e]/95 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800/80 flex flex-col transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-9 h-9 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-white dark:text-zinc-900" />
          </div>
          <div>
            <span className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-white block">
              Placement OS
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
              Command Center
            </span>
          </div>
        </Link>
      </div>

      {/* Active Sprint Minimal Status Card */}
      <div className="mx-3 my-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 text-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            October Sprint
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">
            {phaseInfo.daysRemainingInPhase}d left
          </span>
        </div>
        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium truncate">
          {phaseInfo.nextCriticalMilestone}
        </p>
      </div>

      {/* Active Timer Pill if running */}
      {activeTimer.isRunning && (
        <Link
          href="/time-tracker"
          onClick={onClose}
          className="mx-3 mb-2 p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 flex items-center justify-between hover:opacity-90 transition-opacity"
        >
          <div className="flex items-center gap-2">
            <Timer className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-spin" />
            <span className="text-[11px] text-blue-700 dark:text-blue-300 font-mono font-medium">
              {Math.floor(activeTimer.secondsRemaining / 60)}:
              {(activeTimer.secondsRemaining % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium truncate max-w-[80px]">
            {activeTimer.category}
          </span>
        </Link>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-1 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.route;
          return (
            <Link
              key={item.route}
              href={item.route}
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'
                  }`}
                />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Evening Review CTA & Theme Switcher */}
      <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-2">
        <Link
          href="/daily-review"
          onClick={onClose}
          className="flex items-center justify-between w-full p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-all text-xs font-medium group"
        >
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>Daily Evening Review</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-zinc-400" />
        </Link>
      </div>
    </aside>
  );
};
