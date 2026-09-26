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
import { Task, PriorityLevel } from '@/types';
import { formatDate } from '@/lib/utils';

export default function TodayPage() {
  const {
    tasks,
    toggleTaskComplete,
    deleteTask,
    rescheduleTask,
    setTop3Priority,
    currentSimulatedDate,
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
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400">Critical</span>;
      case 'high':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">High</span>;
      case 'medium':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400">Medium</span>;
      default:
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Low</span>;
    }
  };

  const renderTaskCard = (task: Task) => {
    const isDone = task.status === 'completed';

    return (
      <div
        key={task.id}
        className={`group p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isDone
            ? 'bg-zinc-50/50 dark:bg-zinc-900/20 border-zinc-200/60 dark:border-zinc-800/40 opacity-60'
            : 'bg-white dark:bg-[#121214] border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm'
        }`}
      >
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => toggleTaskComplete(task.id)}
            className="mt-0.5 text-zinc-400 hover:text-emerald-500 transition-colors"
          >
            {isDone ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
            ) : (
              <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-300" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-xs sm:text-sm font-medium ${isDone ? 'line-through text-zinc-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                {task.title}
              </span>
              {task.isPriorityTop3 && (
                <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-semibold">
                  <Flame className="w-3 h-3 fill-current" /> Top 3
                </span>
              )}
            </div>

            {task.description && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 font-medium text-[11px]">
                {task.category}
              </span>
              {getPriorityBadge(task.priority)}
              <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-500">
                <Clock className="w-3 h-3" />
                {task.estimatedMinutes}m
              </span>
              {task.notes && (
                <span className="text-zinc-400 italic text-[11px] truncate max-w-[200px]">
                  &bull; {task.notes}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100 dark:border-zinc-800">
          {!isDone && (
            <button
              onClick={() => startTimer(task.estimatedMinutes || 25, task.category, task.title)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium flex items-center gap-1 transition-colors"
              title="Start Focus Timer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span className="hidden sm:inline">Focus</span>
            </button>
          )}

          <button
            onClick={() => setTop3Priority(task.id, !task.isPriorityTop3)}
            className={`p-1.5 rounded-xl border transition-colors ${
              task.isPriorityTop3
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                : 'bg-transparent border-transparent text-zinc-400 hover:text-amber-500'
            }`}
            title="Toggle Top 3 Priority"
          >
            <Star className={`w-3.5 h-3.5 ${task.isPriorityTop3 ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => handleEdit(task)}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            title="Edit Task"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setRescheduleTaskId(rescheduleTaskId === task.id ? null : task.id)}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-blue-500"
            title="Reschedule Task"
          >
            <Calendar className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-red-500"
            title="Delete Task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Reschedule inline date picker */}
        {rescheduleTaskId === task.id && (
          <div className="w-full mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
            <span className="text-xs text-zinc-500">Move to:</span>
            <input
              type="date"
              defaultValue={currentSimulatedDate}
              onChange={(e) => setNewDateInput(e.target.value)}
              className="px-2.5 py-1 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
            />
            <button
              onClick={() => handleRescheduleSubmit(task.id)}
              className="px-3 py-1 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            <h1 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
              Daily War Room
            </h1>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Planning Date: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatDate(currentSimulatedDate)}</span> &bull; Asia/Kolkata
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => rolloverUnfinishedTasks()}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 text-xs font-medium flex items-center gap-1.5 transition-all"
            title="Move uncompleted tasks to tomorrow"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
            <span>Rollover Incomplete</span>
          </button>

          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white hover:opacity-90 text-white dark:text-zinc-900 text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* 1. Daily Score & Schedule Grid */}
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
      <div className="p-5 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/60">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Task Checklist & Execution Queue
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {todaysTasks.filter((t) => t.status === 'completed').length} of {todaysTasks.length} tasks completed today
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <Filter className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-medium whitespace-nowrap transition-all capitalize ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 High Priority Tasks */}
        {top3Tasks.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
              Top 3 Priorities
            </span>
            <div className="space-y-2">
              {top3Tasks.map((task) => renderTaskCard(task))}
            </div>
          </div>
        )}

        {/* Remaining Tasks */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
            Scheduled Tasks ({remainingTasks.length})
          </span>
          {remainingTasks.length === 0 && top3Tasks.length === 0 ? (
            <div className="p-8 text-center text-zinc-400 text-xs rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800">
              No tasks found in this category. Click &quot;Add Task&quot; above to create one.
            </div>
          ) : (
            <div className="space-y-2">
              {remainingTasks.map((task) => renderTaskCard(task))}
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
