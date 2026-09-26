'use client';

import React from 'react';
import {
  Code2,
  CheckCircle2,
  Clock,
  Play,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TopicStatus } from '@/types';

export default function WebDevPage() {
  const { webDevTopics, updateWebDevTopic, startTimer } = useApp();

  const totalHours = webDevTopics.reduce((acc, t) => acc + (t.hoursSpent || 0), 0);
  const completedTopics = webDevTopics.filter((t) => t.status === 'Completed').length;

  const statuses: TopicStatus[] = [
    'Not Started',
    'Learning',
    'Practicing',
    'Completed',
    'Needs Revision',
  ];

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
          <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Web Development Mastery</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Full-Stack Architecture & Next.js Revision &bull; 1.0h Daily Strengthening Target
            </p>
          </div>
        </div>

        <button
          onClick={() => startTimer(60, 'Web Development', 'Full-Stack Web Dev Sprint')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Start 60m Dev Session</span>
        </button>
      </div>

      {/* Purpose Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-emerald-400" />
          <p className="text-xs text-slate-300">
            <span className="font-bold text-white">Curriculum Objective: </span>
            Rapid revision and interview-grade depth for core Full-Stack concepts (React, Next.js Server Components, API Design, and Database relations).
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-400 hidden sm:inline">
          {completedTopics}/{webDevTopics.length} Mastered
        </span>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {webDevTopics.map((topic) => (
          <div
            key={topic.id}
            className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all backdrop-blur-xl shadow-lg flex flex-col justify-between space-y-4"
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
                  <Clock className="w-3.5 h-3.5 text-emerald-400" /> Time Logged:
                </span>
                <span className="font-bold text-white">{topic.hoursSpent} hrs</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <select
                  value={topic.status}
                  onChange={(e) => updateWebDevTopic(topic.id, { status: e.target.value as TopicStatus })}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-500"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    const newHours = topic.hoursSpent + 1.0;
                    updateWebDevTopic(topic.id, { hoursSpent: newHours });
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold"
                >
                  +1.0h Logged
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
