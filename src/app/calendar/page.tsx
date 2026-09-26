'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Clock,
  Trash2,
  X,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CalendarEvent } from '@/types';
import { formatDate } from '@/lib/utils';

export default function CalendarPage() {
  const {
    calendarEvents,
    addCalendarEvent,
    deleteCalendarEvent,
    currentSimulatedDate,
    setCurrentSimulatedDate,
  } = useApp();

  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date(2026, 8, 27)); // Sep 2026

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'placement' | 'academic' | 'learning' | 'project' | 'health' | 'client'>('placement');
  const [date, setDate] = useState(currentSimulatedDate);
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('12:00');
  const [description, setDescription] = useState('');

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const prevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  // Generate calendar days for current month
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(i);
  }

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addCalendarEvent({
      title,
      category,
      date,
      startTime,
      endTime,
      description,
    });
    setIsEventModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const filteredEvents =
    selectedCategory === 'all'
      ? calendarEvents
      : calendarEvents.filter((ev) => ev.category === selectedCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'placement':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'academic':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'learning':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'project':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'health':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'client':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Academic & Placement Calendar</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Exam Milestones, Interviews, Classes, Gym, and Project Deadlines
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Toggle */}
          <div className="flex rounded-xl bg-slate-950 border border-slate-800 p-0.5 text-xs font-semibold">
            {(['month', 'week', 'day'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  viewMode === mode
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsEventModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Category Legend & Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {[
          { id: 'all', name: 'All Categories' },
          { id: 'placement', name: 'Placement' },
          { id: 'academic', name: 'Academic' },
          { id: 'project', name: 'Project' },
          { id: 'health', name: 'Health / Sports' },
          { id: 'client', name: 'Client' },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              selectedCategory === c.id
                ? 'bg-slate-800 text-white border border-slate-600 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Month Navigation & Grid */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">
              {currentMonthDate.toLocaleString('default', { month: 'long' })} {year}
            </h2>
            <button
              onClick={() => setCurrentMonthDate(new Date(2026, 8, 27))}
              className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-cyan-400 border border-slate-700 hover:bg-slate-700"
            >
              Go to Sprint Start (Sep 2026)
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold text-slate-400 py-1 uppercase tracking-wider">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Grid Cells */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {daysArray.map((dayNum, idx) => {
            if (!dayNum) {
              return <div key={idx} className="min-h-[90px] rounded-xl bg-slate-950/20" />;
            }

            const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const isToday = dayStr === currentSimulatedDate;
            const eventsForDay = filteredEvents.filter((ev) => ev.date === dayStr);

            return (
              <div
                key={idx}
                onClick={() => setCurrentSimulatedDate(dayStr)}
                className={`min-h-[100px] p-2 rounded-xl border flex flex-col justify-between transition-all cursor-pointer group ${
                  isToday
                    ? 'bg-slate-800/90 border-cyan-500 ring-1 ring-cyan-500/50 shadow-lg'
                    : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                      isToday ? 'bg-cyan-500 text-black' : 'text-slate-300'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {eventsForDay.length > 0 && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {eventsForDay.length} ev
                    </span>
                  )}
                </div>

                <div className="space-y-1 overflow-y-auto max-h-[65px] scrollbar-none">
                  {eventsForDay.map((ev) => (
                    <div
                      key={ev.id}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium border truncate ${getCategoryColor(
                        ev.category
                      )}`}
                      title={`${ev.title} (${ev.startTime || 'All Day'})`}
                    >
                      {ev.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Events List for Selected Date */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            Scheduled Events for {formatDate(currentSimulatedDate)}
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {calendarEvents.filter((e) => e.date === currentSimulatedDate).length} Events
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {calendarEvents
            .filter((e) => e.date === currentSimulatedDate)
            .map((ev) => (
              <div
                key={ev.id}
                className={`p-3.5 rounded-2xl border ${getCategoryColor(
                  ev.category
                )} flex items-start justify-between gap-3 shadow-md`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">
                    {ev.category}
                  </span>
                  <h4 className="font-bold text-white text-xs mt-0.5">{ev.title}</h4>
                  {ev.description && (
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                      {ev.description}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-[10px] text-slate-300 font-mono mt-2">
                    <Clock className="w-3 h-3" />
                    <span>
                      {ev.startTime && ev.endTime ? `${ev.startTime} - ${ev.endTime}` : 'All Day Event'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteCalendarEvent(ev.id)}
                  className="p-1 rounded-lg bg-black/20 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300"
                  title="Delete Event"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Event Add Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#0f172a] border border-slate-700 shadow-2xl p-6 relative">
            <button
              onClick={() => setIsEventModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-cyan-400" />
              <span>Schedule Calendar Event</span>
            </h2>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Physics Wallah Exam"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  >
                    <option value="placement">Placement</option>
                    <option value="academic">Academic</option>
                    <option value="learning">Learning</option>
                    <option value="project">Project</option>
                    <option value="health">Health / Sports</option>
                    <option value="client">Client</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description / Location
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Exam venue, syllabus, meeting links..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
