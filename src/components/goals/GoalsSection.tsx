
import React from 'react';
import { useApp } from '../../context/AppContext';
import GoalItem from './GoalItem';
import NewGoalForm from './NewGoalForm';
import { Target } from 'lucide-react';

const GoalsSection: React.FC = () => {
  const { goals, activeTab } = useApp();
  
  if (activeTab !== 'goals') return null;
  
  return (
    <div className="pb-20 pt-4 animate-fade-in">
      <div className="mb-6 section-header">
        <h1 className="text-2xl font-bold text-gray-800">Objetivos</h1>
        <p className="text-gray-500">Acompanhe seus objetivos de longo prazo</p>
      </div>
      
      {goals.length === 0 ? (
        <div className="empty-state">
          <Target size={40} className="mx-auto mb-4 text-goals" />
          <p className="text-gray-600 font-medium mb-2">Nenhum objetivo ainda</p>
          <p className="text-gray-500 text-sm">Adicione seu primeiro objetivo usando o botão abaixo!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
        </div>
      )}
      
      <NewGoalForm />
    </div>
  );
};

export default GoalsSection;
