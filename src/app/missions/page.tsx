'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Target,
  Zap,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Award,
  Brain,
  Rocket,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatDate, getDaysDifference } from '@/lib/utils';

export default function MissionsPage() {
  const { currentSimulatedDate, exams, projectMilestones, dsaProblems, dsTopics } = useApp();
  const [activeTab, setActiveTab] = useState<'sprint' | 'long_term'>('sprint');

  const sprintPhases = [
    {
      phaseNumber: 1,
      title: 'Physics Wallah Preparation Sprint',
      range: 'Sep 27, 2026 – Oct 02, 2026',
      examDate: '2026-10-03',
      examTitle: 'Physics Wallah Recruitment Exam (Teaching / Content)',
      status: currentSimulatedDate > '2026-10-03' ? 'Completed' : currentSimulatedDate <= '2026-10-03' ? 'Active' : 'Upcoming',
      priority: 'Critical Sprint Milestone',
      syllabus: [
        'Physics Core Concepts (Kinematics, Thermodynamics, Optics, Modern Physics)',
        'Pedagogical Problem Explanation & Board Work Clarity',
        'Speed Numerical Solving & Conceptual Shortcuts',
        'Teaching Aptitude & Classroom Simulation',
      ],
      keyObjectives: [
        'Solve 150+ standard numerical problems across key physics chapters',
        'Record 2 mock 10-minute concept lecture explanations',
        'Review past teaching recruitment tests and scoring rubrics',
      ],
      color: 'border-amber-500/40 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 text-amber-400',
    },
    {
      phaseNumber: 2,
      title: 'Course Examinations Sprint',
      range: 'Oct 04, 2026 – Oct 07, 2026',
      examDate: '2026-10-05 & 2026-10-07',
      examTitle: 'Course Exam 1 (Oct 5) & Course Exam 2 (Oct 7)',
      status: currentSimulatedDate > '2026-10-07' ? 'Completed' : currentSimulatedDate >= '2026-10-04' ? 'Active' : 'Upcoming',
      priority: 'Academic Core Priority',
      syllabus: [
        'Statistical Inference, Hypothesis Testing (t-test, ANOVA, Chi-Square)',
        'Regression Analysis, Ridge/Lasso, Generalized Linear Models',
        'Deep Learning Architectures, CNNs, Sequence Models (RNN/LSTM)',
        'Model Interpretability, Loss Functions, Gradient Descent Variants',
      ],
      keyObjectives: [
        'Memorize statistical proofs and mathematical formulations',
        'Review all professor lecture slides and class assignments',
        'Solve past 3 years university exam papers',
      ],
      color: 'border-rose-500/40 bg-gradient-to-br from-rose-950/20 via-slate-900 to-slate-950 text-rose-400',
    },
    {
      phaseNumber: 3,
      title: 'L&T Intensive Placement Sprint',
      range: 'Oct 08, 2026 – Oct 11, 2026',
      examDate: '2026-10-12',
      examTitle: 'L&T Placement Exam (Aptitude + Technical Round)',
      status: currentSimulatedDate > '2026-10-12' ? 'Completed' : currentSimulatedDate >= '2026-10-08' ? 'Active' : 'Upcoming',
      priority: 'Placement Critical',
      syllabus: [
        'Quantitative Aptitude: Percentages, Profit/Loss, Ratios, Speed & Distance, Probability',
        'Logical Reasoning: Series, Blood Relations, Syllogisms, Seating Arrangements',
        'Verbal Ability: Reading Comprehension, Sentence Correction, Para Jumbles',
        'Technical: Python, SQL, OOP, OS, DBMS, Machine Learning, Data Structures',
      ],
      keyObjectives: [
        'Complete 200+ timed practice questions across Quants & Logic',
        'Take 2 full-length simulated mock placement tests',
        'Revise SQL queries and Python OOP concepts',
      ],
      color: 'border-cyan-500/40 bg-gradient-to-br from-cyan-950/20 via-slate-900 to-slate-950 text-cyan-400',
    },
    {
      phaseNumber: 4,
      title: 'MOOCs Certification Exam Sprint',
      range: 'Oct 13, 2026 – Oct 15, 2026',
      examDate: '2026-10-16',
      examTitle: 'MOOCs Proctored Certification Exam',
      status: currentSimulatedDate > '2026-10-16' ? 'Completed' : currentSimulatedDate >= '2026-10-13' ? 'Active' : 'Upcoming',
      priority: 'Academic Credit Completion',
      syllabus: [
        'Full 12-week course syllabus compilation',
        'Weekly graded assignment solutions review',
        'Summary cheat sheets and formula consolidation',
      ],
      keyObjectives: [
        'Solve all previous weekly quiz questions (100% review)',
        'Score 80%+ on mock certification assessment',
      ],
      color: 'border-indigo-500/40 bg-gradient-to-br from-indigo-950/20 via-slate-900 to-slate-950 text-indigo-400',
    },
  ];

  const longTermTracks = [
    {
      name: 'DSA Mastery Track',
      target: 'Jan 31, 2027',
      dailyHours: '2.0 Hours Daily',
      solvedCount: dsaProblems.filter((p) => p.solved).length,
      totalCount: dsaProblems.length,
      description: 'Structured 17-topic roadmap from Arrays & Two Pointers to Graphs & DP.',
      icon: Brain,
      route: '/dsa',
      color: 'border-cyan-500/30 text-cyan-400',
    },
    {
      name: 'Data Science & ML Track',
      target: 'Jan 31, 2027',
      dailyHours: '1.5 Hours Daily',
      solvedCount: dsTopics.filter((t) => t.status === 'Completed').length,
      totalCount: dsTopics.length,
      description: 'CodeWithHarry comprehensive course, EDA, Deep Learning, NLP, RAG.',
      icon: Target,
      route: '/data-science',
      color: 'border-blue-500/30 text-blue-400',
    },
    {
      name: 'Web Development Strengthening',
      target: 'Jan 31, 2027',
      dailyHours: '1.0 Hour Daily',
      solvedCount: 8,
      totalCount: 12,
      description: 'Full-stack React, Next.js, Node/Express, TypeScript & REST API revision.',
      icon: Zap,
      route: '/web-development',
      color: 'border-emerald-500/30 text-emerald-400',
    },
    {
      name: 'Major Semester Project Track',
      target: 'Nov 27, 2026 (2-Month Hard Deadline)',
      dailyHours: '1.5 - 2.0 Hours Daily',
      solvedCount: projectMilestones.filter((m) => m.status === 'Completed').length,
      totalCount: projectMilestones.length,
      description: 'Multimodal AI research, data curation, model evaluation, and thesis defense.',
      icon: Rocket,
      route: '/project',
      color: 'border-purple-500/30 text-purple-400',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Title & Dual-Track Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white">Mission System & Roadmaps</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Short-Term Exam Sprints vs. Long-Term 2027 Career Preparation
          </p>
        </div>

        <div className="flex rounded-2xl bg-slate-950 border border-slate-800 p-1">
          <button
            onClick={() => setActiveTab('sprint')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'sprint'
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔥 October Sprint (Sep 27 – Oct 16)
          </button>
          <button
            onClick={() => setActiveTab('long_term')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'long_term'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🚀 Long-Term Readiness (2027)
          </button>
        </div>
      </div>

      {/* Strategic Rule Alert */}
      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-200 leading-relaxed">
          <span className="font-bold text-white">Non-Negotiable System Rule: </span>
          Short-term exam missions temporarily receive higher priority during their sprint windows, but
          <span className="text-cyan-300 font-semibold"> never sacrifice long-term DSA, Data Science, or the Major Project permanently</span>. Long-term habits continue daily across all phases.
        </p>
      </div>

      {/* TAB 1: Short-Term October Sprint */}
      {activeTab === 'sprint' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">
              October High-Intensity Placement & Exam Sprint
            </h2>
            <span className="text-xs text-amber-400 font-mono">
              Sprint Dates: 2026-09-27 to 2026-10-16
            </span>
          </div>

          <div className="space-y-4">
            {sprintPhases.map((phase) => {
              const daysToExam = getDaysDifference(phase.examDate.split(' ')[0], currentSimulatedDate);

              return (
                <div
                  key={phase.phaseNumber}
                  className={`p-5 rounded-3xl border ${phase.color} backdrop-blur-xl shadow-xl space-y-4 relative overflow-hidden`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono">
                        PHASE {phase.phaseNumber}
                      </span>
                      <h3 className="text-base font-bold text-white">{phase.title}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-900/80 text-slate-300">
                        {phase.range}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                          phase.status === 'Active'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse'
                            : phase.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {phase.status}
                      </span>
                    </div>
                  </div>

                  {/* Exam Milestone Highlight */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Award className="w-5 h-5 text-amber-400" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Phase Final Assessment
                        </span>
                        <span className="text-xs font-bold text-white">{phase.examTitle}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-cyan-300 font-bold">
                        {phase.examDate}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                        {daysToExam >= 0 ? `${daysToExam} days left` : 'Completed'}
                      </span>
                    </div>
                  </div>

                  {/* Syllabus & Objectives */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
                        Core Syllabus Modules:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-400">
                        {phase.syllabus.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">&bull;</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
                        Key Success Deliverables:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-400">
                        {phase.keyObjectives.map((obj, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Long-Term 2027 Tracks */}
      {activeTab === 'long_term' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">
              Placement Readiness 2027 — Core Learning Tracks
            </h2>
            <span className="text-xs text-cyan-400 font-mono">
              Target Deadline: January 31, 2027
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {longTermTracks.map((track, idx) => {
              const Icon = track.icon;
              const percent = Math.round((track.solvedCount / track.totalCount) * 100);

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-3xl bg-slate-900/70 border ${track.color} backdrop-blur-xl shadow-lg flex flex-col justify-between space-y-4`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                        {track.dailyHours}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">{track.name}</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1 font-mono">
                      <span className="text-slate-400">
                        Progress: {track.solvedCount} / {track.totalCount} completed
                      </span>
                      <span className="font-bold text-white">{percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Target: {track.target}</span>
                    <Link
                      href={track.route}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                    >
                      Open Module <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
