
import React from 'react';
import { useApp } from '../../context/AppContext';
import HabitItem from './HabitItem';
import NewHabitForm from './NewHabitForm';
import { CalendarCheck } from 'lucide-react';

const HabitsSection: React.FC = () => {
  const { habits, activeTab } = useApp();
  
  if (activeTab !== 'habits') return null;
  
  return (
    <div className="pb-20 pt-4 animate-fade-in">
      <div className="mb-6 section-header">
        <h1 className="text-2xl font-bold text-gray-800">Hábitos</h1>
        <p className="text-gray-500">Construa rotinas diárias consistentes</p>
      </div>
      
      {habits.length === 0 ? (
        <div className="empty-state">
          <CalendarCheck size={40} className="mx-auto mb-4 text-habits" />
          <p className="text-gray-600 font-medium mb-2">Nenhum hábito ainda</p>
          <p className="text-gray-500 text-sm">Adicione seu primeiro hábito usando o botão abaixo!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </div>
      )}
      
      <NewHabitForm />
    </div>
  );
};

export default HabitsSection;
