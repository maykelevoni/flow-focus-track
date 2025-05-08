
import React from 'react';
import { AppProvider } from '../context/AppContext';
import Navigation from '../components/Navigation';
import TasksSection from '../components/tasks/TasksSection';
import GoalsSection from '../components/goals/GoalsSection';
import HabitsSection from '../components/habits/HabitsSection';
import CompletionConfetti from '../components/gamification/CompletionConfetti';

const Index: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen">
        <div className="container px-4 max-w-md mx-auto pb-16 pt-4">
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl shadow-sm p-4 min-h-screen">
            <TasksSection />
            <GoalsSection />
            <HabitsSection />
          </div>
        </div>
        <Navigation />
        <CompletionConfetti />
      </div>
    </AppProvider>
  );
};

export default Index;
