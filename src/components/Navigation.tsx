
import React from 'react';
import { useApp } from '../context/AppContext';
import { ListTodo, Target, CalendarCheck, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-white border-t border-gray-200 px-4 z-10 shadow-md">
      <Link 
        to="/"
        onClick={() => setActiveTab('tasks')}
        className={`flex flex-col items-center justify-center w-20 h-full transition-colors duration-200 ${
          activeTab === 'tasks' ? 'text-tasks' : 'text-gray-500'
        }`}
      >
        <ListTodo size={24} />
        <span className="text-xs mt-1 font-medium">Tarefas</span>
      </Link>
      <Link 
        to="/"
        onClick={() => setActiveTab('goals')}
        className={`flex flex-col items-center justify-center w-20 h-full transition-colors duration-200 ${
          activeTab === 'goals' ? 'text-goals' : 'text-gray-500'
        }`}
      >
        <Target size={24} />
        <span className="text-xs mt-1 font-medium">Objetivos</span>
      </Link>
      <Link 
        to="/"
        onClick={() => setActiveTab('habits')}
        className={`flex flex-col items-center justify-center w-20 h-full transition-colors duration-200 ${
          activeTab === 'habits' ? 'text-habits' : 'text-gray-500'
        }`}
      >
        <CalendarCheck size={24} />
        <span className="text-xs mt-1 font-medium">Hábitos</span>
      </Link>
      <Link 
        to="/stats"
        onClick={() => setActiveTab('stats')}
        className={`flex flex-col items-center justify-center w-20 h-full transition-colors duration-200 ${
          activeTab === 'stats' ? 'text-purple-500' : 'text-gray-500'
        }`}
      >
        <BarChart size={24} />
        <span className="text-xs mt-1 font-medium">Stats</span>
      </Link>
    </div>
  );
};

export default Navigation;
