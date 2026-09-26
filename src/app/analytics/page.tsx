'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Brain,
  Rocket,
  Award,
  Calendar,
  Clock,
  Target,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useApp } from '@/context/AppContext';

export default function AnalyticsPage() {
  const {
    tasks,
    timeSessions,
    dsaProblems,
    dsTopics,
    webDevTopics,
    projectMilestones,
    habits,
  } = useApp();

  // 1. Weekly Study Hours Data (Target vs Actual)
  const weeklyStudyData = [
    { day: 'Mon', actual: 4.5, target: 5.0, dsa: 2.0, project: 1.5, other: 1.0 },
    { day: 'Tue', actual: 5.0, target: 5.0, dsa: 2.0, project: 1.5, other: 1.5 },
    { day: 'Wed', actual: 4.0, target: 5.0, dsa: 1.5, project: 1.5, other: 1.0 },
    { day: 'Thu', actual: 5.5, target: 5.0, dsa: 2.0, project: 2.0, other: 1.5 },
    { day: 'Fri', actual: 4.8, target: 5.0, dsa: 2.0, project: 1.5, other: 1.3 },
    { day: 'Sat', actual: 6.0, target: 6.0, dsa: 2.5, project: 2.0, other: 1.5 },
    { day: 'Sun', actual: 5.2, target: 5.5, dsa: 2.0, project: 1.5, other: 1.7 },
  ];

  // 2. Subject Time Distribution Donut
  const subjectDistributionData = [
    { name: 'DSA Mastery', value: 14.0, color: '#06b6d4' },
    { name: 'Major Project', value: 11.5, color: '#a855f7' },
    { name: 'Placement Sprint', value: 9.0, color: '#f59e0b' },
    { name: 'Data Science', value: 7.5, color: '#3b82f6' },
    { name: 'Web Dev', value: 4.5, color: '#10b981' },
    { name: 'Client Work', value: 3.5, color: '#eab308' },
  ];

  // 3. DSA Cumulative Solved Trend
  const dsaProgressData = [
    { week: 'W1', solved: 4, target: 4 },
    { week: 'W2', solved: 10, target: 10 },
    { week: 'W3', solved: 18, target: 16 },
    { week: 'W4 (Current)', solved: 26, target: 24 },
    { week: 'W6 (Oct Mid)', solved: 42, target: 40 },
    { week: 'W10 (Nov)', solved: 80, target: 80 },
    { week: 'W18 (Jan 2027)', solved: 150, target: 150 },
  ];

  // 4. Planned vs Actual Hours by Category
  const plannedVsActualData = [
    { category: 'DSA', planned: 14, actual: 14.5 },
    { category: 'Data Science', planned: 10.5, actual: 9.0 },
    { category: 'Web Dev', planned: 7.0, actual: 6.5 },
    { category: 'Major Project', planned: 12.0, actual: 11.5 },
    { category: 'Placement', planned: 10.0, actual: 11.0 },
  ];

  // Overall Task Completion
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // Habit Consistency Average
  const averageStreak = Math.round(
    habits.reduce((acc, h) => acc + h.streak, 0) / habits.length
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Performance Analytics & Intelligence</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Study Velocity, Habit Consistency & Goal Trajectory Modeling
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Overall Completion Rate</span>
          <span className="text-xl font-black text-emerald-400">{taskCompletionRate}%</span>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Weekly Study Total</span>
          <span className="text-2xl font-black text-cyan-400">35.0h</span>
          <span className="text-[10px] text-emerald-400 block mt-0.5">100% on target pace</span>
        </div>
        <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30">
          <span className="text-[10px] text-purple-400 uppercase font-bold block">Project Velocity</span>
          <span className="text-2xl font-black text-purple-400">11.5h/wk</span>
          <span className="text-[10px] text-purple-300 block mt-0.5">Nov 27 Defense Target</span>
        </div>
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
          <span className="text-[10px] text-amber-400 uppercase font-bold block">Avg Habit Streak</span>
          <span className="text-2xl font-black text-amber-400">{averageStreak} Days</span>
          <span className="text-[10px] text-amber-300 block mt-0.5">Consistency High</span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
          <span className="text-[10px] text-emerald-400 uppercase font-bold block">DSA Solved Rate</span>
          <span className="text-2xl font-black text-emerald-400">2.2 / day</span>
          <span className="text-[10px] text-emerald-300 block mt-0.5">Target: 2 problems/day</span>
        </div>
      </div>

      {/* Chart 1 & Chart 2: Weekly Hours + Subject Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Hours Bar Chart */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Weekly Study Hours (Actual vs Target)</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Hours / Day</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyStudyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="actual" name="Actual Hours" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                <Bar dataKey="target" name="Target Hours" fill="#334155" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Distribution Donut Chart */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-purple-400" />
              <span>Subject Time Distribution (Hours / Week)</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Total: 50h</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {subjectDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#090d16" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart 3 & Chart 4: DSA Line Curve + Planned vs Actual */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* DSA Trajectory */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span>DSA Problem Solving Trajectory (Jan 2027 Curve)</span>
            </h3>
            <span className="text-xs text-cyan-400 font-mono">Target: 150 Problems</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dsaProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="solved"
                  name="Cumulative Solved"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#06b6d4' }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Scheduled Trajectory"
                  stroke="#6366f1"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Planned vs Actual by Pillar */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Planned vs. Actual Hours by Subject</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Weekly Allocation</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={plannedVsActualData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="category" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="planned" name="Planned Target Hours" fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual Logged Hours" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
