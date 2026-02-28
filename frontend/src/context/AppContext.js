import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Default meals data
const defaultMeals = {
  monday: { breakfast: '', lunch: '', dinner: '' },
  tuesday: { breakfast: '', lunch: '', dinner: '' },
  wednesday: { breakfast: '', lunch: '', dinner: '' },
  thursday: { breakfast: '', lunch: '', dinner: '' },
  friday: { breakfast: '', lunch: '', dinner: '' },
  saturday: { breakfast: '', lunch: '', dinner: '' },
  sunday: { breakfast: '', lunch: '', dinner: '' },
};

// Common Indian meals for suggestions
const mealSuggestions = {
  breakfast: [
    'Poha', 'Paratha', 'Upma', 'Idli-Sambar', 'Dosa', 
    'Besan Cheela', 'Bread-Omelette', 'Daliya', 'Aloo Puri'
  ],
  lunch: [
    'Dal-Chawal', 'Roti-Sabzi', 'Rajma-Chawal', 'Chole-Chawal',
    'Kadhi-Chawal', 'Palak Paneer', 'Aloo Gobi', 'Bhindi Masala'
  ],
  dinner: [
    'Khichdi', 'Roti-Dal', 'Paratha-Sabzi', 'Jeera Rice-Dal',
    'Pulao', 'Mixed Veg Curry', 'Paneer Bhurji', 'Dahi Roti'
  ]
};

// Default grocery categories
const defaultGroceryCategories = {
  ration: { name: { en: 'Ration', hi: 'राशन' }, items: [] },
  sabzi: { name: { en: 'Vegetables', hi: 'सब्जी' }, items: [] },
  dairy: { name: { en: 'Dairy', hi: 'डेयरी' }, items: [] },
  masala: { name: { en: 'Masala', hi: 'मसाले' }, items: [] },
  other: { name: { en: 'Other', hi: 'अन्य' }, items: [] },
};

// Common Indian staples for auto-suggest
const grocerySuggestions = {
  ration: ['Atta', 'Rice', 'Dal (Toor)', 'Dal (Moong)', 'Dal (Chana)', 'Sugar', 'Salt', 'Oil'],
  sabzi: ['Aloo', 'Pyaaz', 'Tamatar', 'Mirchi', 'Dhania', 'Adrak', 'Lahsun', 'Gobhi', 'Bhindi', 'Palak'],
  dairy: ['Milk', 'Dahi', 'Paneer', 'Butter', 'Ghee', 'Cream'],
  masala: ['Haldi', 'Jeera', 'Dhaniya Powder', 'Mirch Powder', 'Garam Masala', 'Hing'],
  other: ['Chai Patti', 'Coffee', 'Biscuits', 'Bread', 'Eggs', 'Maggi'],
};

