
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/card';
import { CheckSquare, Calendar, Trophy } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const ActivityHistory: React.FC = () => {
  const { tasks, points, level } = useApp();
  
  // Mock data for activity history
  const weeklyData = [
    { name: 'Dom', tarefas: 2, pontos: 20 },
    { name: 'Seg', tarefas: 5, pontos: 50 },
    { name: 'Ter', tarefas: 3, pontos: 30 },
    { name: 'Qua', tarefas: 4, pontos: 40 },
    { name: 'Qui', tarefas: 2, pontos: 25 },
    { name: 'Sex', tarefas: 6, pontos: 70 },
    { name: 'Sab', tarefas: 3, pontos: 35 },
  ];
  
  // Recent activity data (would normally come from context)
  const recentActivities = [
    { id: 1, type: 'task', title: 'Completou: Responder emails importantes', time: '15min atrás' },
    { id: 2, type: 'achievement', title: 'Desbloqueou: Streak Inicial', time: '2h atrás' },
    { id: 3, type: 'level', title: 'Alcançou Nível 2', time: '1d atrás' },
    { id: 4, type: 'task', title: 'Completou: Comprar presentes de aniversário', time: '2d atrás' },
  ];
  
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="text-md font-medium mb-2">Atividade Semanal</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="tarefas" fill="#4C1D95" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-md font-medium mb-2">Atividades Recentes</h3>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <div className={`mr-3 p-1.5 rounded-full ${
                activity.type === 'task' ? 'bg-tasks/10 text-tasks' :
                activity.type === 'achievement' ? 'bg-habits/10 text-habits' :
                'bg-goals/10 text-goals'
              }`}>
                {activity.type === 'task' ? <CheckSquare size={14} /> : 
                 activity.type === 'achievement' ? <Trophy size={14} /> :
                 <Calendar size={14} />}
              </div>
              <div className="flex-1">
                <p className="text-sm">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ActivityHistory;
