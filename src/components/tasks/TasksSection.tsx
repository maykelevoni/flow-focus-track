
import React from 'react';
import { useApp } from '../../context/AppContext';
import TaskItem from './TaskItem';
import NewTaskForm from './NewTaskForm';
import { Sparkles } from 'lucide-react';
import { Task } from '../../types';

const TasksSection: React.FC = () => {
  const { tasks, activeTab } = useApp();
  
  // Example tasks for empty state
  const exampleTasks: Task[] = [
    {
      id: 'example-1',
      title: 'Comprar itens para o jantar',
      description: 'Legumes, pão e frutas',
      completed: false,
      isExample: true
    },
    {
      id: 'example-2',
      title: 'Enviar e-mail para cliente',
      description: 'Sobre o projeto de marketing',
      completed: true,
      isExample: true
    }
  ];
  
  if (activeTab !== 'tasks') return null;
  
  // Use example tasks if no real tasks exist
  const displayTasks = tasks.length === 0 ? exampleTasks : tasks;
  
  return (
    <div className="pb-20 pt-4 animate-fade-in">
      <div className="mb-6 section-header">
        <h1 className="text-2xl font-bold text-gray-800">Tarefas</h1>
        <p className="text-gray-500">Gerencie suas tarefas diárias</p>
      </div>
      
      {displayTasks.length === 0 ? (
        <div className="empty-state">
          <Sparkles size={40} className="mx-auto mb-4 text-tasks" />
          <p className="text-gray-600 font-medium mb-2">Nenhuma tarefa ainda</p>
          <p className="text-gray-500 text-sm">Adicione sua primeira tarefa usando o botão abaixo!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayTasks.map((task) => (
            <div 
              key={task.id} 
              className={task.isExample ? "example-item example-task" : ""}
            >
              <TaskItem task={task} />
            </div>
          ))}
        </div>
      )}
      
      <NewTaskForm />
    </div>
  );
};

export default TasksSection;
