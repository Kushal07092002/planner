'use client';

import React from 'react';
import { Clock, BookOpen, Dumbbell, Activity, ShieldAlert, Video, Award } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const DailyScheduleTimeline: React.FC = () => {
  const { currentSimulatedDate, calendarEvents, exams, clientProjects } = useApp();

  const [year, month, day] = currentSimulatedDate.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  const dayIndex = d.getDay(); // 0 = Sun, 1 = Mon ...

  const isMon = dayIndex === 1;
  const isTue = dayIndex === 2;
  const isWed = dayIndex === 3;
  const isThu = dayIndex === 4;
  const isFri = dayIndex === 5;
  const isSat = dayIndex === 6;
  const isSun = dayIndex === 0;

  // Build today's time blocks
  const blocks = [
    {
      time: '07:30 - 08:30 AM',
      title: 'Morning Routine & Placement Fast-Revision',
      type: 'routine',
      category: 'Placement Prep',
      icon: Clock,
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300',
    },
    ...(isMon || isTue || isWed || isFri
      ? [
          {
            time: '09:00 - 11:00 AM',
            title: 'MTech Department Classes (Fixed Commitment)',
            type: 'class',
            category: 'Academic',
            icon: BookOpen,
            color: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
          },
        ]
      : []),
    {
      time: '11:15 - 01:15 PM',
      title: 'DSA 2-Hour Deep Focus Session (LeetCode / Striver)',
      type: 'study',
      category: 'DSA 2027',
      icon: Clock,
      color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300',
    },
    {
      time: '02:00 - 03:30 PM',
      title: 'Major Semester Project Implementation Block',
      type: 'project',
      category: 'Major Project',
      icon: Award,
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-300',
    },
    {
      time: '03:45 - 05:15 PM',
      title: 'CodeWithHarry Data Science & ML Lab',
      type: 'study',
      category: 'Data Science',
      icon: Clock,
      color: 'border-blue-500/40 bg-blue-950/20 text-blue-300',
    },
    ...(isMon || isTue || isThu || isFri
      ? [
          {
            time: '05:30 - 07:30 PM',
            title: 'Gym Strength & Conditioning Session (Fixed)',
            type: 'health',
            category: 'Fitness',
            icon: Dumbbell,
            color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
          },
        ]
      : isSat || isSun
      ? [
          {
            time: '04:00 - 06:30 PM',
            title: 'Cricket Match Practice at University Ground (Fixed)',
            type: 'health',
            category: 'Sports',
            icon: Activity,
            color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
          },
        ]
      : []),
    {
      time: '08:15 - 09:15 PM',
      title: 'Web Dev & Full-Stack Revision / Client Editing',
      type: 'study',
      category: 'Web Dev / Client',
      icon: Video,
      color: 'border-slate-600 bg-slate-900/50 text-slate-300',
    },
    {
      time: '09:30 - 11:00 PM',
      title: 'Sprint Exam Targeted Practice (PW / L&T / Course Exam)',
      type: 'placement',
      category: 'Sprint Priority',
      icon: ShieldAlert,
      color: 'border-rose-500/40 bg-rose-950/20 text-rose-300',
    },
    {
      time: '11:00 - 11:30 PM',
      title: 'Daily Evening Review & Tomorrow Planning',
      type: 'review',
      category: 'Review',
      icon: Clock,
      color: 'border-indigo-500/40 bg-indigo-950/30 text-indigo-300',
    },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Today&apos;s Schedule Matrix ({d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })})</span>
        </h3>
        <span className="text-[11px] text-slate-400">Time-blocked for peak energy</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {blocks.slice(0, 8).map((block, idx) => {
          const Icon = block.icon;
          return (
            <div
              key={idx}
              className={`p-3 rounded-2xl border ${block.color} flex flex-col justify-between transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span>{block.time}</span>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-bold leading-snug">{block.title}</h4>
              <span className="text-[10px] mt-2 font-semibold uppercase tracking-wider opacity-80">
                {block.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