// Translation dictionary
const translations = {
  en: {
    // Navigation
    home: 'Home',
    meals: 'Meals',
    grocery: 'Grocery',
    reminders: 'Reminders',
    
    // Home
    namaste: 'Namaste',
    todayOverview: "Today's Overview",
    mealsPlanned: 'Meals Planned',
    groceryItems: 'Grocery Items',
    pendingReminders: 'Pending Reminders',
    whatToCook: 'What to cook today?',
    viewAll: 'View All',
    
    // Meals
    mealPlanner: 'Meal Planner',
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    addMeal: 'Add meal...',
    suggestions: 'Suggestions',
    saved: 'Saved!',
    
    // Days
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    
    // Grocery
    groceryList: 'Grocery List',
    addItem: 'Add item...',
    clearBought: 'Clear bought items',
    emptyGrocery: 'Koi item nahi hai',
    itemAdded: 'Item added!',
    
    // Reminders
    reminderList: 'Reminders',
    addReminder: 'Add reminder...',
    pickDate: 'Pick date',
    save: 'Save',
    reminderSaved: 'Yaad rakh lenge',
    noReminders: 'Koi reminder nahi',
    
    // Reminder types
    gasBooking: 'Gas Booking',
    milkDelivery: 'Milk Delivery',
    medicines: 'Medicines',
    schoolReminder: 'School',
    billPayment: 'Bill Payment',
    other: 'Other',
    
    // Summary
    dailySummary: 'Daily Summary',
    summaryMessage1: 'Aaj aapne kaafi kuch sambhala.',
    summaryMessage2: 'Aaj ka din achha gaya.',
    summaryMessage3: 'Sab yaad rakhna zaroori nahi. Aap kar rahi hain.',
    thingsManaged: 'things managed today',
    close: 'Close',
  },
  hi: {
    // Navigation
    home: 'होम',
    meals: 'खाना',
    grocery: 'राशन',
    reminders: 'याद',
    
    // Home
    namaste: 'नमस्ते',
    todayOverview: 'आज का हाल',
    mealsPlanned: 'खाना प्लान',
    groceryItems: 'राशन आइटम',
    pendingReminders: 'बाकी याद',
    whatToCook: 'आज क्या बनेगा?',
    viewAll: 'सब देखें',
    
    // Meals
    mealPlanner: 'खाना प्लानर',
    breakfast: 'नाश्ता',
    lunch: 'दोपहर का खाना',
    dinner: 'रात का खाना',
    addMeal: 'खाना डालें...',
    suggestions: 'सुझाव',
    saved: 'हो गया!',
    
    // Days
    monday: 'सोमवार',
    tuesday: 'मंगलवार',
    wednesday: 'बुधवार',
    thursday: 'गुरुवार',
    friday: 'शुक्रवार',
    saturday: 'शनिवार',
    sunday: 'रविवार',
    
    // Grocery
    groceryList: 'राशन लिस्ट',
    addItem: 'आइटम डालें...',
    clearBought: 'खरीदे गए हटाएं',
    emptyGrocery: 'कोई आइटम नहीं है',
    itemAdded: 'डाल दिया!',
    
    // Reminders
    reminderList: 'याद लिस्ट',
    addReminder: 'याद डालें...',
    pickDate: 'तारीख चुनें',
    save: 'सेव',
    reminderSaved: 'याद रख लेंगे',
    noReminders: 'कोई रिमाइंडर नहीं',
    
    // Reminder types
    gasBooking: 'गैस बुकिंग',
    milkDelivery: 'दूध',
    medicines: 'दवाई',
    schoolReminder: 'स्कूल',
    billPayment: 'बिल',
    other: 'अन्य',
    
    // Summary
    dailySummary: 'आज का सार',
    summaryMessage1: 'आज आपने काफी कुछ संभाला।',
    summaryMessage2: 'आज का दिन अच्छा गया।',
    summaryMessage3: 'सब याद रखना ज़रूरी नहीं। आप कर रही हैं।',
    thingsManaged: 'चीज़ें संभाली आज',
    close: 'बंद करें',
  }
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('gharkaCare_language') || 'en';
  });
  
  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem('gharkaCare_meals');
    return saved ? JSON.parse(saved) : defaultMeals;
  });
  
  const [groceries, setGroceries] = useState(() => {
    const saved = localStorage.getItem('gharkaCare_groceries');
    return saved ? JSON.parse(saved) : defaultGroceryCategories;
  });
  
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('gharkaCare_reminders');
    return saved ? JSON.parse(saved) : [];
  });

  const [showSummary, setShowSummary] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('gharkaCare_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('gharkaCare_meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('gharkaCare_groceries', JSON.stringify(groceries));
  }, [groceries]);

  useEffect(() => {
    localStorage.setItem('gharkaCare_reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Translation helper
  const t = (key) => {
    return translations[language][key] || key;
  };

  // Update meal
  const updateMeal = (day, mealType, value) => {
    setMeals(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: value
      }
    }));
  };

  // Add grocery item
  const addGroceryItem = (category, item) => {
    const newItem = {
      id: Date.now().toString(),
      name: item,
      bought: false,
      addedAt: new Date().toISOString()
    };
    setGroceries(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        items: [...prev[category].items, newItem]
      }
    }));
  };

  // Toggle grocery item bought status
  const toggleGroceryItem = (category, itemId) => {
    setGroceries(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        items: prev[category].items.map(item =>
          item.id === itemId ? { ...item, bought: !item.bought } : item
        )
      }
    }));
  };

  // Clear bought items
  const clearBoughtItems = () => {
    setGroceries(prev => {
      const newGroceries = {};
      Object.keys(prev).forEach(category => {
        newGroceries[category] = {
          ...prev[category],
          items: prev[category].items.filter(item => !item.bought)
        };
      });
      return newGroceries;
    });
  };

  // Add reminder
  const addReminder = (reminder) => {
    const newReminder = {
      id: Date.now().toString(),
      ...reminder,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setReminders(prev => [...prev, newReminder]);
  };

  // Toggle reminder
  const toggleReminder = (id) => {
    setReminders(prev =>
      prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r)
    );
  };

  // Delete reminder
  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  // Get today's stats for summary
  const getTodayStats = () => {
    const today = new Date();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayName = dayNames[today.getDay()];
    
    const todayMeals = meals[todayName];
    const mealsCount = Object.values(todayMeals).filter(m => m && m.trim() !== '').length;
    
    const groceryCount = Object.values(groceries).reduce(
      (sum, cat) => sum + cat.items.length, 0
    );
    
    const activeReminders = reminders.filter(r => !r.completed).length;
    
    return {
      meals: mealsCount,
      groceryItems: groceryCount,
      reminders: activeReminders,
      total: mealsCount + groceryCount + activeReminders
    };
  };

  // Get random meal suggestion
  const getRandomMealSuggestion = (mealType) => {
    const suggestions = mealSuggestions[mealType] || mealSuggestions.lunch;
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };

  const value = {
    language,
    setLanguage,
    t,
    meals,
    updateMeal,
    groceries,
    addGroceryItem,
    toggleGroceryItem,
    clearBoughtItems,
    reminders,
    addReminder,
    toggleReminder,
    deleteReminder,
    getTodayStats,
    getRandomMealSuggestion,
    showSummary,
    setShowSummary,
    mealSuggestions,
    grocerySuggestions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
