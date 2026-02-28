# GharKaCare - Product Requirements Document

## Original Problem Statement
Build a mobile-first web app called "GharKaCare" - a warm, simple daily companion for Indian housewives who manage their homes. The goal is to reduce mental load, not increase features.

## Target User
Indian housewife (age 25–55):
- Manages meals, groceries, kids, elders
- Uses WhatsApp daily
- Comfortable with Hindi
- Not tech-heavy, easily overwhelmed by complex apps
- Wants life to feel lighter

## Core Design Philosophy
"A supportive didi helping quietly" - Not corporate, professional, or productivity obsessed

## User Preferences
- Color Palette: Earthy warm tones (Mitti/Terracotta, Tulsi/Sage, Malai/Cream)
- Default Language: English with Hindi toggle
- Storage: localStorage (no backend/login)
- Tone: Warm, calm, respectful Hindi-English mix

---

## What's Been Implemented (Jan 2026)

### 1. Daily Meal Planner
- Weekly planner (Mon-Sun) with day tabs
- Three meal types: Breakfast, Lunch, Dinner
- Indian meal suggestions (Poha, Paratha, Dal-Chawal, etc.)
- Quick tap-to-add from suggestions
- Persistent storage

### 2. Smart Grocery List
- Category-based organization: Ration, Sabzi, Dairy, Masala, Other
- Quick-add Indian staples (Atta, Rice, Dal, Oil, etc.)
- Checkbox UI for marking bought items
- One-tap "Clear bought items" feature
- Category icons and counts

### 3. Simple Home Reminders
- Reminder types: Gas Booking, Milk Delivery, Medicines, School, Bill Payment, Other
- Date picker for scheduling
- Mark complete/incomplete
- Delete functionality
- Overdue indicator with warm messaging

### 4. Daily Appreciation Summary
- Modal showing daily accomplishment count
- Breakdown by meals, grocery items, reminders
- Warm Hinglish messages of encouragement
- Non-gamified, supportive tone

### 5. Additional Features
- Hindi/English language toggle
- Glassmorphic bottom navigation
- "What to cook today?" random suggestion
- Mobile-first responsive design (390x844 optimized)
- localStorage persistence across sessions

---

## Technical Architecture
- Frontend: React 19 with React Router
- Styling: Tailwind CSS with earthy warm color palette
- UI Components: Shadcn/UI (Card, Button, Input, Checkbox, Calendar, Dialog, Tabs, Select)
- State: React Context API
- Storage: Browser localStorage
- Fonts: Kurale (headings), Nunito (body)

## localStorage Keys
- `gharkaCare_meals` - Weekly meal data
- `gharkaCare_groceries` - Grocery items by category
- `gharkaCare_reminders` - Reminder list
- `gharkaCare_language` - en/hi preference

---

## Prioritized Backlog

### P0 (Critical) - COMPLETED
- [x] Home overview page
- [x] Meal planner with week view
- [x] Grocery list with categories
- [x] Reminders with date picker
- [x] Daily summary modal
- [x] Language toggle

### P1 (Important) - Future
- [ ] Recurring reminders (e.g., weekly gas reminder)
- [ ] Common meals library (save favorite meals)
- [ ] Share grocery list via WhatsApp
- [ ] Week copy feature for meal planner

### P2 (Nice to Have) - Future
- [ ] Dark mode option
- [ ] Export data feature
- [ ] Monthly meal overview
- [ ] Voice input for adding items

---

## Next Action Items
1. Add recurring reminder support
2. Implement "Save to favorites" for meals
3. WhatsApp share integration for grocery lists
4. Consider PWA capabilities for offline use
