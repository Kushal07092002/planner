'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Brain,
  Rocket,
  Flame,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getDaysDifference, formatDate } from '@/lib/utils';
import { calculateDailyProductivityScore } from '@/lib/priorityEngine';

export const TopCards: React.FC = () => {
  const { tasks, exams, projectMilestones, habits, timeSessions, currentSimulatedDate } = useApp();

  // 1. Today's Progress
  const todaysTasks = tasks.filter((t) => t.dueDate === currentSimulatedDate);
  const completedTasks = todaysTasks.filter((t) => t.status === 'completed');
  const productivityScore = calculateDailyProductivityScore(tasks, currentSimulatedDate);

  // 2. Next Deadline
  const upcomingExams = exams
    .filter((e) => e.status === 'upcoming' && e.date >= currentSimulatedDate)
    .sort((a, b) => a.date.localeCompare(b.date));
  const nextExam = upcomingExams[0];
  const daysToNextExam = nextExam ? getDaysDifference(nextExam.date, currentSimulatedDate) : 0;

  // 3. DSA Streak
  const dsaHabit = habits.find((h) => h.id === 'h-1') || habits[0];
  const dsaStreak = dsaHabit?.streak || 24;

  // 4. Project Progress
  const completedMilestones = projectMilestones.filter((m) => m.status === 'Completed').length;
  const projectPercentage = Math.round((completedMilestones / projectMilestones.length) * 100);
  const daysToProjectDeadline = getDaysDifference('2026-11-27', currentSimulatedDate);

  // 5. Weekly Study Hours
  const totalMinutesStudied = timeSessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);
  const weeklyHours = (totalMinutesStudied / 60).toFixed(1);
  const weeklyTarget = 35; // 35h target

  const cards = [
    {
      title: "Today's Progress",
      value: `${productivityScore}%`,
      subtitle: `${completedTasks.length}/${todaysTasks.length} tasks completed`,
      icon: CheckCircle2,
      color: 'from-emerald-500/20 to-emerald-900/10',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      badge: productivityScore >= 80 ? 'Target Hit' : 'In Progress',
      badgeColor: 'bg-emerald-500/20 text-emerald-300',
      href: '/today',
    },
    {
      title: 'Next Critical Deadline',
      value: nextExam ? nextExam.name : 'All Clear',
      subtitle: nextExam ? `${formatDate(nextExam.date)} (${nextExam.type})` : 'No upcoming exam',
      icon: Calendar,
      color: 'from-amber-500/20 to-amber-900/10',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      badge: `${daysToNextExam} days left`,
      badgeColor: 'bg-amber-500/20 text-amber-300 animate-pulse',
      href: '/missions',
    },
    {
      title: 'Days Until Next Exam',
      value: `${daysToNextExam} Days`,
      subtitle: nextExam ? nextExam.name : 'N/A',
      icon: Clock,
      color: 'from-rose-500/20 to-rose-900/10',
      borderColor: 'border-rose-500/30',
      iconColor: 'text-rose-400',
      badge: 'High Focus',
      badgeColor: 'bg-rose-500/20 text-rose-300',
      href: '/placements',
    },
    {
      title: 'DSA Streak',
      value: `${dsaStreak} Days`,
      subtitle: '2h Daily Target (Jan 2027 goal)',
      icon: Brain,
      color: 'from-cyan-500/20 to-cyan-900/10',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
      badge: '🔥 Active Streak',
      badgeColor: 'bg-cyan-500/20 text-cyan-300',
      href: '/dsa',
    },
    {
      title: 'Major Project Progress',
      value: `${projectPercentage}%`,
      subtitle: `${daysToProjectDeadline} days remaining (Nov 27)`,
      icon: Rocket,
      color: 'from-purple-500/20 to-purple-900/10',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      badge: '2-Month Sprint',
      badgeColor: 'bg-purple-500/20 text-purple-300',
      href: '/project',
    },
    {
      title: 'Weekly Study Hours',
      value: `${weeklyHours}h`,
      subtitle: `Target: ${weeklyTarget}h / week`,
      icon: TrendingUp,
      color: 'from-indigo-500/20 to-indigo-900/10',
      borderColor: 'border-indigo-500/30',
      iconColor: 'text-indigo-400',
      badge: `${Math.round((Number(weeklyHours) / weeklyTarget) * 100)}% on pace`,
      badgeColor: 'bg-indigo-500/20 text-indigo-300',
      href: '/analytics',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Link
            key={idx}
            href={card.href}
            className={`group p-4 rounded-2xl bg-gradient-to-br ${card.color} border ${card.borderColor} backdrop-blur-md hover:scale-[1.02] transition-all duration-200 shadow-lg relative overflow-hidden flex flex-col justify-between`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 truncate max-w-[110px]">
                {card.title}
              </span>
              <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>

            <div className="my-1">
              <div className="text-xl font-black text-white tracking-tight truncate">
                {card.value}
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">{card.subtitle}</p>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
              <span className={`px-2 py-0.5 rounded-md font-semibold ${card.badgeColor}`}>
                {card.badge}
              </span>
              <span className="text-slate-400 group-hover:text-cyan-300 flex items-center gap-0.5">
                View <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
