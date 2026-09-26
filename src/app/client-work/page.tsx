'use client';

import React, { useState } from 'react';
import {
  Video,
  Plus,
  DollarSign,
  Clock,
  Calendar,
  CheckCircle2,
  Edit2,
  Trash2,
  X,
  Play,
  IndianRupee,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ClientProject, ClientWorkStatus } from '@/types';
import { formatDate } from '@/lib/utils';

export default function ClientWorkPage() {
  const {
    clientProjects,
    addClientProject,
    updateClientProject,
    deleteClientProject,
    startTimer,
    currentSimulatedDate,
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ClientProject | null>(null);

  // Form State
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [videoType, setVideoType] = useState<ClientProject['videoType']>('YouTube Long-form');
  const [deadline, setDeadline] = useState(currentSimulatedDate);
  const [status, setStatus] = useState<ClientWorkStatus>('Editing');
  const [hoursSpent, setHoursSpent] = useState(0);
  const [payment, setPayment] = useState(10000);
  const [revisionCount, setRevisionCount] = useState(0);
  const [notes, setNotes] = useState('');

  const kanbanColumns: ClientWorkStatus[] = [
    'Backlog',
    'Editing',
    'Review',
    'Revision',
    'Delivered',
  ];

  const totalEarned = clientProjects
    .filter((p) => p.status === 'Delivered')
    .reduce((acc, p) => acc + (p.payment || 0), 0);

  const pendingEarnings = clientProjects
    .filter((p) => p.status !== 'Delivered')
    .reduce((acc, p) => acc + (p.payment || 0), 0);

  const handleOpenModal = (p?: ClientProject) => {
    if (p) {
      setEditingProject(p);
      setClientName(p.clientName);
      setProjectName(p.projectName);
      setVideoType(p.videoType);
      setDeadline(p.deadline);
      setStatus(p.status);
      setHoursSpent(p.hoursSpent);
      setPayment(p.payment);
      setRevisionCount(p.revisionCount);
      setNotes(p.notes || '');
    } else {
      setEditingProject(null);
      setClientName('');
      setProjectName('');
      setVideoType('YouTube Long-form');
      setDeadline(currentSimulatedDate);
      setStatus('Backlog');
      setHoursSpent(0);
      setPayment(8000);
      setRevisionCount(0);
      setNotes('');
    }
    setIsModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !projectName) return;

    if (editingProject) {
      updateClientProject(editingProject.id, {
        clientName,
        projectName,
        videoType,
        deadline,
        status,
        hoursSpent: Number(hoursSpent),
        payment: Number(payment),
        revisionCount: Number(revisionCount),
        notes,
      });
    } else {
      addClientProject({
        clientName,
        projectName,
        videoType,
        deadline,
        status,
        hoursSpent: Number(hoursSpent),
        payment: Number(payment),
        currency: 'INR',
        revisionCount: Number(revisionCount),
        notes,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-yellow-950/60 border border-yellow-500/40 text-yellow-400">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Client Video Editing Hub</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Freelance Video Pipeline, Revisions & Financial Tracking
            </p>
          </div>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black text-xs font-bold shadow-lg shadow-yellow-500/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Client Project</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Projects</span>
          <span className="text-2xl font-black text-white">
            {clientProjects.filter((p) => p.status !== 'Delivered').length}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">In Pipeline</span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
          <span className="text-[10px] text-emerald-400 uppercase font-bold block">Delivered & Paid</span>
          <span className="text-2xl font-black text-emerald-400">₹{totalEarned.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-emerald-500/80 block mt-0.5">Completed Contracts</span>
        </div>
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
          <span className="text-[10px] text-amber-400 uppercase font-bold block">Pipeline Value</span>
          <span className="text-2xl font-black text-amber-400">₹{pendingEarnings.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-amber-500/80 block mt-0.5">Pending Delivery</span>
        </div>
        <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30">
          <span className="text-[10px] text-blue-400 uppercase font-bold block">Hours Logged</span>
          <span className="text-2xl font-black text-blue-400">
            {clientProjects.reduce((acc, p) => acc + (p.hoursSpent || 0), 0)}h
          </span>
          <span className="text-[10px] text-blue-500/80 block mt-0.5">Editing Time</span>
        </div>
      </div>

      {/* 5-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 overflow-x-auto pb-4">
        {kanbanColumns.map((col) => {
          const colProjects = clientProjects.filter((p) => p.status === col);

          return (
            <div
              key={col}
              className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between min-h-[400px]"
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">{col}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono font-bold">
                    {colProjects.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {colProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-700/80 hover:border-yellow-500/50 transition-all shadow-md group space-y-2"
                    >
                      <div>
                        <span className="text-[10px] text-yellow-400 font-bold block">
                          {proj.clientName}
                        </span>
                        <h4 className="text-xs font-bold text-white leading-snug">{proj.projectName}</h4>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono inline-block mt-1">
                          {proj.videoType}
                        </span>
                      </div>

                      {proj.notes && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed bg-slate-900/60 p-1.5 rounded border border-slate-800">
                          {proj.notes}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-slate-800 font-mono">
                        <span className="text-emerald-400 font-bold">₹{proj.payment.toLocaleString('en-IN')}</span>
                        <span>{formatDate(proj.deadline)}</span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>Rev: {proj.revisionCount} &bull; {proj.hoursSpent}h</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenModal(proj)}
                            className="p-1 hover:text-white"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteClientProject(proj.id)}
                            className="p-1 hover:text-rose-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Status select dropdown */}
                      <select
                        value={proj.status}
                        onChange={(e) => updateClientProject(proj.id, { status: e.target.value as ClientWorkStatus })}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-300 text-[10px] rounded px-1.5 py-0.5 focus:outline-none"
                      >
                        {kanbanColumns.map((c) => (
                          <option key={c} value={c}>
                            Move to {c}
                          </option>
                        ))}
                      </select>
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
                <Plus className="w-3.5 h-3.5" /> Add Project
              </button>
            </div>
          );
        })}
      </div>

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#0f172a] border border-slate-700 shadow-2xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-yellow-400" />
              <span>{editingProject ? 'Edit Client Video Project' : 'New Client Video Project'}</span>
            </h2>

            <form onSubmit={handleSaveProject} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Client / Channel Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. TechVlog Rahul"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. AI Benchmark Full Review Edit"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Video Format
                  </label>
                  <select
                    value={videoType}
                    onChange={(e) => setVideoType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  >
                    <option value="YouTube Long-form">YouTube Long-form</option>
                    <option value="Reel/Short">Reel / Short</option>
                    <option value="Commercial Ad">Commercial Ad</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Course Edit">Course Edit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ClientWorkStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  >
                    {kanbanColumns.map((c) => (
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
                    Payment (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={payment}
                    onChange={(e) => setPayment(Number(e.target.value))}
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Creative Notes & Instructions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Transitions, music track choices, color LUTs..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-xs font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
