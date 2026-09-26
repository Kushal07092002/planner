export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';

export type TaskCategory = 
  | 'Placement'
  | 'DSA'
  | 'Data Science'
  | 'Web Development'
  | 'Major Project'
  | 'Client Work'
  | 'Academic'
  | 'Health & Fitness'
  | 'General';

export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'cancelled';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: PriorityLevel;
  status: TaskStatus;
  dueDate: string; // YYYY-MM-DD
  estimatedMinutes: number;
  actualMinutes?: number;
  notes?: string;
  completedAt?: string;
  isPriorityTop3?: boolean;
}

export interface ScheduleBlock {
  id: string;
  time: string; // e.g. "07:30 - 08:30 AM"
  title: string;
  category: string;
  type?: 'routine' | 'class' | 'study' | 'project' | 'health' | 'review' | 'custom';
  isFixed?: boolean;
}

export interface Exam {
  id: string;
  name: string;
  type: 'Placement Exam' | 'Academic Exam' | 'Placement / Teaching Staff' | 'Certification';
  date: string; // YYYY-MM-DD
  priority: PriorityLevel;
  companyOrCourse?: string;
  description?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  syllabus?: string[];
  preparednessPercent?: number;
}

export interface Company {
  id: string;
  name: string;
  role: string;
  status: 'Interested' | 'Applied' | 'Preparing' | 'Exam Scheduled' | 'Interview Scheduled' | 'Selected' | 'Rejected' | 'Waiting';
  applicationDate?: string;
  examDate?: string;
  interviewDate?: string;
  packageLPA?: string;
  location?: string;
  notes?: string;
  result?: string;
}

export interface LTQuestionLog {
  id: string;
  section: 'quantitative_aptitude' | 'logical_reasoning' | 'verbal' | 'technical';
  topic: string;
  attempted: number;
  correct: number;
  accuracy: number;
  revisionRequired: boolean;
  notes?: string;
  updatedAt: string;
}

export type DSADifficulty = 'Easy' | 'Medium' | 'Hard';
export type DSAPlatform = 'LeetCode' | 'GeeksforGeeks' | 'CodeStudio' | 'InterviewBit' | 'Striver SDE Sheet' | 'Other';
export type DSAStatus = 'Not Started' | 'In Progress' | 'Solved' | 'Revision Required';

export interface DSAProblem {
  id: string;
  title: string;
  topic: string;
  platform: DSAPlatform;
  difficulty: DSADifficulty;
  status: DSAStatus;
  timeTakenMinutes?: number;
  attempts?: number;
  solved: boolean;
  revisionRequired: boolean;
  notes?: string;
  url?: string;
  lastPracticed?: string;
}

export interface DSATopicProgress {
  topic: string;
  totalProblems: number;
  solvedCount: number;
  targetCount: number;
}

export type TopicStatus = 'Not Started' | 'Learning' | 'Practicing' | 'Completed' | 'Needs Revision';

export interface DataScienceTopic {
  id: string;
  name: string;
  status: TopicStatus;
  hoursSpent: number;
  notesCompleted: boolean;
  projectsCompleted: number;
  notes?: string;
  keyConcepts?: string[];
}

export interface WebDevTopic {
  id: string;
  name: string;
  status: TopicStatus;
  hoursSpent: number;
  notesCompleted: boolean;
  keyConcepts?: string[];
  notes?: string;
}

export type ProjectTaskStatus = 'Backlog' | 'To Do' | 'In Progress' | 'Testing' | 'Documentation' | 'Completed';

export interface ProjectTask {
  id: string;
  title: string;
  description?: string;
  priority: PriorityLevel;
  deadline?: string;
  estimatedHours: number;
  actualHours: number;
  status: ProjectTaskStatus;
  notes?: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  order: number;
  status: 'Pending' | 'In Progress' | 'Completed';
  targetDate: string;
  description?: string;
}

export type ClientWorkStatus = 'Backlog' | 'Editing' | 'Review' | 'Revision' | 'Delivered';

export interface ClientProject {
  id: string;
  clientName: string;
  projectName: string;
  videoType: 'Reel/Short' | 'YouTube Long-form' | 'Commercial Ad' | 'Documentary' | 'Course Edit';
  deadline: string;
  status: ClientWorkStatus;
  hoursSpent: number;
  payment: number;
  currency: string;
  revisionCount: number;
  notes?: string;
}

export interface Habit {
  id: string;
  name: string;
  targetDescription: string;
  iconName: string;
  daysSchedule: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday' | 'daily')[];
  completions: Record<string, boolean>;
  streak: number;
  bestStreak: number;
}

export interface TimeSession {
  id: string;
  category: TaskCategory;
  taskTitle: string;
  durationMinutes: number;
  startTime: string;
  endTime: string;
  date: string;
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  category: 'placement' | 'academic' | 'learning' | 'project' | 'health' | 'client';
  date: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  isAllDay?: boolean;
}

export interface DailyReview {
  id: string;
  date: string;
  completedSummary: string;
  failedSummary: string;
  reasonForMiss: string;
  moveToTomorrow: string;
  tomorrowPriority: string;
  energyLevel: number;
  productivityLevel: number;
  createdAt: string;
}

export interface Recommendation {
  title: string;
  subtitle: string;
  priority: PriorityLevel;
  reason: string;
  actionText: string;
  category: TaskCategory;
  suggestedMinutes: number;
}
