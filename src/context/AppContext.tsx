'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Task,
  Exam,
  Company,
  DSAProblem,
  DataScienceTopic,
  WebDevTopic,
  ProjectTask,
  ProjectMilestone,
  ClientProject,
  Habit,
  CalendarEvent,
  DailyReview,
  TimeSession,
  LTQuestionLog,
  PriorityLevel,
  TaskCategory,
  ScheduleBlock,
} from '../types';
import {
  INITIAL_EXAMS,
  INITIAL_COMPANIES,
  INITIAL_DSA_PROBLEMS,
  INITIAL_DATA_SCIENCE_TOPICS,
  INITIAL_WEB_DEV_TOPICS,
  INITIAL_PROJECT_MILESTONES,
  INITIAL_PROJECT_TASKS,
  INITIAL_CLIENT_PROJECTS,
  INITIAL_HABITS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_TASKS,
  INITIAL_LT_QUESTION_LOGS,
  INITIAL_TIME_SESSIONS,
  INITIAL_SCHEDULE_BLOCKS,
} from '../lib/seedData';
import { getCurrentPhaseInfo, CurrentPhaseInfo } from '../lib/priorityEngine';

interface ActiveTimer {
  isRunning: boolean;
  secondsRemaining: number;
  totalSeconds: number;
  category: TaskCategory;
  taskTitle: string;
  presetMinutes: number;
}

interface AppContextType {
  // Theme
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;

  // Date and Phase
  currentSimulatedDate: string;
  setCurrentSimulatedDate: (date: string) => void;
  phaseInfo: CurrentPhaseInfo;
  isSimulatedMode: boolean;
  setIsSimulatedMode: (val: boolean) => void;

  // Schedule Blocks (Editable on Today page)
  scheduleBlocks: ScheduleBlock[];
  addScheduleBlock: (block: Omit<ScheduleBlock, 'id'>) => void;
  updateScheduleBlock: (id: string, updates: Partial<ScheduleBlock>) => void;
  deleteScheduleBlock: (id: string) => void;
  resetScheduleBlocks: () => void;

  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
  rescheduleTask: (id: string, newDate: string) => void;
  setTop3Priority: (taskId: string, isTop3: boolean) => void;

  // Exams
  exams: Exam[];
  addExam: (exam: Omit<Exam, 'id'>) => void;
  updateExam: (id: string, updates: Partial<Exam>) => void;
  deleteExam: (id: string) => void;

  // Companies & Placements
  companies: Company[];
  addCompany: (company: Omit<Company, 'id'>) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;

  // L&T Question Logs
  ltQuestionLogs: LTQuestionLog[];
  updateLTQuestionLog: (id: string, updates: Partial<LTQuestionLog>) => void;
  addLTQuestionLog: (log: Omit<LTQuestionLog, 'id'>) => void;

  // DSA
  dsaProblems: DSAProblem[];
  addDSAProblem: (problem: Omit<DSAProblem, 'id'>) => void;
  updateDSAProblem: (id: string, updates: Partial<DSAProblem>) => void;
  deleteDSAProblem: (id: string) => void;
  toggleDSASolved: (id: string) => void;
  toggleDSARevision: (id: string) => void;

  // Data Science
  dsTopics: DataScienceTopic[];
  updateDSTopic: (id: string, updates: Partial<DataScienceTopic>) => void;

  // Web Dev
  webDevTopics: WebDevTopic[];
  updateWebDevTopic: (id: string, updates: Partial<WebDevTopic>) => void;

  // Major Project
  projectTasks: ProjectTask[];
  projectMilestones: ProjectMilestone[];
  addProjectTask: (task: Omit<ProjectTask, 'id'>) => void;
  updateProjectTask: (id: string, updates: Partial<ProjectTask>) => void;
  deleteProjectTask: (id: string) => void;
  updateMilestone: (id: string, updates: Partial<ProjectMilestone>) => void;

  // Client Work
  clientProjects: ClientProject[];
  addClientProject: (project: Omit<ClientProject, 'id'>) => void;
  updateClientProject: (id: string, updates: Partial<ClientProject>) => void;
  deleteClientProject: (id: string) => void;

  // Habits
  habits: Habit[];
  toggleHabit: (habitId: string, dateStr: string) => void;

  // Calendar
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateCalendarEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteCalendarEvent: (id: string) => void;

  // Reviews
  dailyReviews: DailyReview[];
  saveDailyReview: (review: Omit<DailyReview, 'id' | 'createdAt'>) => void;
  rolloverUnfinishedTasks: (fromTomorrowDate?: string) => number;

