'use client';

import React, { useState, ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { TaskModal } from '../today/TaskModal';

export const AppShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors duration-200">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 pb-16 lg:pb-0">
        <Header
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenNewTaskModal={() => setIsTaskModalOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>

        <BottomNav />
      </div>

      {/* Global Quick Add Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </div>
  );
};
