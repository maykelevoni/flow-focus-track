
import React from 'react';
import { useApp } from '../../context/AppContext';
import GoalItem from './GoalItem';
import NewGoalForm from './NewGoalForm';

const GoalsSection: React.FC = () => {
  const { goals, activeTab } = useApp();
  
  if (activeTab !== 'goals') return null;
  
  return (
    <div className="pb-20 pt-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Goals</h1>
        <p className="text-gray-500">Track your long-term objectives</p>
      </div>
      
      {goals.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No goals yet. Add your first goal!</p>
        </div>
      ) : (
        <div>
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
