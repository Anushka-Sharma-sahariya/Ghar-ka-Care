import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { ChefHat, Sparkles, Check } from 'lucide-react';

export default function MealPlanner() {
  const { t, meals, updateMeal, mealSuggestions, language } = useApp();
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner'];

  // Get today's day for default tab
  const todayIndex = new Date().getDay();
  const todayName = days[(todayIndex + 6) % 7]; // Adjust for Monday start

  const [activeDay, setActiveDay] = useState(todayName);

  const handleMealChange = (day, mealType, value) => {
    updateMeal(day, mealType, value);
  };

  const handleSuggestionClick = (day, mealType, suggestion) => {
    updateMeal(day, mealType, suggestion);
    toast.success(language === 'hi' ? 'हो गया!' : 'Saved!', {
      description: suggestion,
      icon: <Check className="w-4 h-4" />,
    });
  };

  const getMealIcon = (mealType) => {
    switch(mealType) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙';
      default: return '🍽️';
    }
  };

  return (
    <div className="min-h-screen pb-safe" data-testid="meal-planner-page">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="font-heading text-2xl text-foreground">{t('mealPlanner')}</h1>
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ? 'हफ्ते का खाना प्लान करें' : 'Plan your weekly meals'}
            </p>
          </div>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="px-6">
        <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full">
          <TabsList className="w-full flex overflow-x-auto gap-1 bg-muted/50 p-1 rounded-2xl mb-6">
            {days.map((day) => (
              <TabsTrigger
                key={day}
                value={day}
                data-testid={`day-tab-${day}`}
                className="flex-1 min-w-[70px] px-3 py-2 rounded-xl text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
              >
                {t(day).slice(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>

          {days.map((day) => (
            <TabsContent key={day} value={day} className="mt-0 space-y-4 animate-fade-in">
              {mealTypes.map((mealType) => (
                <Card 
                  key={mealType}
                  className="bg-card rounded-3xl border border-border/40 p-5 shadow-sm"
                  data-testid={`meal-card-${day}-${mealType}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{getMealIcon(mealType)}</span>
                    <h3 className="font-heading text-lg text-foreground">{t(mealType)}</h3>
                  </div>

                  <Input
                    type="text"
                    placeholder={t('addMeal')}
                    value={meals[day][mealType]}
                    onChange={(e) => handleMealChange(day, mealType, e.target.value)}
                    data-testid={`meal-input-${day}-${mealType}`}
                    className="h-12 rounded-2xl border-border/60 bg-white/50 px-4 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary mb-4"
                  />

                  {/* Suggestions */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Sparkles size={12} /> {t('suggestions')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mealSuggestions[mealType].slice(0, 5).map((suggestion) => (
                        <Button
                          key={suggestion}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(day, mealType, suggestion)}
                          data-testid={`suggestion-${day}-${mealType}-${suggestion}`}
                          className="h-8 px-3 rounded-full text-xs bg-accent/30 border-0 text-foreground hover:bg-accent/50 transition-all touch-active"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Quick tip */}
      <div className="px-6 py-6">
        <div className="bg-accent/30 rounded-2xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            {language === 'hi' 
              ? 'टिप: सुझाव पर टैप करके जल्दी से खाना डालें' 
              : 'Tip: Tap suggestions to quickly add meals'}
          </p>
        </div>
      </div>
    </div>
  );
}
