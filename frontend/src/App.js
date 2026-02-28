import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AppProvider } from "./context/AppContext";
import { BottomNav } from "./components/BottomNav";
import { DailySummaryModal } from "./components/DailySummaryModal";
import Home from "./pages/Home";
import MealPlanner from "./pages/MealPlanner";
import GroceryList from "./pages/GroceryList";
import Reminders from "./pages/Reminders";

function App() {
  return (
    <AppProvider>
      <div className="App min-h-screen bg-background">
        <BrowserRouter>
          <main className="pb-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meals" element={<MealPlanner />} />
              <Route path="/grocery" element={<GroceryList />} />
              <Route path="/reminders" element={<Reminders />} />
            </Routes>
          </main>
          <BottomNav />
          <DailySummaryModal />
        </BrowserRouter>
        <Toaster 
          position="top-center"
          toastOptions={{
            className: "rounded-2xl bg-card border border-border/40 shadow-lg",
            style: {
              fontFamily: '"Nunito", sans-serif',
            },
          }}
        />
      </div>
    </AppProvider>
  );
}

export default App;
