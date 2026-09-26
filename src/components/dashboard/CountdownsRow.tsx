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
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-400',
      badge: 'Critical Phase 1',
      href: '/placements',
    },
    {
      title: 'Course Exam 1 & 2',
      date: '2026-10-05',
      category: 'MTech Academic Exams',
      icon: Award,
      color: 'border-rose-500/40 bg-rose-950/20 text-rose-400',
      badge: 'Semester Exams',
      href: '/missions',
    },
    {
      title: 'L&T Placement Exam',
      date: '2026-10-12',
      category: 'Placement Exam',
      icon: Timer,
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-400',
      badge: 'High Impact',
      href: '/placements',
    },
    {
      title: 'Major Project Defense',
      date: '2026-11-27',
      category: '2-Month Semester Project',
      icon: Rocket,
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-400',
      badge: 'Hard Deadline',
      href: '/project',
    },
    {
      title: 'DSA Jan 2027 Mastery',
      date: '2027-01-31',
      category: 'Placement Readiness Goal',
      icon: Brain,
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400',
      badge: 'Long-Term Pillar',
      href: '/dsa',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Timer className="w-4 h-4 text-cyan-400" />
          <span>Active Countdown Timelines</span>
        </h3>
        <Link
          href="/calendar"
          className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
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
              className={`p-3.5 rounded-2xl border ${item.color} backdrop-blur-md hover:scale-[1.02] transition-all flex flex-col justify-between group shadow-md`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-900/80">
                    {item.badge}
                  </span>
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.category}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-end justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">{formatDate(item.date)}</span>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-xl font-black ${
                        isUrgent ? 'text-amber-400 animate-pulse' : 'text-white'
                      }`}
                    >
                      {daysLeft >= 0 ? daysLeft : 0}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">days left</span>
                  </div>
                </div>

                <div className="p-1 rounded-lg bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-cyan-600 transition-colors">
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
