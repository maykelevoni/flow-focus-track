
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from "sonner";
import { Trophy, Award, Star, Check, PartyPopper, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

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
      // Show special celebration for achievements
      toast.success(`Nova conquista: ${recentAchievement.title}!`, {
        description: recentAchievement.description,
        duration: 5000,
        icon: recentAchievement.type === 'task' ? <Check /> : 
              recentAchievement.type === 'goal' ? <Trophy /> : <Star />,
      });
      
      // Trigger confetti effect
      launchConfetti();
    }
  }, [recentAchievement]);
  
  const launchConfetti = () => {
    const end = Date.now() + 1000;
    
    // Launch confetti from the middle of the screen
    const confettiLauncher = () => {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6, x: 0.5 }
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(confettiLauncher);
      }
    };
    
    confettiLauncher();
  };
  
  return null; // This component doesn't render anything, just shows toasts
};

export default CompletionConfetti;
