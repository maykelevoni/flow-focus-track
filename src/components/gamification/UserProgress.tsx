
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Progress } from '../ui/progress';
import { Trophy, Award, Star, Check, BarChart, Flame } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import GamificationDashboard from './GamificationDashboard';

const UserProgress: React.FC = () => {
  const { points, level, nextLevelPoints, achievements, streaks } = useApp();
  const [showDashboard, setShowDashboard] = useState(false);
  
  // Calculate percentage progress to next level
  const progressPercentage = Math.min(100, (points / nextLevelPoints) * 100);
  
  // Calculate highest streak
  const highestStreak = Object.values(streaks).reduce(
    (max, current) => current > max ? current : max, 0
  );
  
  return (
    <>
      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-700">Nível {level}</h3>
            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
              {points} pts
            </span>
            
            {highestStreak > 0 && (
              <Badge className="flex items-center gap-1 text-xs bg-orange-500 hover:bg-orange-600">
                <Flame size={10} /> {highestStreak}
              </Badge>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs gap-1"
            onClick={() => setShowDashboard(true)}
          >
            <BarChart size={14} />
            Estatísticas
          </Button>
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
        
        {achievements.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {achievements.slice(0, 5).map((achievement) => (
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
            {achievements.length > 5 && (
              <Badge variant="outline" className="h-6 px-1 flex items-center justify-center border-gray-200 text-xs">
                +{achievements.length - 5}
              </Badge>
            )}
          </div>
        )}
      </div>
      
      <GamificationDashboard 
        open={showDashboard} 
        onOpenChange={setShowDashboard} 
      />
    </>
  );
};

export default UserProgress;
