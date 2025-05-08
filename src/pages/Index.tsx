
import React from 'react';
import { AppProvider } from '../context/AppContext';
import Navigation from '../components/Navigation';
import TasksSection from '../components/tasks/TasksSection';
import GoalsSection from '../components/goals/GoalsSection';
import HabitsSection from '../components/habits/HabitsSection';

const Index: React.FC = () => {
  return (
    <AppProvider>
      <div className="container px-4 max-w-md mx-auto min-h-screen">
        <div className="py-2"></div>
        <TasksSection />
        <GoalsSection />
        <HabitsSection />
        <Navigation />
      </div>
    </AppProvider>
  );
};

export default Index;
