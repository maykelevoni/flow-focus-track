
import React, { useState } from 'react';
import { Task } from '../../types';
import { useApp } from '../../context/AppContext';
import { Check, Trash2, Pencil, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleToggleComplete = () => {
    if (task.isExample) return; // Prevent editing example tasks
    updateTask({ ...task, completed: !task.completed });
  };

  const handleSaveEdit = () => {
    if (task.isExample) return; // Prevent editing example tasks
    updateTask(editedTask);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-3 overflow-hidden">
      {isEditing ? (
        <div className="p-4">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={editedTask.description || ''}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <Textarea
              value={editedTask.note || ''}
              onChange={(e) => setEditedTask({ ...editedTask, note: e.target.value })}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleSaveEdit} className="bg-tasks hover:bg-tasks/90">Save</Button>
            <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center p-4">
            <button 
              onClick={handleToggleComplete}
              className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 border ${
                task.completed 
                  ? 'bg-tasks border-tasks' 
                  : 'border-gray-300'
              }`}
              disabled={task.isExample}
            >
              {task.completed && <Check size={12} className="text-white" />}
            </button>
            
            <div className="flex-1">
              <h3 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2 ml-2">
              {!task.isExample && (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-gray-500 hover:text-tasks rounded-full"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-gray-500 hover:text-red-500 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="p-2 text-gray-500 hover:text-tasks rounded-full"
              >
                {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>
          
          {showDetails && (
            <div className="px-4 pb-4 pt-0 border-t border-gray-100">
              {task.note && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Notes:</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{task.note}</p>
                </div>
              )}
              
              {task.audioNote && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Audio Note:</h4>
                  <audio controls className="w-full">
                    <source src={task.audioNote} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              
              {!task.note && !task.audioNote && (
                <p className="text-sm text-gray-400 italic">No additional notes</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskItem;
