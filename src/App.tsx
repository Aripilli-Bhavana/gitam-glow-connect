import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Internships from "./pages/Internships";
import ResumeParser from "./pages/ResumeParser";
import Mentors from "./pages/Mentors";
import CareerPath from "./pages/CareerPath";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/opportunities" element={<Internships />} />
            <Route path="/resume-parser" element={<ResumeParser />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/career-path" element={<CareerPath />} />
            <Route path="/career-tools" element={<CareerPath />} />
            <Route path="/community" element={<Dashboard />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/mentor-dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
