
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Trophy, Check, Star, Lock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

// Define upcoming achievements that haven't been unlocked yet
const upcomingAchievements = [
  {
    id: 'upcoming-1',
    title: 'Produtividade Expert',
    description: 'Complete 25 tarefas',
    type: 'task',
    unlocked: false
  },
  {
    id: 'upcoming-2',
    title: 'Streaker',
    description: 'Mantenha um hábito por 14 dias consecutivos',
    type: 'habit',
    unlocked: false
  },
  {
    id: 'upcoming-3',
    title: 'Objetivo Mestre',
    description: 'Complete 5 objetivos',
    type: 'goal',
    unlocked: false
  }
];

const AchievementsPanel: React.FC = () => {
  const { achievements } = useApp();
  
  // Combine real and upcoming achievements
  const allAchievements = [...achievements, ...upcomingAchievements];
  
  // Filter achievements by type
  const taskAchievements = allAchievements.filter(a => a.type === 'task');
  const habitAchievements = allAchievements.filter(a => a.type === 'habit');
  const goalAchievements = allAchievements.filter(a => a.type === 'goal');
  
  const renderAchievementCard = (achievement: any) => {
    return (
      <Card 
        key={achievement.id}
        className={`p-3 mb-2 relative ${!achievement.unlocked ? 'opacity-50' : ''}`}
      >
        <div className="flex items-center">
          <div className={`mr-3 rounded-full p-2 ${
            achievement.type === 'task' ? 'bg-tasks/10 text-tasks' :
            achievement.type === 'habit' ? 'bg-habits/10 text-habits' :
            'bg-goals/10 text-goals'
          }`}>
            {achievement.type === 'task' ? <Check size={16} /> : 
             achievement.type === 'habit' ? <Star size={16} /> :
             <Trophy size={16} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">{achievement.title}</h4>
              {!achievement.unlocked && <Lock size={12} className="text-gray-400" />}
            </div>
            <p className="text-xs text-gray-500">{achievement.description}</p>
          </div>
          {achievement.unlocked && (
            <Badge className="absolute top-2 right-2 text-xs bg-green-500 hover:bg-green-600">
              Desbloqueado
            </Badge>
          )}
        </div>
      </Card>
    );
  };
  
  return (
    <div>
      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="tasks" className="text-tasks">Tarefas</TabsTrigger>
          <TabsTrigger value="habits" className="text-habits">Hábitos</TabsTrigger>
          <TabsTrigger value="goals" className="text-goals">Objetivos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {allAchievements.map(renderAchievementCard)}
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-0">
          {taskAchievements.map(renderAchievementCard)}
        </TabsContent>
        
        <TabsContent value="habits" className="mt-0">
          {habitAchievements.map(renderAchievementCard)}
        </TabsContent>
        
        <TabsContent value="goals" className="mt-0">
          {goalAchievements.map(renderAchievementCard)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AchievementsPanel;
