
import React from 'react';
import { useApp } from '../../context/AppContext';
import GoalItem from './GoalItem';
import NewGoalForm from './NewGoalForm';
import { Target } from 'lucide-react';
import { Goal, Task } from '../../types';

const GoalsSection: React.FC = () => {
  const { goals, activeTab } = useApp();
  
  // Example goals for empty state
  const exampleTasks: Task[] = [
    {
      id: 'example-task-1',
      title: 'Pesquisar universidades',
      description: 'Comparar programas e taxas',
      completed: true,
      isExample: true
    },
    {
      id: 'example-task-2',
      title: 'Preparar documentos',
      description: 'Reunir certificados e histórico',
      completed: false,
      isExample: true
    }
  ];
  
  const exampleGoals: Goal[] = [
    {
      id: 'example-goal-1',
      title: 'Estudar para o vestibular',
      description: 'Preparação para as provas de admissão universitária',
      tasks: exampleTasks,
      isExample: true
    }
  ];
  
  if (activeTab !== 'goals') return null;
  
  // Use example goals if no real goals exist
  const displayGoals = goals.length === 0 ? exampleGoals : goals;
  
  return (
    <div className="pb-20 pt-4 animate-fade-in">
      <div className="mb-6 section-header goals-header">
        <h1 className="text-2xl font-bold text-gray-800">Objetivos</h1>
        <p className="text-gray-500">Acompanhe seus objetivos de longo prazo</p>
      </div>
      
      {displayGoals.length === 0 ? (
        <div className="empty-state">
          <Target size={40} className="mx-auto mb-4 text-goals" />
          <p className="text-gray-600 font-medium mb-2">Nenhum objetivo ainda</p>
          <p className="text-gray-500 text-sm">Adicione seu primeiro objetivo usando o botão abaixo!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayGoals.map((goal) => (
            <div 
              key={goal.id} 
              className={goal.isExample ? "example-item example-goal" : ""}
            >
              <GoalItem goal={goal} />
            </div>
          ))}
        </div>
      )}
      
      <NewGoalForm />
    </div>
  );
};

export default GoalsSection;
