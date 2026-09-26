'use client';

import React from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Plus,
  Play,
  Flame,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Task } from '@/types';

export const TodayPreview: React.FC<{ onOpenNewTaskModal?: () => void }> = ({
  onOpenNewTaskModal,
}) => {
  const { tasks, toggleTaskComplete, currentSimulatedDate, startTimer } = useApp();

  const todaysTasks = tasks.filter((t) => t.dueDate === currentSimulatedDate);
  const top3Tasks = todaysTasks.filter((t) => t.isPriorityTop3);
  const otherTasks = todaysTasks.filter((t) => !t.isPriorityTop3);

  const getPriorityBadge = (p: string) => {
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

  const renderTaskItem = (task: Task) => {
    const isCompleted = task.status === 'completed';

    return (
      <div
        key={task.id}
        className={`group p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
          isCompleted
            ? 'bg-zinc-50/50 dark:bg-zinc-900/20 border-zinc-200/60 dark:border-zinc-800/40 opacity-60'
            : 'bg-zinc-50/80 dark:bg-zinc-900/40 border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700'
        }`}
      >
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => toggleTaskComplete(task.id)}
            className="mt-0.5 text-zinc-400 hover:text-emerald-500 transition-colors"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
            ) : (
              <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-300" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-xs font-semibold ${isCompleted ? 'line-through text-zinc-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                {task.title}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-medium">
                {task.category}
              </span>
              {getPriorityBadge(task.priority)}
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-400" />
                {task.estimatedMinutes}m
              </span>
              {task.notes && (
                <span className="text-zinc-400 italic truncate max-w-[200px]">
                  &bull; {task.notes}
                </span>
              )}
            </div>
          </div>
        </div>

        {!isCompleted && (
          <button
            onClick={() => startTimer(task.estimatedMinutes || 25, task.category, task.title)}
            className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all flex-shrink-0"
            title="Start focus timer on this task"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="p-5 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Today&apos;s Mission List</h3>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {todaysTasks.filter((t) => t.status === 'completed').length} of {todaysTasks.length} completed
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenNewTaskModal && (
            <button
              onClick={onOpenNewTaskModal}
              className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
              title="Add Task"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
          <Link
            href="/today"
            className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:underline"
          >
            Open War Room <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Top 3 Priorities Section */}
      {top3Tasks.length > 0 && (
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
            Top 3 Priorities
          </span>
          <div className="space-y-2">
            {top3Tasks.map((task) => renderTaskItem(task))}
          </div>
        </div>
      )}

      {/* Other Tasks for Today */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
          Remaining Mission Targets ({otherTasks.length})
        </span>
        {otherTasks.length === 0 && top3Tasks.length === 0 ? (
          <div className="p-6 text-center text-zinc-400 text-xs rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800">
            No scheduled tasks for this date. Click &quot;Add Task&quot; above to create one.
          </div>
        ) : (
          <div className="space-y-2">
            {otherTasks.map((task) => renderTaskItem(task))}
          </div>
        )}
      </div>
    </div>
  );
};
