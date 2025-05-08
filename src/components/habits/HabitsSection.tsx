
import React from 'react';
import { useApp } from '../../context/AppContext';
import HabitItem from './HabitItem';
import NewHabitForm from './NewHabitForm';
import { CalendarCheck } from 'lucide-react';
import { Habit } from '../../types';

const HabitsSection: React.FC = () => {
  const { habits, activeTab } = useApp();
  
  // Example habits with predefined days for empty state
  const exampleHabits: Habit[] = [
    {
      id: 'example-habit-1',
      title: 'Exercício físico diário',
      days: [
        { day: 'Dom', completed: true },
        { day: 'Seg', completed: true },
        { day: 'Ter', completed: false },
        { day: 'Qua', completed: true },
        { day: 'Qui', completed: false },
        { day: 'Sex', completed: false },
        { day: 'Sab', completed: true }
      ],
      isExample: true
    },
    {
      id: 'example-habit-2',
      title: 'Meditação matinal',
      days: [
        { day: 'Dom', completed: false },
        { day: 'Seg', completed: true },
        { day: 'Ter', completed: true },
        { day: 'Qua', completed: true },
        { day: 'Qui', completed: true },
        { day: 'Sex', completed: false },
        { day: 'Sab', completed: false }
      ],
      isExample: true
    }
  ];
  
  if (activeTab !== 'habits') return null;
  
  // Use example habits if no real habits exist
  const displayHabits = habits.length === 0 ? exampleHabits : habits;
  
  return (
    <div className="pb-20 pt-4 animate-fade-in">
      <div className="mb-6 section-header habits-header">
        <h1 className="text-2xl font-bold text-gray-800">Hábitos</h1>
        <p className="text-gray-500">Construa rotinas diárias consistentes</p>
      </div>
      
      {displayHabits.length === 0 ? (
        <div className="empty-state">
          <CalendarCheck size={40} className="mx-auto mb-4 text-habits" />
          <p className="text-gray-600 font-medium mb-2">Nenhum hábito ainda</p>
          <p className="text-gray-500 text-sm">Adicione seu primeiro hábito usando o botão abaixo!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayHabits.map((habit) => (
            <div 
              key={habit.id} 
              className={habit.isExample ? "example-item example-habit" : ""}
            >
              <HabitItem habit={habit} />
            </div>
          ))}
        </div>
      )}
      
      <NewHabitForm />
    </div>
  );
};

export default HabitsSection;
