'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  Play,
  Award,
  Sparkles,
  Filter,
  Check,
  FolderGit2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TopicStatus } from '@/types';

export default function DataSciencePage() {
  const { dsTopics, updateDSTopic, startTimer } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const totalHours = dsTopics.reduce((acc, t) => acc + (t.hoursSpent || 0), 0);
  const completedTopics = dsTopics.filter((t) => t.status === 'Completed').length;
  const learningTopics = dsTopics.filter((t) => t.status === 'Learning' || t.status === 'Practicing').length;
  const totalProjects = dsTopics.reduce((acc, t) => acc + (t.projectsCompleted || 0), 0);

  const statuses: TopicStatus[] = [
    'Not Started',
    'Learning',
    'Practicing',
    'Completed',
    'Needs Revision',
  ];

  const filteredTopics =
    selectedFilter === 'all'
      ? dsTopics
      : dsTopics.filter((t) => t.status === selectedFilter);

  const getStatusColor = (st: TopicStatus) => {
    switch (st) {
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Practicing':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Learning':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Needs Revision':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-950/60 border border-blue-500/40 text-blue-400">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Data Science & ML Track</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              CodeWithHarry Course Syllabus & MTech Advanced Analytics &bull; 1.5h Daily Target
            </p>
          </div>
        </div>

        <button
          onClick={() => startTimer(90, 'Data Science', 'Data Science & ML 90m Lab')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 flex items-center gap-1.5 transition-all"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Start 90m Study Session</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Topics Completed</span>
          <span className="text-2xl font-black text-white">{completedTopics}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">of {dsTopics.length} modules</span>
        </div>
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
          <span className="text-[10px] text-cyan-400 uppercase font-bold block">Currently Active</span>
          <span className="text-2xl font-black text-cyan-400">{learningTopics}</span>
          <span className="text-[10px] text-cyan-500/80 block mt-0.5">In Learning / Lab</span>
        </div>
        <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30">
          <span className="text-[10px] text-blue-400 uppercase font-bold block">Total Hours Logged</span>
          <span className="text-2xl font-black text-blue-400">{totalHours}h</span>
          <span className="text-[10px] text-blue-500/80 block mt-0.5">Across all modules</span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
          <span className="text-[10px] text-emerald-400 uppercase font-bold block">Projects Completed</span>
          <span className="text-2xl font-black text-emerald-400">{totalProjects}</span>
          <span className="text-[10px] text-emerald-500/80 block mt-0.5">Applied ML Labs</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" /> Status:
        </span>
        {['all', ...statuses].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedFilter(st)}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
              selectedFilter === st
                ? 'bg-blue-500 text-white font-bold shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 transition-all backdrop-blur-xl shadow-lg flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-white">{topic.name}</h3>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getStatusColor(topic.status)}`}>
                  {topic.status}
                </span>
              </div>

              {topic.keyConcepts && topic.keyConcepts.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {topic.keyConcepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 text-[10px] border border-slate-800"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Hours Spent:
                </span>
                <span className="font-bold text-white">{topic.hoursSpent} hrs</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1">
                  <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" /> Projects / Notebooks:
                </span>
                <span className="font-bold text-white">{topic.projectsCompleted}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <select
                  value={topic.status}
                  onChange={(e) => updateDSTopic(topic.id, { status: e.target.value as TopicStatus })}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    const newHours = topic.hoursSpent + 1.5;
                    updateDSTopic(topic.id, { hoursSpent: newHours });
                  }}
                  className="px-2.5 py-1 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-500/30 text-[11px] font-bold"
                >
                  +1.5h Logged
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
