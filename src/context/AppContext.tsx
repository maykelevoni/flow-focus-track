
import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, Goal, Habit, HabitDay } from '../types';

interface AppContextType {
  tasks: Task[];
  goals: Goal[];
  habits: Habit[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'tasks'>) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (id: string) => void;
  addTaskToGoal: (taskData: Omit<Task, 'id'>, goalId: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'days'>) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  toggleHabitDay: (habitId: string, dayIndex: number) => void;
  activeTab: 'tasks' | 'goals' | 'habits';
  setActiveTab: React.Dispatch<React.SetStateAction<'tasks' | 'goals' | 'habits'>>;
}

const defaultDays: HabitDay[] = [
  { day: 'Mon', completed: false },
  { day: 'Tue', completed: false },
  { day: 'Wed', completed: false },
  { day: 'Thu', completed: false },
  { day: 'Fri', completed: false },
  { day: 'Sat', completed: false },
  { day: 'Sun', completed: false },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [activeTab, setActiveTab] = useState<'tasks' | 'goals' | 'habits'>('tasks');

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedGoals = localStorage.getItem('goals');
    const savedHabits = localStorage.getItem('habits');

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedHabits) setHabits(JSON.parse(savedHabits));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) => 
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

    // If this task is part of a goal, update the goal's tasks too
    if (updatedTask.goalId) {
      setGoals((prevGoals) => 
        prevGoals.map((goal) => {
          if (goal.id === updatedTask.goalId) {
            const updatedTasks = goal.tasks.map((task) => 
              task.id === updatedTask.id ? updatedTask : task
            );
            return { ...goal, tasks: updatedTasks };
          }
          return goal;
        })
      );
    }
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));

    // Also remove from goals if it's a subtask
    setGoals((prevGoals) => 
      prevGoals.map((goal) => ({
        ...goal,
        tasks: goal.tasks.filter((task) => task.id !== id),
      }))
    );
  };

  const addGoal = (goalData: Omit<Goal, 'id' | 'tasks'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: uuidv4(),
      tasks: [],
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const updateGoal = (updatedGoal: Goal) => {
    setGoals((prev) => 
      prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );
  };

  const deleteGoal = (id: string) => {
    // First, unlink all tasks that are attached to this goal
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.goalId === id ? { ...task, goalId: undefined } : task
      )
    );
    
    // Then delete the goal
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const addTaskToGoal = (taskData: Omit<Task, 'id'>, goalId: string) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      goalId,
    };
    
    // Add to tasks list
    setTasks((prev) => [...prev, newTask]);
    
    // Add to the specific goal
    setGoals((prevGoals) => 
      prevGoals.map((goal) => {
        if (goal.id === goalId) {
          return { ...goal, tasks: [...goal.tasks, newTask] };
        }
        return goal;
      })
    );
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'days'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: uuidv4(),
      days: [...defaultDays], // Create fresh copy of default days
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits((prev) => 
      prev.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit))
    );
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const toggleHabitDay = (habitId: string, dayIndex: number) => {
    setHabits((prevHabits) => 
      prevHabits.map((habit) => {
        if (habit.id === habitId) {
          const updatedDays = [...habit.days];
          updatedDays[dayIndex] = {
            ...updatedDays[dayIndex],
            completed: !updatedDays[dayIndex].completed,
          };
          return { ...habit, days: updatedDays };
        }
        return habit;
      })
    );
  };

  const value = {
    tasks,
    goals,
    habits,
    addTask,
    updateTask,
    deleteTask,
    addGoal,
    updateGoal,
    deleteGoal,
    addTaskToGoal,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitDay,
    activeTab,
    setActiveTab,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
