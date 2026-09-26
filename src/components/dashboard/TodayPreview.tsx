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
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">CRITICAL</span>;
      case 'high':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">HIGH</span>;
      case 'medium':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">MEDIUM</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">LOW</span>;
    }
  };

  const renderTaskItem = (task: Task) => {
    const isCompleted = task.status === 'completed';

    return (
      <div
        key={task.id}
        className={`group p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
          isCompleted
            ? 'bg-slate-900/40 border-slate-800/80 opacity-60'
            : 'bg-slate-900/80 border-slate-700/60 hover:border-cyan-500/40'
        }`}
      >
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => toggleTaskComplete(task.id)}
            className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
            ) : (
              <Circle className="w-5 h-5 text-slate-500 group-hover:text-cyan-400" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-xs font-semibold ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                {task.title}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 flex-wrap">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                {task.category}
              </span>
              {getPriorityBadge(task.priority)}
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                {task.estimatedMinutes}m
              </span>
              {task.notes && (
                <span className="text-slate-400 italic truncate max-w-[200px]">
                  {task.notes}
                </span>
              )}
            </div>
          </div>
        </div>

        {!isCompleted && (
          <button
            onClick={() => startTimer(task.estimatedMinutes || 25, task.category, task.title)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-900/40 text-slate-400 hover:text-cyan-300 border border-transparent hover:border-cyan-500/30 transition-all flex-shrink-0"
            title="Start focus timer on this task"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-base font-bold text-white">Today&apos;s Mission List</h3>
            <span className="text-xs text-slate-400">
              {todaysTasks.filter((t) => t.status === 'completed').length} of {todaysTasks.length} done
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenNewTaskModal && (
            <button
              onClick={onOpenNewTaskModal}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Add Task"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
          <Link
            href="/today"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30"
          >
            Open War Room <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Top 3 Priorities Section */}
      {top3Tasks.length > 0 && (
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Top 3 High Impact Priorities
          </span>
          <div className="space-y-2">
            {top3Tasks.map((task) => renderTaskItem(task))}
          </div>
        </div>
      )}

      {/* Other Tasks for Today */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Remaining Mission Targets ({otherTasks.length})
        </span>
        {otherTasks.length === 0 && top3Tasks.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs rounded-xl bg-slate-950/40 border border-slate-800">
            No scheduled tasks for this date. Click &quot;Add Task&quot; above to create one!
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
