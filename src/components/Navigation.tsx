
import React from 'react';
import { useApp } from '../context/AppContext';
import { List, Target, Calendar } from 'lucide-react';

const Navigation: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-white border-t border-gray-200 px-4 z-10">
      <button
        onClick={() => setActiveTab('tasks')}
        className={`flex flex-col items-center justify-center w-20 h-full ${
          activeTab === 'tasks' ? 'text-tasks' : 'text-gray-500'
        }`}
      >
        <List size={24} />
        <span className="text-xs mt-1">Tasks</span>
      </button>
      <button
        onClick={() => setActiveTab('goals')}
        className={`flex flex-col items-center justify-center w-20 h-full ${
          activeTab === 'goals' ? 'text-goals' : 'text-gray-500'
        }`}
      >
        <Target size={24} />
        <span className="text-xs mt-1">Goals</span>
      </button>
      <button
        onClick={() => setActiveTab('habits')}
        className={`flex flex-col items-center justify-center w-20 h-full ${
          activeTab === 'habits' ? 'text-habits' : 'text-gray-500'
        }`}
      >
        <Calendar size={24} />
        <span className="text-xs mt-1">Habits</span>
      </button>
    </div>
  );
};

export default Navigation;
