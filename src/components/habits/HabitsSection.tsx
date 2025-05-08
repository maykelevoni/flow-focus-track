
import React from 'react';
import { useApp } from '../../context/AppContext';
import HabitItem from './HabitItem';
import NewHabitForm from './NewHabitForm';

const HabitsSection: React.FC = () => {
  const { habits, activeTab } = useApp();
  
  if (activeTab !== 'habits') return null;
  
  return (
    <div className="pb-20 pt-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Habits</h1>
        <p className="text-gray-500">Build consistent daily routines</p>
      </div>
      
      {habits.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No habits yet. Add your first habit!</p>
        </div>
      ) : (
        <div>
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
