import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { ShoppingBasket, Plus, Trash2, Check, Sparkles } from 'lucide-react';

export default function GroceryList() {
  const { 
    t, 
    groceries, 
    addGroceryItem, 
    toggleGroceryItem, 
    clearBoughtItems,
    grocerySuggestions,
    language 
  } = useApp();

  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ration');

  const categories = Object.keys(groceries);

  const handleAddItem = () => {
    if (newItem.trim()) {
      addGroceryItem(selectedCategory, newItem.trim());
      setNewItem('');
      toast.success(language === 'hi' ? 'डाल दिया!' : 'Item added!', {
        icon: <Check className="w-4 h-4" />,
      });
    }
  };

  const handleSuggestionClick = (item) => {
    addGroceryItem(selectedCategory, item);
    toast.success(language === 'hi' ? 'डाल दिया!' : 'Added!', {
      description: item,
      icon: <Check className="w-4 h-4" />,
    });
  };

  const handleClearBought = () => {
    clearBoughtItems();
    toast.success(language === 'hi' ? 'हो गया!' : 'Cleared!', {
      description: language === 'hi' ? 'खरीदी गई चीज़ें हटा दी' : 'Bought items removed',
    });
  };

  const getTotalItems = () => {
    return Object.values(groceries).reduce((sum, cat) => sum + cat.items.length, 0);
  };

  const getBoughtCount = () => {
    return Object.values(groceries).reduce(
      (sum, cat) => sum + cat.items.filter(item => item.bought).length, 0
    );
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'ration': return '🌾';
      case 'sabzi': return '🥬';
      case 'dairy': return '🥛';
      case 'masala': return '🌶️';
      default: return '📦';
    }
  };

  return (
    <div className="min-h-screen pb-safe" data-testid="grocery-list-page">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
            <ShoppingBasket className="w-6 h-6 text-secondary" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="font-heading text-2xl text-foreground">{t('groceryList')}</h1>
            <p className="text-sm text-muted-foreground">
              {getTotalItems()} items • {getBoughtCount()} {language === 'hi' ? 'खरीदे' : 'bought'}
            </p>
          </div>
        </div>
      </div>

      {/* Add Item Section */}
      <div className="px-6 mb-6">
        <Card className="bg-card rounded-3xl border border-border/40 p-5 shadow-sm">
          <div className="flex gap-2 mb-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger 
                className="w-[120px] h-12 rounded-2xl border-border/60 bg-white/50"
                data-testid="category-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="rounded-xl">
                    <span className="flex items-center gap-2">
                      {getCategoryIcon(cat)} {groceries[cat].name[language]}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Input
              type="text"
              placeholder={t('addItem')}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              data-testid="add-item-input"
              className="flex-1 h-12 rounded-2xl border-border/60 bg-white/50 px-4"
            />
            
            <Button
              onClick={handleAddItem}
              data-testid="add-item-btn"
              className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 p-0"
            >
              <Plus size={20} />
            </Button>
          </div>

          {/* Quick suggestions */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Sparkles size={12} /> {language === 'hi' ? 'जल्दी डालें' : 'Quick add'}
            </p>
            <div className="flex flex-wrap gap-2">
              {grocerySuggestions[selectedCategory]?.slice(0, 6).map((item) => (
                <Button
                  key={item}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(item)}
                  data-testid={`quick-add-${item}`}
                  className="h-8 px-3 rounded-full text-xs bg-accent/30 border-0 text-foreground hover:bg-accent/50 transition-all touch-active"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Grocery Lists by Category */}
      <div className="px-6 space-y-4">
        {categories.map((category) => {
          const categoryData = groceries[category];
          if (categoryData.items.length === 0) return null;

          return (
            <Card 
              key={category}
              className="bg-card rounded-3xl border border-border/40 p-5 shadow-sm animate-fade-in"
              data-testid={`category-card-${category}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{getCategoryIcon(category)}</span>
                <h3 className="font-heading text-lg text-foreground">
                  {categoryData.name[language]}
                </h3>
                <span className="text-xs text-muted-foreground ml-auto">
                  {categoryData.items.length} items
                </span>
              </div>

              <div className="space-y-2">
                {categoryData.items.map((item) => (
                  <div 
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                      item.bought ? 'bg-muted/50' : 'bg-accent/20'
                    }`}
                    data-testid={`grocery-item-${item.id}`}
                  >
                    <Checkbox
                      checked={item.bought}
                      onCheckedChange={() => toggleGroceryItem(category, item.id)}
                      data-testid={`checkbox-${item.id}`}
                      className="w-6 h-6 rounded-full border-2 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                    />
                    <span className={`flex-1 text-base ${
                      item.bought ? 'line-through text-muted-foreground' : 'text-foreground'
                    }`}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}

        {/* Empty state */}
        {getTotalItems() === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <ShoppingBasket size={32} className="text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-muted-foreground text-lg">{t('emptyGrocery')}</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              {language === 'hi' ? 'ऊपर से आइटम डालें' : 'Add items above'}
            </p>
          </div>
        )}

        {/* Clear bought button */}
        {getBoughtCount() > 0 && (
          <Button
            onClick={handleClearBought}
            variant="outline"
            data-testid="clear-bought-btn"
            className="w-full h-12 rounded-full border-2 border-destructive/30 text-destructive hover:bg-destructive/10 font-medium flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            {t('clearBought')} ({getBoughtCount()})
          </Button>
        )}
      </div>

      <div className="h-8" />
    </div>
  );
}
