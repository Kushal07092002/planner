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
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, route: '/dashboard', badge: 'Core' },
  { name: 'Today', icon: CalendarCheck, route: '/today', badge: 'Daily' },
  { name: 'Calendar', icon: Calendar, route: '/calendar' },
  { name: 'Missions', icon: Target, route: '/missions', badge: 'Sprint' },
  { name: 'Placements', icon: Briefcase, route: '/placements' },
  { name: 'DSA', icon: Brain, route: '/dsa', badge: '2027' },
  { name: 'Data Science', icon: BarChart3, route: '/data-science' },
  { name: 'Web Development', icon: Code2, route: '/web-development' },
  { name: 'Major Project', icon: Rocket, route: '/project', badge: 'Critical' },
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
  const { currentSimulatedDate, phaseInfo, activeTimer } = useApp();

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#0c1220]/95 backdrop-blur-xl border-r border-slate-800/80 flex flex-col transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/60 flex items-center justify-between">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-bold text-base tracking-wide bg-gradient-to-r from-cyan-300 via-indigo-200 to-white bg-clip-text text-transparent block">
              Placement OS
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Command Center
            </span>
          </div>
        </Link>
      </div>

      {/* Active Sprint Indicator Widget */}
      <div className="mx-3 my-3 p-2.5 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-900/60 to-slate-900/80 border border-amber-500/30 text-xs">
        <div className="flex items-center justify-between text-amber-400 font-medium mb-1">
          <span className="flex items-center gap-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Active Sprint
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
            {phaseInfo.daysRemainingInPhase}d left
          </span>
        </div>
        <p className="text-[11px] text-slate-300 font-medium truncate">
          {phaseInfo.nextCriticalMilestone}
        </p>
        <p className="text-[10px] text-slate-400 truncate mt-0.5">
          Sprint Date: {currentSimulatedDate}
        </p>
      </div>

      {/* Active Timer Indicator if running */}
      {activeTimer.isRunning && (
        <Link
          href="/time-tracker"
          onClick={onClose}
          className="mx-3 mb-2 p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-between hover:bg-cyan-900/30 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Timer className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span className="text-[11px] text-cyan-300 font-mono">
              {Math.floor(activeTimer.secondsRemaining / 60)}:
              {(activeTimer.secondsRemaining % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] text-cyan-400 font-semibold truncate max-w-[80px]">
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
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${
                    isActive
                      ? 'bg-cyan-500/30 text-cyan-200'
                      : item.badge === 'Critical'
                      ? 'bg-rose-500/20 text-rose-300'
                      : item.badge === 'Sprint'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Evening Review Quick CTA */}
      <div className="p-3 border-t border-slate-800/60 bg-[#080d17]">
        <Link
          href="/daily-review"
          onClick={onClose}
          className="flex items-center justify-between w-full p-2 rounded-lg bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 text-indigo-300 hover:text-white hover:border-indigo-400 transition-all text-xs font-medium group"
        >
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Daily Evening Review</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </aside>
  );
};
