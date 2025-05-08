
import React, { useState } from 'react';
import { Goal, Task } from '../../types';
import { useApp } from '../../context/AppContext';
import { ChevronDown, ChevronUp, Trash2, Pencil, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface GoalItemProps {
  goal: Goal;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal }) => {
  const { updateGoal, deleteGoal, addTaskToGoal, updateTask } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(goal);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  
  const completedTasks = goal.tasks.filter(task => task.completed).length;
  const totalTasks = goal.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const handleSaveEdit = () => {
    if (goal.isExample) return; // Prevent editing example goals
    updateGoal({ ...editedGoal });
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setEditedGoal(goal);
    setIsEditing(false);
  };
  
  const handleAddSubtask = () => {
    if (goal.isExample) return; // Prevent adding tasks to example goals
    if (!newTaskTitle.trim()) return;
    
    addTaskToGoal({
      title: newTaskTitle,
      description: newTaskDescription.trim() || undefined,
      completed: false
    }, goal.id);
    
    // Reset form
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskOpen(false);
  };
  
  const handleToggleTaskComplete = (task: Task) => {
    if (goal.isExample) return; // Prevent editing example goals
    updateTask({ ...task, completed: !task.completed });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4 overflow-hidden">
      {isEditing ? (
        <div className="p-4">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={editedGoal.title}
              onChange={(e) => setEditedGoal({ ...editedGoal, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Textarea
              value={editedGoal.description || ''}
              onChange={(e) => setEditedGoal({ ...editedGoal, description: e.target.value })}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleSaveEdit} className="bg-goals hover:bg-goals/90">Save</Button>
            <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg text-gray-800">{goal.title}</h3>
              
              <div className="flex items-center space-x-1">
                {!goal.isExample && (
                  <>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="p-2 text-gray-500 hover:text-goals rounded-full"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      onClick={() => deleteGoal(goal.id)}
                      className="p-2 text-gray-500 hover:text-red-500 rounded-full"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 text-gray-500 hover:text-goals rounded-full"
                >
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>
            
            {goal.description && (
              <p className="text-sm text-gray-500 mb-3">{goal.description}</p>
            )}
            
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="text-goals font-medium">{`${completedTasks}/${totalTasks} tasks`}</span>
              </div>
              <Progress value={progress} className="h-2" indicatorClassName="bg-goals" />
            </div>
          </div>
          
          {isExpanded && (
            <div className="border-t border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-sm text-gray-700">Sub-tasks</h4>
                {!goal.isExample && (
                  <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Plus size={14} className="mr-1" /> Add Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Task to Goal</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4 mt-2">
                        <div className="space-y-2">
                          <label htmlFor="taskTitle" className="text-sm font-medium">
                            Title <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="taskTitle"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Task title"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="taskDescription" className="text-sm font-medium">
                            Description <span className="text-gray-400">(optional)</span>
                          </label>
                          <Input
                            id="taskDescription"
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                            placeholder="Brief description"
                          />
                        </div>
                        
                        <div className="pt-4 flex justify-end space-x-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setNewTaskOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            type="button" 
                            onClick={handleAddSubtask} 
                            className="bg-goals hover:bg-goals/90"
                          >
                            Add Task
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              
              {goal.tasks.length === 0 ? (
                <p className="text-gray-400 text-sm italic">No tasks yet</p>
              ) : (
                <div className="space-y-2">
                  {goal.tasks.map((task) => (
                    <div key={task.id} className="flex items-center py-2 border-b border-gray-100 last:border-b-0">
                      <button 
                        onClick={() => handleToggleTaskComplete(task)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 border ${
                          task.completed 
                            ? 'bg-goals border-goals' 
                            : 'border-gray-300'
                        }`}
                        disabled={goal.isExample}
                      >
                        {task.completed && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                      </button>
                      
                      <div>
                        <h3 className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GoalItem;
