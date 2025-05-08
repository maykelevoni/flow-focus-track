
import React from 'react';
import { AppProvider } from '../context/AppContext';
import Navigation from '../components/Navigation';
import StatsOverview from '../components/gamification/StatsOverview';
import AchievementsPanel from '../components/gamification/AchievementsPanel';
import ActivityHistory from '../components/gamification/ActivityHistory';
import CompletionConfetti from '../components/gamification/CompletionConfetti';

const Stats: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen">
        <div className="container px-4 max-w-md mx-auto pb-16 pt-4">
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl shadow-sm p-4 min-h-screen">
            <h2 className="text-xl font-bold mb-4">Estatísticas e Conquistas</h2>
            <StatsOverview />
            
            <div className="my-6">
              <h3 className="text-lg font-semibold mb-3">Suas Conquistas</h3>
              <AchievementsPanel />
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Atividade</h3>
              <ActivityHistory />
            </div>
          </div>
        </div>
        <Navigation />
        <CompletionConfetti />
      </div>
    </AppProvider>
  );
};

export default Stats;
