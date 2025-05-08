
export interface Task {
  id: string;
  title: string;
  description?: string;
  note?: string;
  audioNote?: string; // URL to audio file
  completed: boolean;
  goalId?: string; // If this task is linked to a goal
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
}

export interface HabitDay {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  completed: boolean;
}

export interface Habit {
  id: string;
  title: string;
  days: HabitDay[];
}
