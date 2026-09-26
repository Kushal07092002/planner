import { Task, Exam, Recommendation, PriorityLevel } from '../types';
import { getDaysDifference } from './utils';

export interface CurrentPhaseInfo {
  phaseName: string;
  highestPrioritySubject: string;
  sprintActive: boolean;
  daysRemainingInPhase: number;
  nextCriticalMilestone: string;
  nextCriticalDate: string;
  phaseBannerDescription: string;
}

export function getCurrentPhaseInfo(currentDate: string = '2026-09-27'): CurrentPhaseInfo {
  if (currentDate <= '2026-10-03') {
    const days = getDaysDifference('2026-10-03', currentDate);
    return {
      phaseName: 'Phase 1: Physics Wallah Sprint',
      highestPrioritySubject: 'Physics Wallah Preparation',
      sprintActive: true,
      daysRemainingInPhase: Math.max(0, days),
      nextCriticalMilestone: 'Physics Wallah Exam',
      nextCriticalDate: '2026-10-03',
      phaseBannerDescription: `Oct 3 Exam approaching in ${days} days! Focus on core Physics, pedagogy, and numerical problem solving.`,
    };
  } else if (currentDate <= '2026-10-07') {
    const days = getDaysDifference('2026-10-07', currentDate);
    return {
      phaseName: 'Phase 2: Course Exams Sprint',
      highestPrioritySubject: 'Course Examinations',
      sprintActive: true,
      daysRemainingInPhase: Math.max(0, days),
      nextCriticalMilestone: 'Course Exams (Oct 5 & Oct 7)',
      nextCriticalDate: '2026-10-07',
      phaseBannerDescription: `Semester Exams active! Revise Statistical Inference & Deep Learning architectures.`,
    };
  } else if (currentDate <= '2026-10-12') {
    const days = getDaysDifference('2026-10-12', currentDate);
    return {
      phaseName: 'Phase 3: L&T Placement Sprint',
      highestPrioritySubject: 'L&T Preparation',
      sprintActive: true,
      daysRemainingInPhase: Math.max(0, days),
      nextCriticalMilestone: 'L&T Placement Exam',
      nextCriticalDate: '2026-10-12',
      phaseBannerDescription: `L&T Placement Exam on Oct 12 (${days} days left). Intensive Quantitative Aptitude, Logical Reasoning & Core Tech prep.`,
    };
  } else if (currentDate <= '2026-10-16') {
    const days = getDaysDifference('2026-10-16', currentDate);
    return {
      phaseName: 'Phase 4: MOOCs Final Exam Sprint',
      highestPrioritySubject: 'MOOCs Preparation',
      sprintActive: true,
      daysRemainingInPhase: Math.max(0, days),
      nextCriticalMilestone: 'MOOCs Exam',
      nextCriticalDate: '2026-10-16',
      phaseBannerDescription: `Final sprint exam on Oct 16 (${days} days left). Complete online modules and past papers.`,
    };
  } else {
    const daysDSA = getDaysDifference('2027-01-31', currentDate);
    return {
      phaseName: 'Phase 5: Long-Term Placement & Skill Mastery',
      highestPrioritySubject: 'DSA & Full-Stack Tech Mastery',
      sprintActive: false,
      daysRemainingInPhase: Math.max(0, daysDSA),
      nextCriticalMilestone: 'January 2027 Placement Ready',
      nextCriticalDate: '2027-01-31',
      phaseBannerDescription: `Long-term development active. Target: 2h daily DSA, 1.5h Data Science, 1h Web Dev, and Major Project.`,
    };
  }
}

export function calculateDynamicPriority(deadline: string, currentDate: string = '2026-09-27'): PriorityLevel {
  const days = getDaysDifference(deadline, currentDate);
  if (days <= 3) return 'critical';
  if (days <= 7) return 'high';
  if (days <= 14) return 'medium';
  return 'low';
}

export function getSmartRecommendation(
  tasks: Task[],
  exams: Exam[],
  currentDate: string = '2026-09-27',
  currentHour: number = 9
): Recommendation {
  const phaseInfo = getCurrentPhaseInfo(currentDate);

  // 1. Check if there are urgent unfinished critical tasks for today
  const pendingCriticalToday = tasks.filter(
    (t) => t.status !== 'completed' && t.dueDate === currentDate && t.priority === 'critical'
  );

  if (pendingCriticalToday.length > 0) {
    const topTask = pendingCriticalToday[0];
    return {
      title: topTask.title,
      subtitle: `Highest Priority Critical Task for Today (${topTask.category})`,
      priority: 'critical',
      reason: `Aligned with current ${phaseInfo.phaseName}. Needs immediate focus to maintain daily sprint momentum.`,
      actionText: 'Start 45m Focus Session',
      category: topTask.category,
      suggestedMinutes: topTask.estimatedMinutes || 45,
    };
  }

  // 2. Check approaching exams
  const upcomingExams = exams
    .filter((e) => e.status === 'upcoming' && e.date >= currentDate)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (upcomingExams.length > 0) {
    const nextExam = upcomingExams[0];
    const daysToExam = getDaysDifference(nextExam.date, currentDate);

    if (daysToExam <= 6) {
      return {
        title: `${nextExam.name} Intensive Preparation`,
        subtitle: `Exam in ${daysToExam} days (${nextExam.date})`,
        priority: 'critical',
        reason: `Your next major exam milestone is ${nextExam.name}. High test readiness is required.`,
        actionText: 'Open Exam Checklist & Practice',
        category: 'Placement',
        suggestedMinutes: 60,
      };
    }
  }

  // 3. Fallback to daily core DSA or Project
  const pendingDSA = tasks.find((t) => t.category === 'DSA' && t.status !== 'completed');
  if (pendingDSA) {
    return {
      title: pendingDSA.title,
      subtitle: 'Daily 2-Hour DSA Long-Term Pillar',
      priority: 'high',
      reason: 'Protecting your 2-hour daily DSA habit ensures you stay on track for January 2027 placements.',
      actionText: 'Launch DSA Timer (70m Solving)',
      category: 'DSA',
      suggestedMinutes: 70,
    };
  }

  const pendingProject = tasks.find((t) => t.category === 'Major Project' && t.status !== 'completed');
  if (pendingProject) {
    return {
      title: pendingProject.title,
      subtitle: 'Semester Major Project (Due Nov 27, 2026)',
      priority: 'critical',
      reason: '2-month project deadline requires steady daily contributions to prevent end-of-semester crisis.',
      actionText: 'Work on Project Milestone',
      category: 'Major Project',
      suggestedMinutes: 60,
    };
  }

  return {
    title: 'Daily Review & Next Step Planning',
    subtitle: 'All immediate urgent targets completed for this block!',
    priority: 'medium',
    reason: 'Great job staying on schedule. Review your achievements or get ahead on upcoming topic revisions.',
    actionText: 'Log Daily Evening Review',
    category: 'General',
    suggestedMinutes: 15,
  };
}

export function calculateDailyProductivityScore(tasks: Task[], currentDate: string = '2026-09-27'): number {
  const todaysTasks = tasks.filter((t) => t.dueDate === currentDate);
  if (todaysTasks.length === 0) return 100;

  const weights: Record<PriorityLevel, number> = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1,
  };

  let totalWeight = 0;
  let completedWeight = 0;

  for (const task of todaysTasks) {
    const w = weights[task.priority] || 2;
    totalWeight += w;
    if (task.status === 'completed') {
      completedWeight += w;
    } else if (task.status === 'in_progress') {
      completedWeight += w * 0.4;
    }
  }

  return Math.round((completedWeight / totalWeight) * 100);
}
