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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#090d16]/95 backdrop-blur-xl border-t border-slate-800 px-2 py-1.5 flex items-center justify-around">
      {primaryTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.route;
        return (
          <Link
            key={tab.route}
            href={tab.route}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${
              isActive
                ? 'text-cyan-400 font-semibold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};
