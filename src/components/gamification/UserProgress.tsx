
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Progress } from '../ui/progress';
import { Trophy, Award, Star, Check } from 'lucide-react';
import { Badge } from '../ui/badge';

const UserProgress: React.FC = () => {
  const { points, level, nextLevelPoints, achievements } = useApp();
  
  // Calculate percentage progress to next level
  const progressPercentage = Math.min(100, (points / nextLevelPoints) * 100);
  
  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Nível {level}</h3>
          <p className="text-xs text-gray-500">{points} pontos</p>
        </div>
        <div className="flex gap-1">
          {achievements.map((achievement) => (
            <Badge 
              key={achievement.id} 
              variant="outline" 
              className="h-6 w-6 p-0 flex items-center justify-center bg-gray-50 border-gray-200"
              title={achievement.title}
            >
              {achievement.type === 'task' && <Check size={12} className="text-tasks" />}
              {achievement.type === 'goal' && <Trophy size={12} className="text-goals" />}
              {achievement.type === 'habit' && <Star size={12} className="text-habits" />}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Progresso para nível {level + 1}</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2" 
          indicatorClassName="bg-gradient-to-r from-tasks via-goals to-habits" 
        />
      </div>
    </div>
  );
};

export default UserProgress;
