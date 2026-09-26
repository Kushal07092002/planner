'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  Target,
  Brain,
  Rocket,
  Timer,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const primaryTabs = [
    { name: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' },
    { name: 'Today', icon: CalendarCheck, route: '/today' },
    { name: 'Missions', icon: Target, route: '/missions' },
    { name: 'DSA', icon: Brain, route: '/dsa' },
    { name: 'Project', icon: Rocket, route: '/project' },
    { name: 'Timer', icon: Timer, route: '/time-tracker' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 px-2 py-1.5 flex items-center justify-around">
      {primaryTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.route;
        return (
          <Link
            key={tab.route}
            href={tab.route}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${
              isActive
                ? 'text-blue-600 dark:text-blue-400 font-semibold scale-105'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px]">{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};
