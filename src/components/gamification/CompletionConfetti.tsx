
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from "sonner";
import { Trophy, Award, Star, Check } from 'lucide-react';

const CompletionConfetti: React.FC = () => {
  const { recentPoints, recentAchievement } = useApp();
  
  // Display toast notifications for points and achievements
  useEffect(() => {
    if (recentPoints > 0) {
      toast.success(`+${recentPoints} pontos!`, {
        description: "Continue assim!",
        duration: 3000,
      });
    }
  }, [recentPoints]);
  
  useEffect(() => {
    if (recentAchievement) {
      toast.success(`Nova conquista: ${recentAchievement.title}!`, {
        description: recentAchievement.description,
        duration: 5000,
        icon: recentAchievement.type === 'task' ? <Check /> : 
              recentAchievement.type === 'goal' ? <Trophy /> : <Star />,
      });
    }
  }, [recentAchievement]);
  
  return null; // This component doesn't render anything, just shows toasts
};

export default CompletionConfetti;
