'use client';

import React, { useState } from 'react';
import { TopCards } from '@/components/dashboard/TopCards';
import { RecommendationBanner } from '@/components/dashboard/RecommendationBanner';
import { CountdownsRow } from '@/components/dashboard/CountdownsRow';
import { TodayPreview } from '@/components/dashboard/TodayPreview';
import { FixedCommitmentsBar } from '@/components/dashboard/FixedCommitmentsBar';
import { PhaseProgressBanner } from '@/components/dashboard/PhaseProgressBanner';
import { TaskModal } from '@/components/today/TaskModal';

export default function DashboardPage() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Top Metrics Cards (6 Core Performance Indicators) */}
      <TopCards />

      {/* 2. "What Should I Do Now?" Dynamic Recommendation Banner */}
      <RecommendationBanner />

      {/* 3. October Sprint Phase Progress */}
      <PhaseProgressBanner />

      {/* 4. Active Countdown Timelines */}
      <CountdownsRow />

      {/* 5. Fixed Daily Protections (Classes, Gym, Cricket, Sleep) */}
      <FixedCommitmentsBar />

      {/* 6. Today's Mission & Action Checklist */}
      <TodayPreview onOpenNewTaskModal={() => setIsTaskModalOpen(true)} />

      {/* Task Creation Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </div>
  );
}
