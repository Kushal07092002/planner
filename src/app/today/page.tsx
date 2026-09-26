'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  Plus,
  Circle,
  CheckCircle2,
  Clock,
  Flame,
  Star,
  Trash2,
  Edit2,
  Calendar,
  Filter,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DailyScheduleTimeline } from '@/components/today/DailyScheduleTimeline';
import { StudyTargetCards } from '@/components/today/StudyTargetCards';
import { DailyScoreCard } from '@/components/today/DailyScoreCard';
import { TaskModal } from '@/components/today/TaskModal';
import { Task, TaskCategory, PriorityLevel } from '@/types';
import { formatDate } from '@/lib/utils';

export default function TodayPage() {
  const {
    tasks,
    toggleTaskComplete,
    deleteTask,
    rescheduleTask,
    setTop3Priority,
    currentSimulatedDate,
    setCurrentSimulatedDate,
    startTimer,
    rolloverUnfinishedTasks,
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [rescheduleTaskId, setRescheduleTaskId] = useState<string | null>(null);
  const [newDateInput, setNewDateInput] = useState<string>('');

  const todaysTasks = tasks.filter((t) => t.dueDate === currentSimulatedDate);
  const filteredTasks =
    selectedCategory === 'all'
      ? todaysTasks
      : todaysTasks.filter((t) => t.category === selectedCategory);

  const top3Tasks = filteredTasks.filter((t) => t.isPriorityTop3);
  const remainingTasks = filteredTasks.filter((t) => !t.isPriorityTop3);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleRescheduleSubmit = (taskId: string) => {
    if (newDateInput) {
      rescheduleTask(taskId, newDateInput);
      setRescheduleTaskId(null);
      setNewDateInput('');
    }
  };

  const categories: string[] = [
    'all',
    'Placement',
    'DSA',
    'Data Science',
    'Web Development',
    'Major Project',
    'Client Work',
    'Academic',
    'Health & Fitness',
  ];

  const getPriorityBadge = (p: PriorityLevel) => {
    switch (p) {
      case 'critical':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">CRITICAL</span>;
      case 'high':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">HIGH</span>;
      case 'medium':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">MEDIUM</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">LOW</span>;
    }
  };

  const renderTaskCard = (task: Task) => {
    const isDone = task.status === 'completed';

    return (
      <div
        key={task.id}
        className={`group p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isDone
            ? 'bg-slate-900/40 border-slate-800/80 opacity-60'
            : task.isPriorityTop3
            ? 'bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border-indigo-500/40 shadow-lg'
            : 'bg-slate-900/80 border-slate-700/60 hover:border-cyan-500/40'
        }`}
      >
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => toggleTaskComplete(task.id)}
            className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            {isDone ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
            ) : (
              <Circle className="w-5 h-5 text-slate-500 group-hover:text-cyan-400" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-sm font-semibold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                {task.title}
              </span>
              {task.isPriorityTop3 && (
                <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  <Flame className="w-3 h-3 fill-amber-300" /> Top Priority
                </span>
              )}
            </div>

            {task.description && (
              <p className="text-xs text-slate-400 mb-1.5 line-clamp-2">{task.description}</p>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium text-[11px]">
                {task.category}
              </span>
              {getPriorityBadge(task.priority)}
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {task.estimatedMinutes} mins
              </span>
              {task.notes && (
                <span className="text-slate-400 italic text-[11px] truncate max-w-[240px]">
                  &bull; {task.notes}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
          {!isDone && (
            <button
              onClick={() => startTimer(task.estimatedMinutes || 25, task.category, task.title)}
              className="p-2 rounded-xl bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900/60 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1 transition-all"
              title="Start Focus Timer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden md:inline">Focus</span>
            </button>
          )}

          <button
            onClick={() => setTop3Priority(task.id, !task.isPriorityTop3)}
            className={`p-2 rounded-xl border transition-colors ${
              task.isPriorityTop3
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-amber-300'
            }`}
            title="Toggle Top 3 Priority"
          >
            <Star className={`w-3.5 h-3.5 ${task.isPriorityTop3 ? 'fill-amber-300' : ''}`} />
          </button>

          <button
            onClick={() => handleEdit(task)}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Edit Task"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setRescheduleTaskId(rescheduleTaskId === task.id ? null : task.id)}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-cyan-300 transition-colors"
            title="Reschedule Task"
          >
            <Calendar className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Reschedule inline input dropdown */}
        {rescheduleTaskId === task.id && (
          <div className="w-full mt-2 pt-2 border-t border-slate-800 flex items-center gap-2">
            <span className="text-xs text-slate-400">Move to:</span>
            <input
              type="date"
              defaultValue={currentSimulatedDate}
              onChange={(e) => setNewDateInput(e.target.value)}
              className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white"
            />
            <button
              onClick={() => handleRescheduleSubmit(task.id)}
              className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & Date Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white">Daily War Room</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Active Planning Date: <span className="text-cyan-300 font-bold">{formatDate(currentSimulatedDate)}</span> &bull; Asia/Kolkata
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => rolloverUnfinishedTasks()}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Move uncompleted tasks to tomorrow"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Rollover Incomplete</span>
          </button>

          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* 1. Daily Score and Productivity Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <DailyScoreCard />
        </div>
        <div className="lg:col-span-2">
          <DailyScheduleTimeline />
        </div>
      </div>

      {/* 2. Today's Study Target Progress Bars */}
      <StudyTargetCards />

      {/* 3. Task Checklist & Filters */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">Task Checklist & Execution Queue</h2>
            <p className="text-xs text-slate-400">
              {todaysTasks.filter((t) => t.status === 'completed').length} of {todaysTasks.length} tasks completed today
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all capitalize ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 High Priority Tasks */}
        {top3Tasks.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              Top 3 Priorities for Today
            </span>
            <div className="space-y-2.5">
              {top3Tasks.map((t) => renderTaskCard(t))}
            </div>
          </div>
        )}

        {/* Remaining Tasks */}
        <div className="space-y-2.5 pt-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Scheduled Daily Tasks ({remainingTasks.length})
          </span>
          {remainingTasks.length === 0 && top3Tasks.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs rounded-2xl bg-slate-950/40 border border-slate-800">
              No tasks found in this category. Click &quot;Add Task&quot; above to log an action!
            </div>
          ) : (
            <div className="space-y-2.5">
              {remainingTasks.map((t) => renderTaskCard(t))}
            </div>
          )}
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTask={editingTask}
      />
    </div>
  );
}
