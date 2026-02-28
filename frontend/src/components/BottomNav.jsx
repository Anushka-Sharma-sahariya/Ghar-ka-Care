import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, UtensilsCrossed, ShoppingBasket, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useApp();

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/meals', icon: UtensilsCrossed, label: t('meals') },
    { path: '/grocery', icon: ShoppingBasket, label: t('grocery') },
    { path: '/reminders', icon: Bell, label: t('reminders') },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 glass border-t border-white/20 z-50"
      data-testid="bottom-nav"
    >
      <div className="flex justify-around items-center h-20 max-w-lg mx-auto px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              data-testid={`nav-${item.path.replace('/', '') || 'home'}`}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-2xl transition-all duration-300 touch-active ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2 : 1.5}
                className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
              />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
