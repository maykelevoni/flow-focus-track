
import React from 'react';
import { useApp } from '../../context/AppContext';
import TaskItem from './TaskItem';
import NewTaskForm from './NewTaskForm';

const TasksSection: React.FC = () => {
  const { tasks, activeTab } = useApp();
  
  if (activeTab !== 'tasks') return null;
  
  return (
    <div className="pb-20 pt-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
        <p className="text-gray-500">Manage your daily tasks</p>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No tasks yet. Add your first task!</p>
        </div>
      ) : (
        <div>
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
