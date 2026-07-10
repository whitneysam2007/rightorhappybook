import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Course from "./pages/Course";
import Speaking from "./pages/Speaking";
import Coaching from "./pages/Coaching";
import Layout from "./components/Layout";
import Conference from "./pages/Conference";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/book" component={Book} />
      <Route path="/course" component={Course} />
      <Route path="/speaking" component={Speaking} />
      <Route path="/coaching" component={Coaching} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Switch>
            {/* Conference landing page — standalone, no nav/footer */}
            <Route path="/conference" component={Conference} />
            {/* All other pages use the main Layout */}
            <Route>
              <Layout>
                <Router />
              </Layout>
            </Route>
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
