'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Brain,
  Rocket,
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
  const weeklyTarget = 35;

  const cards = [
    {
      title: "Today's Progress",
      value: `${productivityScore}%`,
      subtitle: `${completedTasks.length}/${todaysTasks.length} tasks completed`,
      icon: CheckCircle2,
      badge: productivityScore >= 80 ? 'Target Hit' : 'In Progress',
      badgeColor: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
      href: '/today',
    },
    {
      title: 'Next Deadline',
      value: nextExam ? nextExam.name : 'All Clear',
      subtitle: nextExam ? `${formatDate(nextExam.date)}` : 'No upcoming exam',
      icon: Calendar,
      badge: `${daysToNextExam}d left`,
      badgeColor: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
      href: '/missions',
    },
    {
      title: 'Days Until Exam',
      value: `${daysToNextExam} Days`,
      subtitle: nextExam ? nextExam.type : 'N/A',
      icon: Clock,
      badge: 'Sprint Focus',
      badgeColor: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
      href: '/placements',
    },
    {
      title: 'DSA Streak',
      value: `${dsaStreak} Days`,
      subtitle: '2h Daily Target (Jan 2027)',
      icon: Brain,
      badge: 'Active Streak',
      badgeColor: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
      href: '/dsa',
    },
    {
      title: 'Project Progress',
      value: `${projectPercentage}%`,
      subtitle: `${daysToProjectDeadline}d left (Nov 27)`,
      icon: Rocket,
      badge: '2-Month Sprint',
      badgeColor: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
      href: '/project',
    },
    {
      title: 'Weekly Study',
      value: `${weeklyHours}h`,
      subtitle: `Target: ${weeklyTarget}h / week`,
      icon: TrendingUp,
      badge: `${Math.round((Number(weeklyHours) / weeklyTarget) * 100)}% on pace`,
      badgeColor: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
      href: '/analytics',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-3.5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Link
            key={idx}
            href={card.href}
            className="p-4 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between group"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider truncate max-w-[110px]">
                {card.title}
              </span>
              <div className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400">
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="my-1">
              <div className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight truncate">
                {card.value}
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                {card.subtitle}
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[10px]">
              <span className={`px-2 py-0.5 rounded-full font-medium ${card.badgeColor}`}>
                {card.badge}
              </span>
              <span className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white flex items-center gap-0.5 font-medium transition-colors">
                View <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
