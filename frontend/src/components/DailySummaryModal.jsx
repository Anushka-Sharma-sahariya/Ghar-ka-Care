import React from 'react';
import { useApp } from '../context/AppContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

export const DailySummaryModal = () => {
  const { showSummary, setShowSummary, getTodayStats, t, language } = useApp();
  const stats = getTodayStats();

  const summaryMessages = language === 'hi' 
    ? [
        'आज आपने काफी कुछ संभाला।',
        'आज का दिन अच्छा गया।',
        'सब याद रखना ज़रूरी नहीं। आप कर रही हैं।'
      ]
    : [
        'Aaj aapne kaafi kuch sambhala.',
        'Aaj ka din achha gaya.',
        'Sab yaad rakhna zaroori nahi. Aap kar rahi hain.'
      ];

  const randomMessage = summaryMessages[Math.floor(Math.random() * summaryMessages.length)];

  return (
    <Dialog open={showSummary} onOpenChange={setShowSummary}>
      <DialogContent 
        className="bg-gradient-to-br from-card to-muted border-border/40 rounded-3xl max-w-sm mx-auto"
        data-testid="daily-summary-modal"
      >
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            </div>
          </div>
          <DialogTitle className="font-heading text-2xl text-foreground">
            {t('dailySummary')}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 text-center space-y-6">
          {/* Stats */}
          <div className="flex justify-center items-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="text-4xl font-bold text-primary">{stats.total}</span>
            <Sparkles className="w-5 h-5 text-secondary" />
          </div>
          
          <p className="text-muted-foreground text-lg">
            {t('thingsManaged')}
          </p>

          {/* Warm message */}
          <div className="bg-accent/30 rounded-2xl p-4 mt-4">
            <p className="text-foreground text-lg leading-relaxed font-medium">
              {randomMessage}
            </p>
          </div>

          {/* Breakdown */}
          <div className="flex justify-around text-center pt-4">
            <div className="space-y-1">
              <span className="text-2xl font-bold text-secondary">{stats.meals}</span>
              <p className="text-xs text-muted-foreground">{t('mealsPlanned')}</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-secondary">{stats.groceryItems}</span>
              <p className="text-xs text-muted-foreground">{t('groceryItems')}</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-secondary">{stats.reminders}</span>
              <p className="text-xs text-muted-foreground">{t('pendingReminders')}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setShowSummary(false)}
          data-testid="close-summary-btn"
          className="w-full h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-lg"
        >
          {t('close')}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
