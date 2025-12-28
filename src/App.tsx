import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Donate from "./pages/Donate";
import Track from "./pages/Track";
import Stores from "./pages/Stores";
import FoodHunger from "./pages/FoodHunger";
import FoodWaste from "./pages/FoodWaste";
import NotFound from "./pages/NotFound";

// QueryClient config - keeping defaults for now
// TODO: Add error handling and retry logic later
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/track" element={<Track />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/food-hunger" element={<FoodHunger />} />
            <Route path="/food-waste" element={<FoodWaste />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