  // Time Tracker / Timer
  activeTimer: ActiveTimer;
  timeSessions: TimeSession[];
  startTimer: (presetMinutes: number, category: TaskCategory, taskTitle: string) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: (logSession?: boolean) => void;
  addTimeSession: (session: Omit<TimeSession, 'id'>) => void;

  // Notification Toast & Reset
  notification: string | null;
  showNotification: (msg: string) => void;
  resetAllToSeedData: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'placement_command_center_v2';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [currentSimulatedDate, setCurrentSimulatedDate] = useState<string>('2026-09-27');
  const [isSimulatedMode, setIsSimulatedMode] = useState<boolean>(true);
  const [scheduleBlocks, setScheduleBlocks] = useState<ScheduleBlock[]>(INITIAL_SCHEDULE_BLOCKS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [ltQuestionLogs, setLtQuestionLogs] = useState<LTQuestionLog[]>(INITIAL_LT_QUESTION_LOGS);
  const [dsaProblems, setDsaProblems] = useState<DSAProblem[]>(INITIAL_DSA_PROBLEMS);
  const [dsTopics, setDsTopics] = useState<DataScienceTopic[]>(INITIAL_DATA_SCIENCE_TOPICS);
  const [webDevTopics, setWebDevTopics] = useState<WebDevTopic[]>(INITIAL_WEB_DEV_TOPICS);
  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>(INITIAL_PROJECT_TASKS);
  const [projectMilestones, setProjectMilestones] = useState<ProjectMilestone[]>(INITIAL_PROJECT_MILESTONES);
  const [clientProjects, setClientProjects] = useState<ClientProject[]>(INITIAL_CLIENT_PROJECTS);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);
  const [dailyReviews, setDailyReviews] = useState<DailyReview[]>([]);
  const [timeSessions, setTimeSessions] = useState<TimeSession[]>(INITIAL_TIME_SESSIONS);
  const [notification, setNotification] = useState<string | null>(null);

