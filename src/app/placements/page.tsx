'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  Search,
  BookOpen,
  Target,
  Edit2,
  Trash2,
  X,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Company, LTQuestionLog } from '@/types';
import { formatDate } from '@/lib/utils';

export default function PlacementsPage() {
  const {
    companies,
    addCompany,
    updateCompany,
    deleteCompany,
    ltQuestionLogs,
    updateLTQuestionLog,
    addLTQuestionLog,
    currentSimulatedDate,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'companies' | 'lt_prep'>('companies');
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // New Company Form State
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<Company['status']>('Applied');
  const [applicationDate, setApplicationDate] = useState(currentSimulatedDate);
  const [examDate, setExamDate] = useState('');
  const [packageLPA, setPackageLPA] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const handleOpenModal = (comp?: Company) => {
    if (comp) {
      setEditingCompany(comp);
      setCompanyName(comp.name);
      setRole(comp.role);
      setStatus(comp.status);
      setApplicationDate(comp.applicationDate || currentSimulatedDate);
      setExamDate(comp.examDate || '');
      setPackageLPA(comp.packageLPA || '');
      setLocation(comp.location || '');
      setNotes(comp.notes || '');
    } else {
      setEditingCompany(null);
      setCompanyName('');
      setRole('');
      setStatus('Applied');
      setApplicationDate(currentSimulatedDate);
      setExamDate('');
      setPackageLPA('');
      setLocation('');
      setNotes('');
    }
    setIsCompanyModalOpen(true);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !role) return;

    if (editingCompany) {
      updateCompany(editingCompany.id, {
        name: companyName,
        role,
        status,
        applicationDate,
        examDate: examDate || undefined,
        packageLPA,
        location,
        notes,
      });
    } else {
      addCompany({
        name: companyName,
        role,
        status,
        applicationDate,
        examDate: examDate || undefined,
        packageLPA,
        location,
        notes,
      });
    }
    setIsCompanyModalOpen(false);
  };

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (st: Company['status']) => {
    switch (st) {
      case 'Exam Scheduled':
        return <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[10px]">EXAM SCHEDULED</span>;
      case 'Interview Scheduled':
        return <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40 text-[10px]">INTERVIEW</span>;
      case 'Selected':
        return <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 text-[10px]">SELECTED 🎉</span>;
      case 'Preparing':
        return <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 text-[10px]">PREPARING</span>;
      case 'Applied':
        return <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40 text-[10px]">APPLIED</span>;
      case 'Rejected':
        return <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40 text-[10px]">REJECTED</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-bold text-[10px]">{st}</span>;
    }
  };

  // L&T Prep stats
  const totalAttempted = ltQuestionLogs.reduce((acc, l) => acc + l.attempted, 0);
  const totalCorrect = ltQuestionLogs.reduce((acc, l) => acc + l.correct, 0);
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Placement Command Center</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Target Company Applications & Dedicated L&T Assessment Preparation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-2xl bg-slate-950 border border-slate-800 p-1">
            <button
              onClick={() => setActiveTab('companies')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'companies'
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🏢 Target Companies ({companies.length})
            </button>
            <button
              onClick={() => setActiveTab('lt_prep')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'lt_prep'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚡ L&T Prep Hub
            </button>
          </div>

          {activeTab === 'companies' && (
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Track Company</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: Companies Pipeline */}
      {activeTab === 'companies' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search company or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-slate-400 text-xs font-semibold">Status:</span>
              {['all', 'Exam Scheduled', 'Preparing', 'Applied', 'Interested'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    statusFilter === st
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompanies.map((comp) => (
              <div
                key={comp.id}
                className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all backdrop-blur-xl shadow-lg flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-cyan-400" />
                        {comp.name}
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5">{comp.role}</p>
                    </div>
                    {getStatusBadge(comp.status)}
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800">
                    {comp.packageLPA && (
                      <div className="flex items-center justify-between">
                        <span>Package:</span>
                        <span className="font-bold text-emerald-400">{comp.packageLPA}</span>
                      </div>
                    )}
                    {comp.location && (
                      <div className="flex items-center justify-between">
                        <span>Location:</span>
                        <span className="text-slate-300">{comp.location}</span>
                      </div>
                    )}
                    {comp.examDate ? (
                      <div className="flex items-center justify-between">
                        <span>Exam Date:</span>
                        <span className="font-bold text-amber-400">{formatDate(comp.examDate)}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span>Exam Date:</span>
                        <span className="text-slate-500 italic">TBD</span>
                      </div>
                    )}
                  </div>

                  {comp.notes && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300">
                      <span className="font-semibold text-cyan-400">Notes: </span>
                      {comp.notes}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenModal(comp)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteCompany(comp.id)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-700 text-xs"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: L&T Preparation Module */}
      {activeTab === 'lt_prep' && (
        <div className="space-y-6">
          {/* L&T Overview Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/40 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Target Exam: October 12, 2026
                </span>
                <h2 className="text-xl font-black text-white mt-1">L&T Placement Preparation System</h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Comprehensive topic breakdown & real-time accuracy scoring
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Overall Accuracy</span>
                  <span className="text-2xl font-black text-amber-400">{overallAccuracy}%</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Questions Attempted</span>
                  <span className="text-2xl font-black text-white">{totalAttempted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quantitative Aptitude */}
            <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Target className="w-4 h-4" /> 1. Quantitative Aptitude (10 Core Topics)
                </h3>
              </div>
              <div className="space-y-2 text-xs">
                {ltQuestionLogs
                  .filter((l) => l.section === 'quantitative_aptitude')
                  .map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-white">{log.topic}</h4>
                        <span className="text-[11px] text-slate-400">
                          {log.correct}/{log.attempted} correct &bull; {log.accuracy}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {log.revisionRequired && (
                          <span className="text-[9px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                            Revise
                          </span>
                        )}
                        <button
                          onClick={() => {
                            const newAttempted = log.attempted + 10;
                            const newCorrect = log.correct + 8;
                            updateLTQuestionLog(log.id, {
                              attempted: newAttempted,
                              correct: newCorrect,
                              accuracy: Math.round((newCorrect / newAttempted) * 100),
                            });
                          }}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px] font-bold"
                        >
                          +10 Solved
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Logical Reasoning */}
            <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                  <Target className="w-4 h-4" /> 2. Logical Reasoning (8 Topics)
                </h3>
              </div>
              <div className="space-y-2 text-xs">
                {ltQuestionLogs
                  .filter((l) => l.section === 'logical_reasoning')
                  .map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-white">{log.topic}</h4>
                        <span className="text-[11px] text-slate-400">
                          {log.correct}/{log.attempted} correct &bull; {log.accuracy}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {log.revisionRequired && (
                          <span className="text-[9px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                            Revise
                          </span>
                        )}
                        <button
                          onClick={() => {
                            const newAttempted = log.attempted + 10;
                            const newCorrect = log.correct + 9;
                            updateLTQuestionLog(log.id, {
                              attempted: newAttempted,
                              correct: newCorrect,
                              accuracy: Math.round((newCorrect / newAttempted) * 100),
                            });
                          }}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px] font-bold"
                        >
                          +10 Solved
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Technical Section */}
            <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-3 md:col-span-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <Target className="w-4 h-4" /> 3. Technical Core & Data Science/ML (11 Modules)
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {ltQuestionLogs
                  .filter((l) => l.section === 'technical' || l.section === 'verbal')
                  .map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-white">{log.topic}</h4>
                        <span className="text-[11px] text-slate-400">
                          {log.correct}/{log.attempted} correct &bull; {log.accuracy}%
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const newAttempted = log.attempted + 10;
                          const newCorrect = log.correct + 9;
                          updateLTQuestionLog(log.id, {
                            attempted: newAttempted,
                            correct: newCorrect,
                            accuracy: Math.round((newCorrect / newAttempted) * 100),
                          });
                        }}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 text-[10px] font-bold"
                      >
                        +10 Solved
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding/editing Company */}
      {isCompanyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#0f172a] border border-slate-700 shadow-2xl p-6 relative">
            <button
              onClick={() => setIsCompanyModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              <span>{editingCompany ? 'Edit Company' : 'Track Target Company'}</span>
            </h2>

            <form onSubmit={handleSaveCompany} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Larsen & Toubro / Google"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Role / Designation *
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Graduate Engineer / Data Analyst"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  >
                    <option value="Interested">Interested</option>
                    <option value="Applied">Applied</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Exam Scheduled">Exam Scheduled</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Waiting">Waiting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Exam Date
                  </label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Package (LPA)
                  </label>
                  <input
                    type="text"
                    value={packageLPA}
                    onChange={(e) => setPackageLPA(e.target.value)}
                    placeholder="e.g. 14 LPA"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bangalore / Remote"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Preparation Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Exam format, important concepts, referrals..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCompanyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold"
                >
                  Save Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
