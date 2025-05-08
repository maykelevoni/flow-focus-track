
import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, Goal, Habit, HabitDay, Achievement } from '../types';
import { toast } from 'sonner';

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
  activeTab: 'tasks' | 'goals' | 'habits' | 'stats';
  setActiveTab: React.Dispatch<React.SetStateAction<'tasks' | 'goals' | 'habits' | 'stats'>>;
  // Gamification features
  points: number;
  level: number;
  nextLevelPoints: number;
  achievements: Achievement[];
  recentPoints: number;
  recentAchievement: Achievement | null;
  streaks: Record<string, number>;
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

// Exemplos iniciais
const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Responder emails importantes',
    description: 'Priorizar os emails de clientes',
    completed: false
  },
  {
    id: uuidv4(),
    title: 'Atualizar meu currículo',
    description: 'Adicionar experiências recentes',
    note: 'Verificar modelo no Google Drive',
    completed: true
  },
  {
    id: uuidv4(),
    title: 'Comprar presentes de aniversário',
    completed: false
  }
];

const initialGoalId = uuidv4();
const initialTaskForGoal = {
  id: uuidv4(),
  title: 'Correr 3km',
  description: 'Correr no parque da cidade',
  completed: true,
  goalId: initialGoalId
};

const initialGoals: Goal[] = [
  {
    id: initialGoalId,
    title: 'Melhorar condicionamento físico',
    description: 'Exercícios diários por 30 dias',
    tasks: [initialTaskForGoal]
  },
  {
    id: uuidv4(),
    title: 'Aprender novo idioma',
    description: 'Alcançar nível básico em 3 meses',
    tasks: []
  }
];

const initialHabits: Habit[] = [
  {
    id: uuidv4(),
    title: 'Meditação matinal',
    days: [
      { day: 'Mon', completed: true },
      { day: 'Tue', completed: true },
      { day: 'Wed', completed: false },
      { day: 'Thu', completed: false },
      { day: 'Fri', completed: false },
      { day: 'Sat', completed: false },
      { day: 'Sun', completed: false },
    ]
  },
  {
    id: uuidv4(),
    title: 'Ler 20 páginas',
    days: [
      { day: 'Mon', completed: true },
      { day: 'Tue', completed: false },
      { day: 'Wed', completed: true },
      { day: 'Thu', completed: false },
      { day: 'Fri', completed: true },
      { day: 'Sat', completed: false },
      { day: 'Sun', completed: false },
    ]
  }
];

