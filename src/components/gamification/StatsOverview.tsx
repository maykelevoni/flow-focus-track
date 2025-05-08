
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/card';
import { Trophy, CheckSquare, Flame, Star } from 'lucide-react';

const StatsOverview: React.FC = () => {
  const { tasks, habits, points, achievements, streaks } = useApp();
  
  // Calculate stats
  const completedTasks = tasks.filter(task => task.completed).length;
  const longestStreak = Object.values(streaks).reduce((max, current) => 
    current > max ? current : max, 0);
  const totalAchievements = achievements.length;
  
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <Card className="p-3 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-1 text-tasks">
          <CheckSquare size={16} className="mr-1" />
        </div>
        <p className="text-xl font-bold">{completedTasks}</p>
        <p className="text-xs text-gray-500">Tarefas Concluídas</p>
      </Card>
      
      <Card className="p-3 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-1 text-orange-500">
          <Flame size={16} className="mr-1" />
        </div>
        <p className="text-xl font-bold">{longestStreak}</p>
        <p className="text-xs text-gray-500">Maior Streak</p>
      </Card>
      
      <Card className="p-3 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-1 text-purple-500">
          <Star size={16} className="mr-1" />
        </div>
        <p className="text-xl font-bold">{points}</p>
        <p className="text-xs text-gray-500">Pontos Totais</p>
      </Card>
      
      <Card className="p-3 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-1 text-goals">
          <Trophy size={16} className="mr-1" />
        </div>
        <p className="text-xl font-bold">{totalAchievements}</p>
        <p className="text-xs text-gray-500">Conquistas</p>
      </Card>
    </div>
  );
};

export default StatsOverview;
