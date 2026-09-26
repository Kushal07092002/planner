'use client';

import React from 'react';
import Link from 'next/link';
import { Timer, ArrowRight, ShieldAlert, Award, Rocket, Brain } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getDaysDifference, formatDate } from '@/lib/utils';

export const CountdownsRow: React.FC = () => {
  const { currentSimulatedDate } = useApp();

  const countdowns = [
    {
      title: 'Physics Wallah Exam',
      date: '2026-10-03',
      category: 'Placement / Teaching Staff',
      icon: ShieldAlert,
      badge: 'Phase 1 Target',
      href: '/placements',
    },
    {
      title: 'Course Exam 1 & 2',
      date: '2026-10-05',
      category: 'Academic Semester',
      icon: Award,
      badge: 'Exams Active',
      href: '/missions',
    },
    {
      title: 'L&T Placement Exam',
      date: '2026-10-12',
      category: 'Placement Exam',
      icon: Timer,
      badge: 'High Impact',
      href: '/placements',
    },
    {
      title: 'Major Project Defense',
      date: '2026-11-27',
      category: 'Semester Project',
      icon: Rocket,
      badge: 'Hard Deadline',
      href: '/project',
    },
    {
      title: 'DSA Jan 2027 Target',
      date: '2027-01-31',
      category: 'Placement Readiness',
      icon: Brain,
      badge: 'Long-Term Goal',
      href: '/dsa',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Timer className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
          <span>Active Countdown Timelines</span>
        </h3>
        <Link
          href="/calendar"
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-1"
        >
          View Calendar <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {countdowns.map((item, idx) => {
          const Icon = item.icon;
          const daysLeft = getDaysDifference(item.date, currentSimulatedDate);
          const isUrgent = daysLeft <= 7;

          return (
            <Link
              key={idx}
              href={item.href}
              className="p-4 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                    {item.badge}
                  </span>
                  <div className="p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h4 className="font-semibold text-zinc-900 dark:text-white text-xs">
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">{item.category}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-end justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 block">{formatDate(item.date)}</span>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-lg font-bold ${
                        isUrgent ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-900 dark:text-white'
                      }`}
                    >
                      {daysLeft >= 0 ? daysLeft : 0}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-medium">days left</span>
                  </div>
                </div>

                <div className="p-1 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
