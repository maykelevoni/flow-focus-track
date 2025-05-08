
import React from 'react';
import { useApp } from '../../context/AppContext';
import TaskItem from './TaskItem';
import NewTaskForm from './NewTaskForm';
import { Sparkles } from 'lucide-react';

const TasksSection: React.FC = () => {
  const { tasks, activeTab } = useApp();
  
  if (activeTab !== 'tasks') return null;
  
  return (
    <div className="pb-20 pt-4 animate-fade-in">
      <div className="mb-6 section-header">
        <h1 className="text-2xl font-bold text-gray-800">Tarefas</h1>
        <p className="text-gray-500">Gerencie suas tarefas diárias</p>
      </div>
      
      {tasks.length === 0 ? (
        <div className="empty-state">
          <Sparkles size={40} className="mx-auto mb-4 text-tasks" />
          <p className="text-gray-600 font-medium mb-2">Nenhuma tarefa ainda</p>
          <p className="text-gray-500 text-sm">Adicione sua primeira tarefa usando o botão abaixo!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.filter(task => !task.goalId).map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
      
      <NewTaskForm />
    </div>
  );
};

export default TasksSection;
