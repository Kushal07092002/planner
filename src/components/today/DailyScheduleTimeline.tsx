'use client';

import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Check,
  X,
  Lock,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ScheduleBlock } from '@/types';

export const DailyScheduleTimeline: React.FC = () => {
  const {
    scheduleBlocks,
    addScheduleBlock,
    updateScheduleBlock,
    deleteScheduleBlock,
    resetScheduleBlocks,
    currentSimulatedDate,
  } = useApp();

  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);

  // Edit / Add Form State
  const [time, setTime] = useState('11:15 - 01:15 PM');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DSA 2027');

  const [year, month, day] = currentSimulatedDate.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  const dayName = d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const handleStartEdit = (block: ScheduleBlock) => {
    setEditingBlockId(block.id);
    setTime(block.time);
    setTitle(block.title);
    setCategory(block.category);
  };

  const handleSaveEdit = (id: string) => {
    if (!title.trim()) return;
    updateScheduleBlock(id, { time, title, category });
    setEditingBlockId(null);
  };

  const handleAddNewBlock = () => {
    if (!title.trim()) return;
    addScheduleBlock({
      time: time || '12:00 - 01:00 PM',
      title,
      category: category || 'General',
      type: 'custom',
    });
    setTitle('');
    setIsEditingSchedule(false);
  };

  return (
    <div className="p-5 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 shadow-sm transition-all space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/60">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Today&apos;s Schedule Matrix
            </h3>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">
              ({dayName})
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Personalized daily time blocks with custom editing
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditingSchedule(!isEditingSchedule)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
              isEditingSchedule
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-transparent shadow-sm'
                : 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/60 hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditingSchedule ? 'Done Editing' : 'Edit Schedule'}</span>
          </button>

          {isEditingSchedule && (
            <button
              onClick={resetScheduleBlocks}
              className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 transition-colors"
              title="Reset Schedule to Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Add New Block Inline Form when Editing */}
      {isEditingSchedule && (
        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
            Add Custom Time Block
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="e.g. 02:00 - 03:30 PM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Block Title / Target..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Category (e.g. DSA, Project, Gym)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end pt-1">
            <button
              onClick={handleAddNewBlock}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Block to Schedule</span>
            </button>
          </div>
        </div>
      )}

      {/* Grid of Time Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {scheduleBlocks.map((block) => {
          const isCurrentEditing = editingBlockId === block.id;

          if (isCurrentEditing) {
            return (
              <div
                key={block.id}
                className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-blue-500/50 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-[11px] text-zinc-900 dark:text-zinc-100 font-mono"
                  />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                  />
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-[10px] text-zinc-700 dark:text-zinc-300"
                  />
                </div>
                <div className="flex items-center justify-end gap-1.5 pt-1">
                  <button
                    onClick={() => setEditingBlockId(null)}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleSaveEdit(block.id)}
                    className="px-2 py-1 rounded bg-blue-600 text-white text-[10px] font-semibold flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Save
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={block.id}
              className="group p-3.5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1.5">
                  <span className="truncate">{block.time}</span>
                  {block.isFixed && (
                    <span title="Fixed Commitment" className="text-zinc-400 dark:text-zinc-500">
                      <Lock className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {block.title}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold text-zinc-600 dark:text-zinc-400 truncate max-w-[120px]">
                  {block.category}
                </span>

                {isEditingSchedule && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartEdit(block)}
                      className="p-1 rounded text-zinc-400 hover:text-blue-500"
                      title="Edit Block"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    {!block.isFixed && (
                      <button
                        onClick={() => deleteScheduleBlock(block.id)}
                        className="p-1 rounded text-zinc-400 hover:text-red-500"
                        title="Delete Block"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