// Initial achievements
const initialAchievements: Achievement[] = [
  {
    id: uuidv4(),
    title: 'Primeiros passos',
    description: 'Complete sua primeira tarefa',
    type: 'task',
    unlocked: true
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [activeTab, setActiveTab] = useState<'tasks' | 'goals' | 'habits' | 'stats'>('tasks');
  
  // Gamification state
  const [points, setPoints] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentPoints, setRecentPoints] = useState<number>(0);
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);
  const [streaks, setStreaks] = useState<Record<string, number>>({});

  // Calculate next level points (increases with each level)
  const nextLevelPoints = level * 100;

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedGoals = localStorage.getItem('goals');
    const savedHabits = localStorage.getItem('habits');
    const savedPoints = localStorage.getItem('points');
    const savedLevel = localStorage.getItem('level');
    const savedAchievements = localStorage.getItem('achievements');
    const savedStreaks = localStorage.getItem('streaks');

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    else setTasks(initialTasks);
    
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    else setGoals(initialGoals);
    
    if (savedHabits) setHabits(JSON.parse(savedHabits));
    else setHabits(initialHabits);
    
    if (savedPoints) setPoints(Number(savedPoints));
    if (savedLevel) setLevel(Number(savedLevel));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    else setAchievements(initialAchievements);
    if (savedStreaks) setStreaks(JSON.parse(savedStreaks));
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

  useEffect(() => {
    localStorage.setItem('points', String(points));
  }, [points]);

  useEffect(() => {
    localStorage.setItem('level', String(level));
  }, [level]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('streaks', JSON.stringify(streaks));
  }, [streaks]);

  // Check for level up
  useEffect(() => {
    if (points >= nextLevelPoints) {
      setLevel(prev => prev + 1);
      toast.success(`Parabéns! Você alcançou o nível ${level + 1}!`, {
        description: "Continue com o bom trabalho!",
      });
    }
  }, [points, nextLevelPoints, level]);

  // Award points and handle achievements
  const awardPoints = (amount: number) => {
    setPoints(prev => prev + amount);
    setRecentPoints(amount);
    // Reset recent points after a delay
    setTimeout(() => setRecentPoints(0), 3000);
  };

  const unlockAchievement = (achievement: Omit<Achievement, 'id' | 'unlocked'>) => {
    const newAchievement = {
      ...achievement,
      id: uuidv4(),
      unlocked: true
    };
    setAchievements(prev => [...prev, newAchievement]);
    setRecentAchievement(newAchievement);
    // Reset recent achievement after a delay
    setTimeout(() => setRecentAchievement(null), 5000);
  };

  const updateStreak = (habitId: string, completed: boolean) => {
    setStreaks(prev => {
      const currentStreak = prev[habitId] || 0;
      return {
        ...prev,
        [habitId]: completed ? currentStreak + 1 : 0
      };
    });
  };

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
    };
    setTasks((prev) => [...prev, newTask]);
    
    // Award points for creating a task
    awardPoints(5);
    
    // Check for first task achievement
    if (tasks.length === 0 && !achievements.some(a => a.title === 'Primeira Tarefa')) {
      unlockAchievement({
        title: 'Primeira Tarefa',
        description: 'Você criou sua primeira tarefa!',
        type: 'task'
      });
    }
  };

  const updateTask = (updatedTask: Task) => {
    const previousTask = tasks.find(t => t.id === updatedTask.id);
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
    
    // Award points when task is completed
    if (!previousTask?.completed && updatedTask.completed) {
      awardPoints(10);
      
      // Check for task achievements
      const completedTasks = tasks.filter(t => t.completed).length + 1;
      if (completedTasks === 5 && !achievements.some(a => a.title === 'Produtividade Iniciante')) {
        unlockAchievement({
          title: 'Produtividade Iniciante',
          description: 'Complete 5 tarefas',
          type: 'task'
        });
      }
      if (completedTasks === 10 && !achievements.some(a => a.title === 'Produtividade Avançada')) {
        unlockAchievement({
          title: 'Produtividade Avançada',
          description: 'Complete 10 tarefas',
          type: 'task'
        });
      }
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
    
    // Award points for creating a habit
    awardPoints(15);
    
    // Check for first habit achievement
    if (habits.length === 0 && !achievements.some(a => a.title === 'Primeiro Hábito')) {
      unlockAchievement({
        title: 'Primeiro Hábito',
        description: 'Você criou seu primeiro hábito!',
        type: 'habit'
      });
    }
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
          const wasCompleted = updatedDays[dayIndex].completed;
          updatedDays[dayIndex] = {
            ...updatedDays[dayIndex],
            completed: !wasCompleted,
          };
          
          // Update streak and award points if completed
          if (!wasCompleted) {
            updateStreak(habitId, true);
            awardPoints(5);
            
            // Check for habit streak achievements
            const newStreak = (streaks[habitId] || 0) + 1;
            if (newStreak === 3 && !achievements.some(a => a.title === 'Streak Inicial')) {
              unlockAchievement({
                title: 'Streak Inicial',
                description: 'Mantenha um hábito por 3 dias consecutivos',
                type: 'habit'
              });
            }
            if (newStreak === 7 && !achievements.some(a => a.title === 'Streak Semanal')) {
              unlockAchievement({
                title: 'Streak Semanal',
                description: 'Mantenha um hábito por 7 dias consecutivos',
                type: 'habit'
              });
            }
          } else {
            updateStreak(habitId, false);
          }
          
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
    // Gamification properties
    points,
    level,
    nextLevelPoints,
    achievements,
    recentPoints,
    recentAchievement,
    streaks
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
