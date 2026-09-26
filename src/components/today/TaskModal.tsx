'use client';

import React, { useState } from 'react';
import { X, Check, Calendar, Clock, Tag, AlertCircle } from 'lucide-react';
import { Task, TaskCategory, PriorityLevel } from '@/types';
import { useApp } from '@/context/AppContext';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTask?: Task | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  initialTask,
}) => {
  const { addTask, updateTask, currentSimulatedDate } = useApp();

  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [category, setCategory] = useState<TaskCategory>(initialTask?.category || 'Placement');
  const [priority, setPriority] = useState<PriorityLevel>(initialTask?.priority || 'high');
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || currentSimulatedDate);
  const [estimatedMinutes, setEstimatedMinutes] = useState(initialTask?.estimatedMinutes || 45);
  const [notes, setNotes] = useState(initialTask?.notes || '');
  const [isPriorityTop3, setIsPriorityTop3] = useState(initialTask?.isPriorityTop3 || false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (initialTask) {
      updateTask(initialTask.id, {
        title,
        description,
        category,
        priority,
        dueDate,
        estimatedMinutes: Number(estimatedMinutes),
        notes,
        isPriorityTop3,
      });
    } else {
      addTask({
        title,
        description,
        category,
        priority,
        status: 'todo',
        dueDate,
        estimatedMinutes: Number(estimatedMinutes),
        actualMinutes: 0,
        notes,
        isPriorityTop3,
      });
    }
    onClose();
  };

  const categories: TaskCategory[] = [
    'Placement',
    'DSA',
    'Data Science',
    'Web Development',
    'Major Project',
    'Client Work',
    'Academic',
    'Health & Fitness',
    'General',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-[#0f172a] border border-slate-700/80 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5 text-cyan-400" />
          <span>{initialTask ? 'Edit Mission Task' : 'Add New Task / Goal'}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Physics Wallah: Solve 30 Thermodynamics Questions"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 text-sm"
              >
                <option value="critical">🔴 Critical (Must do today)</option>
                <option value="high">🟠 High Priority</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Estimated Minutes
              </label>
              <input
                type="number"
                min="5"
                step="5"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Description / Action Steps
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key sub-topics or execution notes..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
            />
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <input
              type="checkbox"
              id="top3"
              checked={isPriorityTop3}
              onChange={(e) => setIsPriorityTop3(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-500 focus:ring-0 focus:outline-none cursor-pointer"
            />
            <label htmlFor="top3" className="text-xs text-slate-300 cursor-pointer font-medium">
              Mark as one of Today&apos;s <span className="text-cyan-400 font-bold">Top 3 Priorities</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20"
            >
              {initialTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