  // Active Timer state
  const [activeTimer, setActiveTimer] = useState<ActiveTimer>({
    isRunning: false,
    secondsRemaining: 25 * 60,
    totalSeconds: 25 * 60,
    category: 'Placement',
    taskTitle: 'Focus Session',
    presetMinutes: 25,
  });

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    if (typeof document !== 'undefined') {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.scheduleBlocks) setScheduleBlocks(parsed.scheduleBlocks);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.exams) setExams(parsed.exams);
        if (parsed.companies) setCompanies(parsed.companies);
        if (parsed.ltQuestionLogs) setLtQuestionLogs(parsed.ltQuestionLogs);
        if (parsed.dsaProblems) setDsaProblems(parsed.dsaProblems);
        if (parsed.dsTopics) setDsTopics(parsed.dsTopics);
        if (parsed.webDevTopics) setWebDevTopics(parsed.webDevTopics);
        if (parsed.projectTasks) setProjectTasks(parsed.projectTasks);
        if (parsed.projectMilestones) setProjectMilestones(parsed.projectMilestones);
        if (parsed.clientProjects) setClientProjects(parsed.clientProjects);
        if (parsed.habits) setHabits(parsed.habits);
        if (parsed.calendarEvents) setCalendarEvents(parsed.calendarEvents);
        if (parsed.dailyReviews) setDailyReviews(parsed.dailyReviews);
        if (parsed.timeSessions) setTimeSessions(parsed.timeSessions);
        if (parsed.currentSimulatedDate) setCurrentSimulatedDate(parsed.currentSimulatedDate);
      } else {
        // Apply default dark class
        if (typeof document !== 'undefined') {
          document.documentElement.classList.add('dark');
        }
      }
    } catch (e) {
      console.warn('Failed to load from localStorage:', e);
    }
  }, []);

  // Save to local storage whenever state changes
  useEffect(() => {
    try {
      const payload = {
        theme,
        scheduleBlocks,
        tasks,
        exams,
        companies,
        ltQuestionLogs,
        dsaProblems,
        dsTopics,
        webDevTopics,
        projectTasks,
        projectMilestones,
        clientProjects,
        habits,
        calendarEvents,
        dailyReviews,
        timeSessions,
        currentSimulatedDate,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [
    theme,
    scheduleBlocks,
    tasks,
    exams,
    companies,
    ltQuestionLogs,
    dsaProblems,
    dsTopics,
    webDevTopics,
    projectTasks,
    projectMilestones,
    clientProjects,
    habits,
    calendarEvents,
    dailyReviews,
    timeSessions,
    currentSimulatedDate,
  ]);

  // Timer Tick Engine
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeTimer.isRunning && activeTimer.secondsRemaining > 0) {
      interval = setInterval(() => {
        setActiveTimer((prev) => {
          if (prev.secondsRemaining <= 1) {
            showNotification(`Focus Session Finished: ${prev.taskTitle}`);
            return {
              ...prev,
              isRunning: false,
              secondsRemaining: 0,
            };
          }
          return {
            ...prev,
            secondsRemaining: prev.secondsRemaining - 1,
          };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTimer.isRunning, activeTimer.secondsRemaining]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  // Schedule Block Handlers
  const addScheduleBlock = (block: Omit<ScheduleBlock, 'id'>) => {
    const newBlock: ScheduleBlock = { ...block, id: 'sb-' + Date.now() };
    setScheduleBlocks((prev) => [...prev, newBlock]);
    showNotification('Schedule block added');
  };

  const updateScheduleBlock = (id: string, updates: Partial<ScheduleBlock>) => {
    setScheduleBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
    showNotification('Schedule block updated');
  };

  const deleteScheduleBlock = (id: string) => {
    setScheduleBlocks((prev) => prev.filter((b) => b.id !== id));
    showNotification('Schedule block removed');
  };

  const resetScheduleBlocks = () => {
    setScheduleBlocks(INITIAL_SCHEDULE_BLOCKS);
    showNotification('Schedule restored to default');
  };

  // Timer Handlers
  const startTimer = (presetMinutes: number, category: TaskCategory, taskTitle: string) => {
    setActiveTimer({
      isRunning: true,
      secondsRemaining: presetMinutes * 60,
      totalSeconds: presetMinutes * 60,
      category,
      taskTitle: taskTitle || 'Focus Session',
      presetMinutes,
    });
    showNotification(`Started ${presetMinutes}m timer for ${category}`);
  };

  const pauseTimer = () => {
    setActiveTimer((prev) => ({ ...prev, isRunning: false }));
  };

  const resumeTimer = () => {
    setActiveTimer((prev) => ({ ...prev, isRunning: true }));
  };

  const stopTimer = (logSession: boolean = true) => {
    if (logSession && activeTimer.totalSeconds - activeTimer.secondsRemaining > 60) {
      const minutesSpent = Math.round((activeTimer.totalSeconds - activeTimer.secondsRemaining) / 60);
      addTimeSession({
        category: activeTimer.category,
        taskTitle: activeTimer.taskTitle,
        durationMinutes: minutesSpent,
        startTime: new Date(Date.now() - minutesSpent * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: currentSimulatedDate,
        notes: `Logged focus session (${minutesSpent} mins)`,
      });
    }
    setActiveTimer((prev) => ({
      ...prev,
      isRunning: false,
      secondsRemaining: prev.totalSeconds,
    }));
  };

  const addTimeSession = (session: Omit<TimeSession, 'id'>) => {
    const newSession: TimeSession = {
      ...session,
      id: 'ts-' + Date.now(),
    };
    setTimeSessions((prev) => [newSession, ...prev]);
    showNotification(`Saved ${session.durationMinutes}m study session`);
  };

  // Task Handlers
  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: 'task-' + Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    showNotification(`Task "${task.title}" created`);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showNotification('Task deleted');
  };

  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isDone = t.status === 'completed';
          return {
            ...t,
            status: isDone ? 'todo' : 'completed',
            completedAt: !isDone ? new Date().toISOString() : undefined,
          };
        }
        return t;
      })
    );
  };

  const rescheduleTask = (id: string, newDate: string) => {
    updateTask(id, { dueDate: newDate });
    showNotification(`Task moved to ${newDate}`);
  };

  const setTop3Priority = (taskId: string, isTop3: boolean) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, isPriorityTop3: isTop3 } : t))
    );
  };

  // Exam Handlers
  const addExam = (exam: Omit<Exam, 'id'>) => {
    const newExam: Exam = { ...exam, id: 'exam-' + Date.now() };
    setExams((prev) => [...prev, newExam]);
    showNotification(`Exam "${exam.name}" added`);
  };

  const updateExam = (id: string, updates: Partial<Exam>) => {
    setExams((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteExam = (id: string) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  // Company Handlers
  const addCompany = (company: Omit<Company, 'id'>) => {
    const newComp: Company = { ...company, id: 'comp-' + Date.now() };
    setCompanies((prev) => [...prev, newComp]);
    showNotification(`Company "${company.name}" tracked`);
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCompany = (id: string) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  // L&T Question Logs
  const updateLTQuestionLog = (id: string, updates: Partial<LTQuestionLog>) => {
    setLtQuestionLogs((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates, updatedAt: currentSimulatedDate } : l))
    );
  };

  const addLTQuestionLog = (log: Omit<LTQuestionLog, 'id'>) => {
    const newLog: LTQuestionLog = { ...log, id: 'ltq-' + Date.now() };
    setLtQuestionLogs((prev) => [...prev, newLog]);
  };

  // DSA Handlers
  const addDSAProblem = (problem: Omit<DSAProblem, 'id'>) => {
    const newProb: DSAProblem = { ...problem, id: 'dsa-' + Date.now() };
    setDsaProblems((prev) => [newProb, ...prev]);
    showNotification(`DSA problem "${problem.title}" added`);
  };

  const updateDSAProblem = (id: string, updates: Partial<DSAProblem>) => {
    setDsaProblems((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteDSAProblem = (id: string) => {
    setDsaProblems((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleDSASolved = (id: string) => {
    setDsaProblems((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const solved = !p.solved;
          return {
            ...p,
            solved,
            status: solved ? 'Solved' : 'In Progress',
            lastPracticed: currentSimulatedDate,
          };
        }
        return p;
      })
    );
  };

  const toggleDSARevision = (id: string) => {
    setDsaProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, revisionRequired: !p.revisionRequired } : p))
    );
  };

  // Data Science Handlers
  const updateDSTopic = (id: string, updates: Partial<DataScienceTopic>) => {
    setDsTopics((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  // Web Dev Handlers
  const updateWebDevTopic = (id: string, updates: Partial<WebDevTopic>) => {
    setWebDevTopics((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  // Major Project Handlers
  const addProjectTask = (task: Omit<ProjectTask, 'id'>) => {
    const newTask: ProjectTask = { ...task, id: 'pt-' + Date.now() };
    setProjectTasks((prev) => [...prev, newTask]);
    showNotification('Project task added');
  };

  const updateProjectTask = (id: string, updates: Partial<ProjectTask>) => {
    setProjectTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteProjectTask = (id: string) => {
    setProjectTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateMilestone = (id: string, updates: Partial<ProjectMilestone>) => {
    setProjectMilestones((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  // Client Work Handlers
  const addClientProject = (project: Omit<ClientProject, 'id'>) => {
    const newProj: ClientProject = { ...project, id: 'cp-' + Date.now() };
    setClientProjects((prev) => [...prev, newProj]);
    showNotification(`Project "${project.projectName}" added`);
  };

  const updateClientProject = (id: string, updates: Partial<ClientProject>) => {
    setClientProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteClientProject = (id: string) => {
    setClientProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Habit Handlers
  const toggleHabit = (habitId: string, dateStr: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const currentVal = !!h.completions[dateStr];
          const newVal = !currentVal;
          const newCompletions = { ...h.completions, [dateStr]: newVal };
          const newStreak = newVal ? h.streak + 1 : Math.max(0, h.streak - 1);
          return {
            ...h,
            completions: newCompletions,
            streak: newStreak,
            bestStreak: Math.max(h.bestStreak, newStreak),
          };
        }
        return h;
      })
    );
  };

  // Calendar Event Handlers
  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = { ...event, id: 'ev-' + Date.now() };
    setCalendarEvents((prev) => [...prev, newEvent]);
    showNotification(`Event "${event.title}" scheduled`);
  };

  const updateCalendarEvent = (id: string, updates: Partial<CalendarEvent>) => {
    setCalendarEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // Daily Review & Rollover Handlers
  const saveDailyReview = (review: Omit<DailyReview, 'id' | 'createdAt'>) => {
    const newReview: DailyReview = {
      ...review,
      id: 'rev-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setDailyReviews((prev) => [newReview, ...prev]);
    showNotification('Daily evening review saved');
  };

  const rolloverUnfinishedTasks = (targetTomorrowDate: string = '2026-09-28') => {
    let rolledCount = 0;
    setTasks((prev) =>
      prev.map((t) => {
        if (t.dueDate === currentSimulatedDate && t.status !== 'completed') {
          rolledCount++;
          return {
            ...t,
            dueDate: targetTomorrowDate,
            notes: (t.notes ? t.notes + ' | ' : '') + `Rolled over from ${currentSimulatedDate}`,
          };
        }
        return t;
      })
    );
    showNotification(`Rolled over ${rolledCount} tasks to ${targetTomorrowDate}`);
    return rolledCount;
  };

  // Reset & Export
  const resetAllToSeedData = () => {
    setScheduleBlocks(INITIAL_SCHEDULE_BLOCKS);
    setTasks(INITIAL_TASKS);
    setExams(INITIAL_EXAMS);
    setCompanies(INITIAL_COMPANIES);
    setLtQuestionLogs(INITIAL_LT_QUESTION_LOGS);
    setDsaProblems(INITIAL_DSA_PROBLEMS);
    setDsTopics(INITIAL_DATA_SCIENCE_TOPICS);
    setWebDevTopics(INITIAL_WEB_DEV_TOPICS);
    setProjectTasks(INITIAL_PROJECT_TASKS);
    setProjectMilestones(INITIAL_PROJECT_MILESTONES);
    setClientProjects(INITIAL_CLIENT_PROJECTS);
    setHabits(INITIAL_HABITS);
    setCalendarEvents(INITIAL_CALENDAR_EVENTS);
    setDailyReviews([]);
    setTimeSessions(INITIAL_TIME_SESSIONS);
    setCurrentSimulatedDate('2026-09-27');
    showNotification('All data reset to default seed state');
  };

  const exportDataJSON = () => {
    return JSON.stringify(
      {
        theme,
        scheduleBlocks,
        tasks,
        exams,
        companies,
        ltQuestionLogs,
        dsaProblems,
        dsTopics,
        webDevTopics,
        projectTasks,
        projectMilestones,
        clientProjects,
        habits,
        calendarEvents,
        dailyReviews,
        timeSessions,
        currentSimulatedDate,
      },
      null,
      2
    );
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.theme) setTheme(parsed.theme);
      if (parsed.scheduleBlocks) setScheduleBlocks(parsed.scheduleBlocks);
      if (parsed.tasks) setTasks(parsed.tasks);
      if (parsed.exams) setExams(parsed.exams);
      if (parsed.companies) setCompanies(parsed.companies);
      if (parsed.ltQuestionLogs) setLtQuestionLogs(parsed.ltQuestionLogs);
      if (parsed.dsaProblems) setDsaProblems(parsed.dsaProblems);
      if (parsed.dsTopics) setDsTopics(parsed.dsTopics);
      if (parsed.webDevTopics) setWebDevTopics(parsed.webDevTopics);
      if (parsed.projectTasks) setProjectTasks(parsed.projectTasks);
      if (parsed.projectMilestones) setProjectMilestones(parsed.projectMilestones);
      if (parsed.clientProjects) setClientProjects(parsed.clientProjects);
      if (parsed.habits) setHabits(parsed.habits);
      if (parsed.calendarEvents) setCalendarEvents(parsed.calendarEvents);
      if (parsed.dailyReviews) setDailyReviews(parsed.dailyReviews);
      if (parsed.timeSessions) setTimeSessions(parsed.timeSessions);
      if (parsed.currentSimulatedDate) setCurrentSimulatedDate(parsed.currentSimulatedDate);
      showNotification('Backup data imported successfully');
      return true;
    } catch (e) {
      showNotification('Failed to parse JSON file');
      return false;
    }
  };

  const phaseInfo = getCurrentPhaseInfo(currentSimulatedDate);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        currentSimulatedDate,
        setCurrentSimulatedDate,
        phaseInfo,
        isSimulatedMode,
        setIsSimulatedMode,
        scheduleBlocks,
        addScheduleBlock,
        updateScheduleBlock,
        deleteScheduleBlock,
        resetScheduleBlocks,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        rescheduleTask,
        setTop3Priority,
        exams,
        addExam,
        updateExam,
        deleteExam,
        companies,
        addCompany,
        updateCompany,
        deleteCompany,
        ltQuestionLogs,
        updateLTQuestionLog,
        addLTQuestionLog,
        dsaProblems,
        addDSAProblem,
        updateDSAProblem,
        deleteDSAProblem,
        toggleDSASolved,
        toggleDSARevision,
        dsTopics,
        updateDSTopic,
        webDevTopics,
        updateWebDevTopic,
        projectTasks,
        projectMilestones,
        addProjectTask,
        updateProjectTask,
        deleteProjectTask,
        updateMilestone,
        clientProjects,
        addClientProject,
        updateClientProject,
        deleteClientProject,
        habits,
        toggleHabit,
        calendarEvents,
        addCalendarEvent,
        updateCalendarEvent,
        deleteCalendarEvent,
        dailyReviews,
        saveDailyReview,
        rolloverUnfinishedTasks,
        activeTimer,
        timeSessions,
        startTimer,
        pauseTimer,
        resumeTimer,
        stopTimer,
        addTimeSession,
        notification,
        showNotification,
        resetAllToSeedData,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
