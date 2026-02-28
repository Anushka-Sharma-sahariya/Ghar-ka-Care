import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Bell, Plus, CalendarIcon, Trash2, Check, Flame, Milk, Pill, GraduationCap, Receipt, Package } from 'lucide-react';

export default function Reminders() {
  const { t, reminders, addReminder, toggleReminder, deleteReminder, language } = useApp();

  const [newReminder, setNewReminder] = useState('');
  const [selectedType, setSelectedType] = useState('other');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const reminderTypes = [
    { id: 'gasBooking', icon: Flame, color: 'text-orange-500' },
    { id: 'milkDelivery', icon: Milk, color: 'text-blue-400' },
    { id: 'medicines', icon: Pill, color: 'text-red-400' },
    { id: 'schoolReminder', icon: GraduationCap, color: 'text-purple-500' },
    { id: 'billPayment', icon: Receipt, color: 'text-green-500' },
    { id: 'other', icon: Package, color: 'text-muted-foreground' },
  ];

  const handleAddReminder = () => {
    if (newReminder.trim() && selectedDate) {
      addReminder({
        title: newReminder.trim(),
        type: selectedType,
        date: selectedDate.toISOString(),
      });
      setNewReminder('');
      setSelectedDate(null);
      setSelectedType('other');
      toast.success(language === 'hi' ? 'याद रख लेंगे' : 'Yaad rakh lenge', {
        icon: <Check className="w-4 h-4" />,
      });
    }
  };

  const handleDelete = (id) => {
    deleteReminder(id);
    toast.success(language === 'hi' ? 'हटा दिया' : 'Removed');
  };

  const getTypeIcon = (typeId) => {
    const type = reminderTypes.find(t => t.id === typeId);
    if (type) {
      const Icon = type.icon;
      return <Icon size={18} className={type.color} strokeWidth={1.5} />;
    }
    return <Package size={18} className="text-muted-foreground" strokeWidth={1.5} />;
  };

  const activeReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  const isOverdue = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="min-h-screen pb-safe" data-testid="reminders-page">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center">
            <Bell className="w-6 h-6 text-accent-foreground" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="font-heading text-2xl text-foreground">{t('reminderList')}</h1>
            <p className="text-sm text-muted-foreground">
              {activeReminders.length} {language === 'hi' ? 'बाकी' : 'pending'}
            </p>
          </div>
        </div>
      </div>

      {/* Add Reminder Section */}
      <div className="px-6 mb-6">
        <Card className="bg-card rounded-3xl border border-border/40 p-5 shadow-sm">
          {/* Type selector */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">
              {language === 'hi' ? 'किस तरह का?' : 'Type'}
            </p>
            <div className="flex flex-wrap gap-2">
              {reminderTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    data-testid={`type-${type.id}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all touch-active ${
                      selectedType === type.id
                        ? 'bg-primary/10 border-2 border-primary/30'
                        : 'bg-muted/50 border-2 border-transparent'
                    }`}
                  >
                    <Icon size={16} className={type.color} strokeWidth={1.5} />
                    <span className="text-foreground">{t(type.id)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title input */}
          <Input
            type="text"
            placeholder={t('addReminder')}
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            data-testid="reminder-input"
            className="h-12 rounded-2xl border-border/60 bg-white/50 px-4 mb-4"
          />

          {/* Date picker */}
          <div className="flex gap-2">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-testid="date-picker-trigger"
                  className="flex-1 h-12 rounded-2xl border-border/60 bg-white/50 justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  {selectedDate ? (
                    format(selectedDate, 'dd MMM yyyy')
                  ) : (
                    <span className="text-muted-foreground">{t('pickDate')}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="rounded-2xl"
                />
              </PopoverContent>
            </Popover>

            <Button
              onClick={handleAddReminder}
              disabled={!newReminder.trim() || !selectedDate}
              data-testid="add-reminder-btn"
              className="h-12 px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Plus size={20} className="mr-1" />
              {t('save')}
            </Button>
          </div>
        </Card>
      </div>

      {/* Active Reminders */}
      <div className="px-6 space-y-3">
        {activeReminders.length > 0 && (
          <h3 className="font-heading text-lg text-foreground mb-3">
            {language === 'hi' ? 'बाकी याद' : 'Pending'}
          </h3>
        )}

        {activeReminders.map((reminder) => (
          <Card
            key={reminder.id}
            className={`bg-card rounded-2xl border p-4 shadow-sm animate-fade-in ${
              isOverdue(reminder.date) 
                ? 'border-destructive/30 bg-destructive/5' 
                : 'border-border/40'
            }`}
            data-testid={`reminder-${reminder.id}`}
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={reminder.completed}
                onCheckedChange={() => toggleReminder(reminder.id)}
                data-testid={`checkbox-reminder-${reminder.id}`}
                className="w-6 h-6 rounded-full border-2 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getTypeIcon(reminder.type)}
                  <span className="font-medium text-foreground truncate">
                    {reminder.title}
                  </span>
                </div>
                <p className={`text-xs ${
                  isOverdue(reminder.date) ? 'text-destructive' : 'text-muted-foreground'
                }`}>
                  {isOverdue(reminder.date) 
                    ? (language === 'hi' ? 'कल के लिए याद था' : 'Kal ke liye yaad tha')
                    : format(new Date(reminder.date), 'dd MMM yyyy')
                  }
                </p>
              </div>

              <button
                onClick={() => handleDelete(reminder.id)}
                data-testid={`delete-reminder-${reminder.id}`}
                className="p-2 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </Card>
        ))}

        {/* Completed Reminders */}
        {completedReminders.length > 0 && (
          <>
            <h3 className="font-heading text-lg text-muted-foreground mt-6 mb-3">
              {language === 'hi' ? 'हो गए' : 'Completed'}
            </h3>
            {completedReminders.map((reminder) => (
              <Card
                key={reminder.id}
                className="bg-muted/30 rounded-2xl border border-border/20 p-4 opacity-60"
                data-testid={`reminder-completed-${reminder.id}`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={reminder.completed}
                    onCheckedChange={() => toggleReminder(reminder.id)}
                    className="w-6 h-6 rounded-full border-2 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  />
                  <span className="flex-1 line-through text-muted-foreground">
                    {reminder.title}
                  </span>
                  <button
                    onClick={() => handleDelete(reminder.id)}
                    className="p-2 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </Card>
            ))}
          </>
        )}

        {/* Empty state */}
        {reminders.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Bell size={32} className="text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-muted-foreground text-lg">{t('noReminders')}</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              {language === 'hi' ? 'ऊपर से याद डालें' : 'Add reminders above'}
            </p>
          </div>
        )}
      </div>

      <div className="h-8" />
    </div>
  );
}
