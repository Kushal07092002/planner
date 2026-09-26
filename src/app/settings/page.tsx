'use client';

import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Clock,
  Moon,
  Dumbbell,
  BookOpen,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function SettingsPage() {
  const {
    currentSimulatedDate,
    setCurrentSimulatedDate,
    resetAllToSeedData,
    exportDataJSON,
    importDataJSON,
    showNotification,
  } = useApp();

  const [importText, setImportText] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `placement_command_center_backup_${currentSimulatedDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Backup exported to file!');
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText) return;
    const success = importDataJSON(importText);
    if (success) {
      setImportText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300">
            <Settings className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">System Settings & Profile</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Profile Configuration, Timetable Protections, Backups & Reset
            </p>
          </div>
        </div>
      </div>

      {/* User Context & Profile Card */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>User Profile & Academic Context</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Student Status</span>
            <span className="text-sm font-bold text-white mt-0.5 block">Final-year MTech Data Science</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Timezone</span>
            <span className="text-sm font-bold text-cyan-400 mt-0.5 block">Asia/Kolkata (IST)</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Sleep Target Protection</span>
            <span className="text-sm font-bold text-indigo-300 mt-0.5 block">8.0 Hours Guaranteed</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Primary Goal Deadline</span>
            <span className="text-sm font-bold text-emerald-400 mt-0.5 block">January 31, 2027 Placements</span>
          </div>
        </div>
      </div>

      {/* Sprint Date Switcher */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Active Sprint Date Simulation</span>
        </h3>
        <p className="text-xs text-slate-400">
          You can test and simulate any date in the October sprint (Sep 27 – Oct 16) or future dates to verify dynamic priority recalculation.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="date"
            value={currentSimulatedDate}
            onChange={(e) => setCurrentSimulatedDate(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={() => setCurrentSimulatedDate('2026-09-27')}
            className="px-3 py-2 rounded-xl bg-slate-800 text-cyan-300 hover:bg-slate-700 text-xs font-bold"
          >
            Reset to Sprint Day 1 (Sep 27, 2026)
          </button>
        </div>
      </div>

      {/* Backup, Export & Import */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Data Backup, Export & Import</span>
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Complete JSON Backup</span>
          </button>
        </div>

        <form onSubmit={handleImportSubmit} className="space-y-2 pt-2 border-t border-slate-800">
          <label className="block text-xs font-semibold text-slate-400">
            Import JSON Backup:
          </label>
          <textarea
            rows={3}
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste exported JSON payload here to restore..."
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
          >
            Restore Backup Data
          </button>
        </form>
      </div>

      {/* Danger Zone / Reset */}
      <div className="p-5 rounded-3xl bg-rose-950/20 border border-rose-500/30 backdrop-blur-xl space-y-3">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Reset System State</span>
        </div>
        <p className="text-xs text-slate-300">
          Re-initialize all tasks, exams, companies, milestones, DSA problems, and habits back to the initial September 27, 2026 seed state.
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Data to Seed Defaults</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-rose-500">
            <span className="text-xs text-rose-300 font-bold">Are you sure?</span>
            <button
              onClick={() => {
                resetAllToSeedData();
                setShowResetConfirm(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
            >
              Yes, Reset Everything
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
