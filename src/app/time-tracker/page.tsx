'use client';

import React, { useState } from 'react';
import {
  Timer,
  Play,
  Pause,
  Square,
  RotateCcw,
  CheckCircle2,
  Clock,
  Flame,
  Tag,
  Plus,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TaskCategory } from '@/types';
import { formatDate } from '@/lib/utils';

export default function TimeTrackerPage() {
  const {
    activeTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    timeSessions,
    addTimeSession,
    currentSimulatedDate,
  } = useApp();

  const [customTaskTitle, setCustomTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>('Placement');
  const [selectedPreset, setSelectedPreset] = useState<number>(25);

  const categories: TaskCategory[] = [
    'Placement',
    'DSA',
    'Data Science',
    'Web Development',
    'Major Project',
    'Client Work',
  ];

  const presets = [
    { minutes: 25, label: '25m Pomodoro', desc: 'Standard Focus Block' },
    { minutes: 50, label: '50m Deep Work', desc: 'Sustained Problem Solving' },
    { minutes: 90, label: '90m Ultradian Cycle', desc: 'Optimal Cognitive Sprint' },
    { minutes: 120, label: '120m DSA 2h Block', desc: 'Complete 2-Hour Mastery' },
  ];

  const handleStartCustomTimer = (minutes: number) => {
    startTimer(minutes, selectedCategory, customTaskTitle || `${selectedCategory} Focus Block`);
  };

  const minutes = Math.floor(activeTimer.secondsRemaining / 60);
  const seconds = activeTimer.secondsRemaining % 60;
  const progressPercent = activeTimer.totalSeconds > 0
    ? Math.round(((activeTimer.totalSeconds - activeTimer.secondsRemaining) / activeTimer.totalSeconds) * 100)
    : 0;

  const todaysSessions = timeSessions.filter((s) => s.date === currentSimulatedDate);
  const todaysMinutes = todaysSessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <Timer className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Precision Time Tracker</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Pomodoro, Deep Work & Automatic Focus Session Logger
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Logged Today</span>
          <span className="text-xl font-black text-cyan-400 font-mono">
            {(todaysMinutes / 60).toFixed(1)} Hours
          </span>
        </div>
      </div>

      {/* Main Focus Clock Widget */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0c1322] to-slate-950 border border-slate-700/80 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
        {/* Glow flair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            {activeTimer.category}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {activeTimer.taskTitle}
          </span>
        </div>

        {/* Large Digital Clock Display */}
        <div className="text-6xl sm:text-8xl font-black text-white font-mono tracking-tighter drop-shadow-2xl">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        {/* Circular / Linear Progress */}
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-mono">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {!activeTimer.isRunning ? (
            <button
              onClick={() => {
                if (activeTimer.secondsRemaining === 0) {
                  startTimer(selectedPreset, selectedCategory, customTaskTitle);
                } else {
                  resumeTimer();
                }
              }}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{activeTimer.secondsRemaining < activeTimer.totalSeconds ? 'Resume' : 'Start Focus'}</span>
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-xl shadow-amber-500/30 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <Pause className="w-4 h-4 fill-black" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={() => stopTimer(true)}
            className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 font-bold text-sm flex items-center gap-2 transition-all hover:border-rose-500/40"
            title="Complete & Log Session"
          >
            <Square className="w-4 h-4 fill-rose-400" />
            <span>Finish & Log</span>
          </button>
        </div>
      </div>

      {/* Preset Pickers and Category Selector */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
        <h3 className="text-sm font-bold text-white">Start New Timed Session</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              1. Select Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as TaskCategory)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-cyan-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              2. Custom Task Name (Optional)
            </label>
            <input
              type="text"
              value={customTaskTitle}
              onChange={(e) => setCustomTaskTitle(e.target.value)}
              placeholder="e.g. Solving Striver Graph Problems"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* 4 Presets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {presets.map((preset) => (
            <button
              key={preset.minutes}
              onClick={() => {
                setSelectedPreset(preset.minutes);
                handleStartCustomTimer(preset.minutes);
              }}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white group-hover:text-cyan-300">
                  {preset.label}
                </span>
                <Play className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-[11px] text-slate-400">{preset.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Historical Session Logs */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white">Focus Session History</h3>
          <span className="text-xs text-slate-400 font-mono">
            {timeSessions.length} Logged Sessions
          </span>
        </div>

        <div className="space-y-2">
          {timeSessions.map((session) => (
            <div
              key={session.id}
              className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{session.taskTitle}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {session.category}
                    </span>
                    <span>{formatDate(session.date)}</span>
                    <span>&bull; {session.startTime} - {session.endTime}</span>
                  </div>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-sm font-bold text-emerald-400 block">
                  {session.durationMinutes} mins
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
