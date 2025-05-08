
export interface Task {
  id: string;
  title: string;
  description?: string;
  note?: string;
  audioNote?: string;
  completed: boolean;
  goalId?: string;
  isExample?: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
  isExample?: boolean;
}

export interface HabitDay {
  day: string;
  completed: boolean;
}

export interface Habit {
  id: string;
  title: string;
  days: HabitDay[];
  isExample?: boolean;
}

// New types for gamification
export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'task' | 'goal' | 'habit';
  unlocked: boolean;
}
