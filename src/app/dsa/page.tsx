'use client';

import React, { useState } from 'react';
import {
  Brain,
  Plus,
  Search,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Star,
  ExternalLink,
  Edit2,
  Trash2,
  Play,
  RotateCcw,
  BookOpen,
  Filter,
  X,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DSAProblem, DSADifficulty, DSAPlatform, DSAStatus } from '@/types';
import { INITIAL_DSA_TOPICS } from '@/lib/seedData';

export default function DSAPage() {
  const {
    dsaProblems,
    addDSAProblem,
    updateDSAProblem,
    deleteDSAProblem,
    toggleDSASolved,
    toggleDSARevision,
    startTimer,
    currentSimulatedDate,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<DSAProblem | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState(INITIAL_DSA_TOPICS[0]);
  const [platform, setPlatform] = useState<DSAPlatform>('LeetCode');
  const [difficulty, setDifficulty] = useState<DSADifficulty>('Medium');
  const [timeTakenMinutes, setTimeTakenMinutes] = useState(30);
  const [notes, setNotes] = useState('');
  const [url, setUrl] = useState('');

  const handleOpenModal = (p?: DSAProblem) => {
    if (p) {
      setEditingProblem(p);
      setTitle(p.title);
      setTopic(p.topic);
      setPlatform(p.platform);
      setDifficulty(p.difficulty);
      setTimeTakenMinutes(p.timeTakenMinutes || 30);
      setNotes(p.notes || '');
      setUrl(p.url || '');
    } else {
      setEditingProblem(null);
      setTitle('');
      setTopic(INITIAL_DSA_TOPICS[0]);
      setPlatform('LeetCode');
      setDifficulty('Medium');
      setTimeTakenMinutes(30);
      setNotes('');
      setUrl('');
    }
    setIsProblemModalOpen(true);
  };

  const handleSaveProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    if (editingProblem) {
      updateDSAProblem(editingProblem.id, {
        title,
        topic,
        platform,
        difficulty,
        timeTakenMinutes: Number(timeTakenMinutes),
        notes,
        url,
      });
    } else {
      addDSAProblem({
        title,
        topic,
        platform,
        difficulty,
        status: 'In Progress',
        timeTakenMinutes: Number(timeTakenMinutes),
        attempts: 1,
        solved: false,
        revisionRequired: false,
        notes,
        url,
        lastPracticed: currentSimulatedDate,
      });
    }
    setIsProblemModalOpen(false);
  };

  const filteredProblems = dsaProblems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'all' || p.topic === selectedTopic;
    const matchesDiff = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
    return matchesSearch && matchesTopic && matchesDiff;
  });

  const solvedCount = dsaProblems.filter((p) => p.solved).length;
  const easyCount = dsaProblems.filter((p) => p.difficulty === 'Easy' && p.solved).length;
  const mediumCount = dsaProblems.filter((p) => p.difficulty === 'Medium' && p.solved).length;
  const hardCount = dsaProblems.filter((p) => p.difficulty === 'Hard' && p.solved).length;
  const revisionCount = dsaProblems.filter((p) => p.revisionRequired).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">DSA 2027 Mastery Hub</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Structured Preparation until January 31, 2027 &bull; Daily 2-Hour Focus
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => startTimer(70, 'DSA', 'DSA 70m Solving Sprint')}
            className="px-3.5 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start 70m Solving Block</span>
          </button>

          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Problem</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Solved</span>
          <span className="text-2xl font-black text-white">{solvedCount}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">of {dsaProblems.length} tracked</span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
          <span className="text-[10px] text-emerald-400 uppercase font-bold block">Easy Solved</span>
          <span className="text-2xl font-black text-emerald-400">{easyCount}</span>
          <span className="text-[10px] text-emerald-500/80 block mt-0.5">Fundamentals</span>
        </div>
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
          <span className="text-[10px] text-amber-400 uppercase font-bold block">Medium Solved</span>
          <span className="text-2xl font-black text-amber-400">{mediumCount}</span>
          <span className="text-[10px] text-amber-500/80 block mt-0.5">Interview Core</span>
        </div>
        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30">
          <span className="text-[10px] text-rose-400 uppercase font-bold block">Hard Solved</span>
          <span className="text-2xl font-black text-rose-400">{hardCount}</span>
          <span className="text-[10px] text-rose-500/80 block mt-0.5">Advanced</span>
        </div>
        <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-indigo-400 uppercase font-bold block">Need Revision</span>
          <span className="text-2xl font-black text-indigo-400">{revisionCount}</span>
          <span className="text-[10px] text-indigo-500/80 block mt-0.5">Flagged for Review</span>
        </div>
      </div>

      {/* 20-70-20-10 Daily Session Protocol Structure */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-indigo-950/50 border border-cyan-500/30 backdrop-blur-xl shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs sm:text-sm font-bold text-white">
              Daily 2-Hour DSA Protocol (20m - 70m - 20m - 10m Framework)
            </h3>
          </div>
          <span className="text-[11px] text-cyan-400 font-bold">120 Minutes Total</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase block">1. Concept Revision</span>
              <h4 className="text-xs font-bold text-white mt-0.5">20 Minutes</h4>
              <p className="text-[10px] text-slate-400 mt-1">Review patterns, dry runs & algorithmic complexity</p>
            </div>
            <button
              onClick={() => startTimer(20, 'DSA', 'DSA 20m Concept Revision')}
              className="mt-2 text-[10px] px-2 py-1 rounded bg-slate-800 text-cyan-300 hover:bg-cyan-900/60 font-bold flex items-center justify-center gap-1"
            >
              <Play className="w-2.5 h-2.5 fill-current" /> Start 20m
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase block">2. Problem Solving</span>
              <h4 className="text-xs font-bold text-white mt-0.5">70 Minutes</h4>
              <p className="text-[10px] text-slate-400 mt-1">Solve 2-3 LeetCode Medium/Hard problems under timed conditions</p>
            </div>
            <button
              onClick={() => startTimer(70, 'DSA', 'DSA 70m Problem Solving')}
              className="mt-2 text-[10px] px-2 py-1 rounded bg-slate-800 text-amber-300 hover:bg-amber-900/60 font-bold flex items-center justify-center gap-1"
            >
              <Play className="w-2.5 h-2.5 fill-current" /> Start 70m
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-rose-400 uppercase block">3. Mistake Review</span>
              <h4 className="text-xs font-bold text-white mt-0.5">20 Minutes</h4>
              <p className="text-[10px] text-slate-400 mt-1">Analyze edge case fails, time-outs, and alternative optimal answers</p>
            </div>
            <button
              onClick={() => startTimer(20, 'DSA', 'DSA 20m Mistake Review')}
              className="mt-2 text-[10px] px-2 py-1 rounded bg-slate-800 text-rose-300 hover:bg-rose-900/60 font-bold flex items-center justify-center gap-1"
            >
              <Play className="w-2.5 h-2.5 fill-current" /> Start 20m
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase block">4. Notes & Flashcards</span>
              <h4 className="text-xs font-bold text-white mt-0.5">10 Minutes</h4>
              <p className="text-[10px] text-slate-400 mt-1">Log key insights, code templates, and mark revision tags</p>
            </div>
            <button
              onClick={() => startTimer(10, 'DSA', 'DSA 10m Notes Logging')}
              className="mt-2 text-[10px] px-2 py-1 rounded bg-slate-800 text-emerald-300 hover:bg-emerald-900/60 font-bold flex items-center justify-center gap-1"
            >
              <Play className="w-2.5 h-2.5 fill-current" /> Start 10m
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Topic Pills */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search problem title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-slate-400 font-semibold">Difficulty:</span>
            {['all', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* 17 Topics horizontal pill scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedTopic === 'all'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All 17 Topics
          </button>
          {INITIAL_DSA_TOPICS.map((t) => {
            const count = dsaProblems.filter((p) => p.topic === t).length;
            const solved = dsaProblems.filter((p) => p.topic === t && p.solved).length;
            return (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedTopic === t
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{t}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400">
                  {solved}/{count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Problems List */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white">
            Problem Log ({filteredProblems.length} Problems)
          </h3>
        </div>

        <div className="space-y-2.5">
          {filteredProblems.map((prob) => (
            <div
              key={prob.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                prob.solved
                  ? 'bg-slate-900/40 border-slate-800'
                  : 'bg-slate-900/80 border-slate-700/60 hover:border-cyan-500/40'
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <button
                  onClick={() => toggleDSASolved(prob.id)}
                  className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  {prob.solved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 hover:text-cyan-400" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-sm font-bold ${prob.solved ? 'text-slate-300' : 'text-white'}`}>
                      {prob.title}
                    </span>
                    {prob.url && (
                      <a
                        href={prob.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-cyan-400"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {prob.notes && (
                    <p className="text-xs text-slate-400 mb-1.5 leading-relaxed bg-slate-950/40 p-2 rounded-lg border border-slate-800/80">
                      💡 {prob.notes}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[10px]">
                      {prob.topic}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        prob.difficulty === 'Easy'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : prob.difficulty === 'Medium'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {prob.platform}
                    </span>
                    {prob.timeTakenMinutes && (
                      <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> {prob.timeTakenMinutes}m
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => toggleDSARevision(prob.id)}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                    prob.revisionRequired
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-rose-300'
                  }`}
                  title="Flag for revision"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">
                    {prob.revisionRequired ? 'Needs Revision' : 'Revise'}
                  </span>
                </button>

                <button
                  onClick={() => handleOpenModal(prob)}
                  className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => deleteDSAProblem(prob.id)}
                  className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-rose-400"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isProblemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#0f172a] border border-slate-700 shadow-2xl p-6 relative">
            <button
              onClick={() => setIsProblemModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-cyan-400" />
              <span>{editingProblem ? 'Edit DSA Problem' : 'Add DSA Problem'}</span>
            </h2>

            <form onSubmit={handleSaveProblem} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Problem Name *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Trapping Rain Water"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  >
                    {INITIAL_DSA_TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as DSADifficulty)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as DSAPlatform)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  >
                    <option value="LeetCode">LeetCode</option>
                    <option value="GeeksforGeeks">GeeksforGeeks</option>
                    <option value="CodeStudio">CodeStudio</option>
                    <option value="Striver SDE Sheet">Striver SDE Sheet</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Time Taken (Mins)
                  </label>
                  <input
                    type="number"
                    min="5"
                    step="5"
                    value={timeTakenMinutes}
                    onChange={(e) => setTimeTakenMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Problem URL (Optional)
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://leetcode.com/problems/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Key Intuition / Approach Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optimal data structure, time/space complexity, edge cases..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProblemModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold"
                >
                  Save Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
