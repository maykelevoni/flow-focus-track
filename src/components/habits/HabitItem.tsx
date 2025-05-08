
import React, { useState } from 'react';
import { Habit } from '../../types';
import { useApp } from '../../context/AppContext';
import { Trash2, Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface HabitItemProps {
  habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit }) => {
  const { updateHabit, deleteHabit, toggleHabitDay } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(habit.title);
  
  const completedDays = habit.days.filter(day => day.completed).length;
  const progress = (completedDays / habit.days.length) * 100;
  
  const handleSaveEdit = () => {
    if (habit.isExample) return; // Prevent editing example habits
    if (!editedTitle.trim()) return;
    updateHabit({ ...habit, title: editedTitle });
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setEditedTitle(habit.title);
    setIsEditing(false);
  };
  
  const handleToggleDay = (index: number) => {
    if (habit.isExample) return; // Prevent editing example habits
    toggleHabitDay(habit.id, index);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4 overflow-hidden">
      <div className="p-4">
        {isEditing ? (
          <div className="flex items-center mb-4">
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="mr-2"
            />
            <div className="flex space-x-1">
              <Button 
                size="sm" 
                onClick={handleSaveEdit} 
                className="bg-habits hover:bg-habits/90"
              >
                Save
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800">{habit.title}</h3>
            
            <div className="flex items-center space-x-1">
              {!habit.isExample && (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-gray-500 hover:text-habits rounded-full"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={() => deleteHabit(habit.id)}
                    className="p-2 text-gray-500 hover:text-red-500 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="grid grid-cols-7 gap-1">
            {habit.days.map((day, index) => (
              <button
                key={day.day}
                onClick={() => handleToggleDay(index)}
                disabled={habit.isExample}
                className={`w-full aspect-square rounded-md flex items-center justify-center text-xs font-medium
                  ${day.completed 
                    ? 'bg-habits text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {day.day.charAt(0)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Weekly progress</span>
            <span>{completedDays}/{habit.days.length} days</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-habits"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
