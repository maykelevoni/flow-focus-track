
import React from 'react';
import { useApp } from '../../context/AppContext';
import StatsOverview from './StatsOverview';
import AchievementsPanel from './AchievementsPanel';
import ActivityHistory from './ActivityHistory';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';

interface GamificationDashboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GamificationDashboard: React.FC<GamificationDashboardProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const { points, level } = useApp();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Seu Progresso</span>
            <div className="text-sm font-normal">
              Nível {level} • {points} pontos
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          <StatsOverview />
          
          <Tabs defaultValue="achievements">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="achievements">Conquistas</TabsTrigger>
              <TabsTrigger value="activity">Atividade</TabsTrigger>
            </TabsList>
            
            <TabsContent value="achievements" className="mt-0">
              <AchievementsPanel />
            </TabsContent>
            
            <TabsContent value="activity" className="mt-0">
              <ActivityHistory />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GamificationDashboard;
