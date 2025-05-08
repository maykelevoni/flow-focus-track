
import React, { useState, useEffect } from 'react';
import { Habit } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/badge';
import { Flame } from 'lucide-react';

interface HabitItemProps {
  habit: Habit;
}

const HabitItem = ({ habit }: HabitItemProps) => {
  const { toggleHabitDay, streaks } = useApp();
  const [showStreak, setShowStreak] = useState(false);
  
  // Get current streak for this habit
  const currentStreak = streaks[habit.id] || 0;
  
  // Show animation when streak changes
  useEffect(() => {
    if (currentStreak > 0) {
      setShowStreak(true);
    }
  }, [currentStreak]);
  
  const handleDayToggle = (index: number) => {
    if (habit.isExample) return; // Prevent editing example habits
    toggleHabitDay(habit.id, index);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800">{habit.title}</h3>
        <Badge 
          className={`flex items-center gap-1 ${
            currentStreak > 0 ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 hover:bg-gray-400'
          } ${showStreak && currentStreak > 0 ? 'animate-bounce' : ''}`}
          onAnimationEnd={() => setShowStreak(false)}
        >
          <Flame size={12} /> {currentStreak}
        </Badge>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mt-4">
        {habit.days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDayToggle(index)}
            disabled={habit.isExample}
            className={`
              p-2 rounded text-center transition-colors duration-200
              ${day.completed
                ? 'bg-habits text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }
            `}
          >
            <div className="text-xs font-medium">{day.day}</div>
          </button>
        ))}
      </div>
      
      {currentStreak >= 3 && (
        <div className="mt-3 text-xs text-orange-500 flex items-center">
          <Flame size={12} className="mr-1" />
          {currentStreak >= 7 ? 'Ótimo trabalho! Mantenha o ritmo!' : 
           currentStreak >= 5 ? 'Você está indo muito bem!' : 
           'Você está construindo um bom hábito!'}
        </div>
      )}
    </div>
  );
};

export default HabitItem;
