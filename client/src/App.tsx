import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Course from "./pages/Course";
import CoursePlayer from "./course/CoursePlayer";
import Signup from "./course/Signup";
import Login from "./course/Login";
import Admin from "./course/Admin";
import { useAuth } from "./course/supabase";
import Speaking from "./pages/Speaking";
import Coaching from "./pages/Coaching";
import Layout from "./components/Layout";
import Conference from "./pages/Conference";
import Guide from "./pages/Guide";

// The course is for buyers with an account. No session -> log in first.
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <div className="container py-10">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }
  if (!session) return <Redirect to="/course/login" />;
  return <>{children}</>;
}

// Logged-in users don't need the signup or login page — except when they
// arrived on a password-reset link (hash carries type=recovery): then the
// login page must stay mounted so they can set a new password.
function RedirectIfAuthed({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const isRecovery =
    typeof window !== "undefined" && window.location.hash.includes("type=recovery");
  if (loading) {
    return (
      <div className="container py-10">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }
  if (session && !isRecovery) return <Redirect to="/course/learn" />;
  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/book" component={Book} />
      <Route path="/course" component={Course} />
      <Route path="/course/signup">
        <RedirectIfAuthed>
          <Signup />
        </RedirectIfAuthed>
      </Route>
      <Route path="/course/login">
        <RedirectIfAuthed>
          <Login />
        </RedirectIfAuthed>
      </Route>
      <Route path="/course/admin">
        <RequireAuth>
          <Admin />
        </RequireAuth>
      </Route>
      <Route path="/course/learn">
        <RequireAuth>
          <CoursePlayer />
        </RequireAuth>
      </Route>
      <Route path="/course/learn/:lessonId">
        <RequireAuth>
          <CoursePlayer />
        </RequireAuth>
      </Route>
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
            {/* Guide landing page for the Meta ad campaign — standalone, no nav/footer */}
            <Route path="/guide" component={Guide} />
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
