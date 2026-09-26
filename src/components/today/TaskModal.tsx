'use client';

import React, { useState } from 'react';
import { X, Tag } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-base font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
          <Tag className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          <span>{initialTask ? 'Edit Task' : 'Add New Task'}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Physics Wallah: Solve 30 Thermodynamics Questions"
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="critical">Critical (Must do today)</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                Estimated Minutes
              </label>
              <input
                type="number"
                min="5"
                step="5"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
              Description / Action Steps
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key sub-topics or notes..."
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <input
              type="checkbox"
              id="top3"
              checked={isPriorityTop3}
              onChange={(e) => setIsPriorityTop3(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
            />
            <label htmlFor="top3" className="text-xs text-zinc-700 dark:text-zinc-300 font-medium cursor-pointer">
              Mark as one of Today&apos;s Top 3 Priorities
            </label>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold shadow-sm hover:opacity-90"
            >
              {initialTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
