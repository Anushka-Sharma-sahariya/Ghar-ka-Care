import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LanguageToggle } from '../components/LanguageToggle';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  UtensilsCrossed, 
  ShoppingBasket, 
  Bell, 
  Sparkles,
  ChefHat,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { t, getTodayStats, getRandomMealSuggestion, setShowSummary, meals, language } = useApp();
  const stats = getTodayStats();

  // Get today's day name
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = dayNames[new Date().getDay()];
  const todayMeals = meals[today];

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return language === 'hi' ? 'सुप्रभात' : 'Good Morning';
    if (hour < 17) return language === 'hi' ? 'नमस्ते' : 'Good Afternoon';
    return language === 'hi' ? 'शुभ संध्या' : 'Good Evening';
  };

  const handleWhatToCook = () => {
    const mealType = new Date().getHours() < 11 ? 'breakfast' : new Date().getHours() < 16 ? 'lunch' : 'dinner';
    const suggestion = getRandomMealSuggestion(mealType);
    alert(`${language === 'hi' ? 'आज बनाएं:' : 'Try making:'} ${suggestion}`);
  };

  return (
    <div className="min-h-screen pb-safe" data-testid="home-page">
      {/* Header with background */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1584428885051-d80a38d86b39?crop=entropy&cs=srgb&fm=jpg&q=85')` 
          }}
        />
        <div className="relative px-6 pt-8 pb-6">
          <div className="flex justify-between items-start mb-6">
            <div className="animate-fade-in">
              <p className="text-muted-foreground text-sm mb-1">{getGreeting()}</p>
              <h1 className="font-heading text-3xl text-foreground tracking-tight">
                GharKaCare
              </h1>
            </div>
            <LanguageToggle />
          </div>

          {/* What to cook button */}
          <Button
            onClick={handleWhatToCook}
            data-testid="what-to-cook-btn"
            className="w-full h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-lg flex items-center justify-center gap-3 animate-fade-in stagger-1"
          >
            <ChefHat size={22} strokeWidth={1.5} />
            {t('whatToCook')}
            <Sparkles size={18} strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 py-4 space-y-6">
        {/* Today's Overview */}
        <div className="animate-fade-in stagger-2">
          <h2 className="font-heading text-xl text-foreground mb-4">{t('todayOverview')}</h2>
          
          <div className="grid grid-cols-3 gap-3">
            <Card 
              className="bg-card rounded-3xl border border-border/40 p-4 text-center shadow-sm hover:shadow-md transition-all cursor-pointer touch-active"
              onClick={() => navigate('/meals')}
              data-testid="meals-stat-card"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <UtensilsCrossed size={20} className="text-primary" strokeWidth={1.5} />
              </div>
              <span className="text-2xl font-bold text-foreground block">{stats.meals}</span>
              <span className="text-xs text-muted-foreground">{t('mealsPlanned')}</span>
            </Card>

            <Card 
              className="bg-card rounded-3xl border border-border/40 p-4 text-center shadow-sm hover:shadow-md transition-all cursor-pointer touch-active"
              onClick={() => navigate('/grocery')}
              data-testid="grocery-stat-card"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-2">
                <ShoppingBasket size={20} className="text-secondary" strokeWidth={1.5} />
              </div>
              <span className="text-2xl font-bold text-foreground block">{stats.groceryItems}</span>
              <span className="text-xs text-muted-foreground">{t('groceryItems')}</span>
            </Card>

            <Card 
              className="bg-card rounded-3xl border border-border/40 p-4 text-center shadow-sm hover:shadow-md transition-all cursor-pointer touch-active"
              onClick={() => navigate('/reminders')}
              data-testid="reminders-stat-card"
            >
              <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center mx-auto mb-2">
                <Bell size={20} className="text-accent-foreground" strokeWidth={1.5} />
              </div>
              <span className="text-2xl font-bold text-foreground block">{stats.reminders}</span>
              <span className="text-xs text-muted-foreground">{t('pendingReminders')}</span>
            </Card>
          </div>
        </div>

        {/* Today's Meals */}
        <div className="animate-fade-in stagger-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-xl text-foreground">
              {language === 'hi' ? 'आज का खाना' : "Today's Meals"}
            </h2>
            <button 
              onClick={() => navigate('/meals')}
              className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
            >
              {t('viewAll')} <ArrowRight size={14} />
            </button>
          </div>

          <Card className="bg-card rounded-3xl border border-border/40 p-5 shadow-sm">
            <div className="space-y-4">
              {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                <div key={mealType} className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    mealType === 'breakfast' ? 'bg-yellow-400' :
                    mealType === 'lunch' ? 'bg-primary' : 'bg-secondary'
                  }`} />
                  <div className="flex-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {t(mealType)}
                    </span>
                    <p className="text-foreground font-medium">
                      {todayMeals[mealType] || (language === 'hi' ? 'अभी तय नहीं' : 'Not decided yet')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Daily Summary Button */}
        <div className="animate-fade-in stagger-4">
          <Button
            onClick={() => setShowSummary(true)}
            data-testid="show-summary-btn"
            variant="outline"
            className="w-full h-14 rounded-full border-2 border-primary/30 bg-white/50 text-foreground hover:bg-primary/10 font-medium text-base flex items-center justify-center gap-3"
          >
            <Sparkles size={20} className="text-primary" strokeWidth={1.5} />
            {language === 'hi' ? 'आज का सार देखें' : 'View Daily Summary'}
          </Button>
        </div>

        {/* Warm message */}
        <div className="animate-fade-in stagger-5 text-center py-4">
          <p className="text-muted-foreground text-sm italic">
            {language === 'hi' 
              ? 'आप अच्छा कर रही हैं। धीरे-धीरे सब हो जाएगा।' 
              : 'Aap achha kar rahi hain. Dheere-dheere sab ho jayega.'}
          </p>
        </div>
      </div>
    </div>
  );
}
