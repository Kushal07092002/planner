'use client';

import React, { useState } from 'react';
import {
  Rocket,
  Plus,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  Kanban,
  Edit2,
  Trash2,
  X,
  Play,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ProjectTask, ProjectTaskStatus, PriorityLevel } from '@/types';
import { formatDate, getDaysDifference } from '@/lib/utils';

export default function ProjectPage() {
  const {
    projectTasks,
    projectMilestones,
    addProjectTask,
    updateProjectTask,
    deleteProjectTask,
    updateMilestone,
    startTimer,
    currentSimulatedDate,
  } = useApp();

  const [activeView, setActiveView] = useState<'kanban' | 'milestones'>('kanban');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ProjectTask | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('critical');
  const [deadline, setDeadline] = useState('2026-11-27');
  const [estimatedHours, setEstimatedHours] = useState(6);
  const [status, setStatus] = useState<ProjectTaskStatus>('To Do');
  const [notes, setNotes] = useState('');

  const daysLeft = getDaysDifference('2026-11-27', currentSimulatedDate);
  const totalTasks = projectTasks.length;
  const completedTasks = projectTasks.filter((t) => t.status === 'Completed').length;
  const totalHoursSpent = projectTasks.reduce((acc, t) => acc + (t.actualHours || 0), 0);
  const completedMilestones = projectMilestones.filter((m) => m.status === 'Completed').length;
  const overallMilestonePercent = Math.round((completedMilestones / projectMilestones.length) * 100);

  // Warning check: if less than 45 days left and milestone < 40%, trigger warning
  const isBehindSchedule = daysLeft < 60 && overallMilestonePercent < 30;

  const columns: ProjectTaskStatus[] = [
    'Backlog',
    'To Do',
    'In Progress',
    'Testing',
    'Documentation',
    'Completed',
  ];

  const handleOpenModal = (t?: ProjectTask) => {
    if (t) {
      setEditingTask(t);
      setTitle(t.title);
      setDescription(t.description || '');
      setPriority(t.priority);
      setDeadline(t.deadline || '2026-11-27');
      setEstimatedHours(t.estimatedHours || 6);
      setStatus(t.status);
      setNotes(t.notes || '');
    } else {
      setEditingTask(null);
      setTitle('');
      setDescription('');
      setPriority('critical');
      setDeadline('2026-11-27');
      setEstimatedHours(6);
      setStatus('To Do');
      setNotes('');
    }
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    if (editingTask) {
      updateProjectTask(editingTask.id, {
        title,
        description,
        priority,
        deadline,
        estimatedHours: Number(estimatedHours),
        status,
        notes,
      });
    } else {
      addProjectTask({
        title,
        description,
        priority,
        deadline,
        estimatedHours: Number(estimatedHours),
        actualHours: 0,
        status,
        notes,
      });
    }
    setIsTaskModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-purple-400">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Major Semester Project</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              2-Month Hard Deadline: <span className="text-purple-300 font-bold">November 27, 2026</span> &bull; {daysLeft} Days Remaining
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-2xl bg-slate-950 border border-slate-800 p-1">
            <button
              onClick={() => setActiveView('kanban')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeView === 'kanban'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📋 Kanban Board
            </button>
            <button
              onClick={() => setActiveView('milestones')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeView === 'milestones'
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🚩 10 Milestones
            </button>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Warning Alert Banner if schedule is tight */}
      {isBehindSchedule && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 animate-pulse">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-300">Project Velocity Warning</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Only {daysLeft} days remaining until final presentation deadline! Daily contribution of minimum 1.5 - 2.0 hours is required to complete dataset curation and baseline training on time.
            </p>
          </div>
        </div>
      )}

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Overall Milestone Progress</span>
          <span className="text-2xl font-black text-white">{overallMilestonePercent}%</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            {completedMilestones} of {projectMilestones.length} milestones
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30">
          <span className="text-[10px] text-purple-400 uppercase font-bold block">Days Until Defense</span>
          <span className="text-2xl font-black text-purple-400">{daysLeft} Days</span>
          <span className="text-[10px] text-purple-500/80 block mt-0.5">Due Nov 27, 2026</span>
        </div>
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
          <span className="text-[10px] text-cyan-400 uppercase font-bold block">Tasks Done</span>
          <span className="text-2xl font-black text-cyan-400">{completedTasks}/{totalTasks}</span>
          <span className="text-[10px] text-cyan-500/80 block mt-0.5">Sprint Tasks</span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
          <span className="text-[10px] text-emerald-400 uppercase font-bold block">Hours Logged</span>
          <span className="text-2xl font-black text-emerald-400">{totalHoursSpent}h</span>
          <span className="text-[10px] text-emerald-500/80 block mt-0.5">Development Time</span>
        </div>
      </div>

      {/* VIEW 1: Kanban Board */}
      {activeView === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3 overflow-x-auto pb-4">
          {columns.map((col) => {
            const colTasks = projectTasks.filter((t) => t.status === col);

            return (
              <div
                key={col}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between min-h-[420px]"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">{col}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono font-bold">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 rounded-xl bg-slate-950/80 border border-slate-700/80 hover:border-purple-500/50 transition-all shadow-md group space-y-2"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-white leading-snug">{task.title}</h4>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                              task.priority === 'critical'
                                ? 'bg-rose-500/20 text-rose-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        {task.description && (
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {task.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                          <span className="font-mono">{task.estimatedHours}h est</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenModal(task)}
                              className="p-1 hover:text-white"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => deleteProjectTask(task.id)}
                              className="p-1 hover:text-rose-400"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Status Mover Buttons */}
                        <div className="pt-1 flex items-center justify-between text-[10px]">
                          <select
                            value={task.status}
                            onChange={(e) => updateProjectTask(task.id, { status: e.target.value as ProjectTaskStatus })}
                            className="bg-slate-900 border border-slate-700 text-slate-300 text-[10px] rounded px-1.5 py-0.5 focus:outline-none"
                          >
                            {columns.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setStatus(col);
                    handleOpenModal();
                  }}
                  className="mt-3 p-1.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-all border border-dashed border-slate-700"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Task
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: 10 Milestones Roadmap */}
      {activeView === 'milestones' && (
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Project Milestones Timeline (10 Phases)</h3>
            <span className="text-xs text-purple-400 font-mono">
              Completion: {overallMilestonePercent}%
            </span>
          </div>

          <div className="space-y-3">
            {projectMilestones.map((m) => {
              const isDone = m.status === 'Completed';
              const isInProgress = m.status === 'In Progress';

              return (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isDone
                      ? 'bg-slate-900/40 border-emerald-500/30'
                      : isInProgress
                      ? 'bg-purple-950/20 border-purple-500/40 shadow-lg ring-1 ring-purple-500/30'
                      : 'bg-slate-950/40 border-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                      M{m.order}
                    </span>
                    <div>
                      <h4 className={`text-sm font-bold ${isDone ? 'text-emerald-300' : 'text-white'}`}>
                        {m.title}
                      </h4>
                      {m.description && (
                        <p className="text-xs text-slate-400 mt-0.5">{m.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs font-mono text-slate-400">
                      Target: {formatDate(m.targetDate)}
                    </span>
                    <select
                      value={m.status}
                      onChange={(e) => updateMilestone(m.id, { status: e.target.value as any })}
                      className="bg-slate-900 border border-slate-700 text-xs rounded-xl px-2.5 py-1 text-white focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#0f172a] border border-slate-700 shadow-2xl p-6 relative">
            <button
              onClick={() => setIsTaskModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-purple-400" />
              <span>{editingTask ? 'Edit Project Task' : 'Add Project Task'}</span>
            </h2>

            <form onSubmit={handleSaveTask} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Implement Transformer Embedding Layer"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Technical details..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Status Column
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectTaskStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  >
                    {columns.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Estimated Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
