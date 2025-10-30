import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import BookDetails from "./pages/BookDetails";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyList from './pages/MyList';
import Login from './pages/Login';
import Lists from './pages/Lists';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/works/:id" element={<BookDetails />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/my-list" element={<MyList />} />
        <Route path="/login" element={<Login />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}
export default App;
