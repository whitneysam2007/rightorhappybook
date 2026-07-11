import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Instagram } from "lucide-react";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [location] = useLocation();
  const isActive = location === href;
  return (
    <Link
      href={href}
      className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground/80"}`}
    >
      {children}
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/righthappy-logo.png"
              alt="RightHappy — How to Date Authentically"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/book">Book</NavLink>
            <a href="https://sam-s-site-9e21.thinkific.com/courses/HTDAC" target="_blank" rel="noopener noreferrer" className="text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary text-foreground/80">Course</a>
            <NavLink href="/speaking">Speaking</NavLink>
            <NavLink href="/coaching">Coaching</NavLink>
            <Link
              href="/speaking#booking"
              className="px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider rounded-sm hover:bg-primary/90 transition-colors"
            >
              Book Sam
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden bg-background border-t border-border/50 px-6 py-6 flex flex-col gap-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-sm font-medium uppercase tracking-wider py-2">Home</Link>
            <Link href="/book" onClick={() => setMobileOpen(false)} className="text-sm font-medium uppercase tracking-wider py-2">Book</Link>
            <a href="https://sam-s-site-9e21.thinkific.com/courses/HTDAC" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="text-sm font-medium uppercase tracking-wider py-2 hover:text-primary transition-colors">Course</a>
            <Link href="/speaking" onClick={() => setMobileOpen(false)} className="text-sm font-medium uppercase tracking-wider py-2">Speaking</Link>
            <Link href="/coaching" onClick={() => setMobileOpen(false)} className="text-sm font-medium uppercase tracking-wider py-2">Coaching</Link>
            <Link
              href="/speaking#booking"
              onClick={() => setMobileOpen(false)}
              className="px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider rounded-sm text-center"
            >
              Book Sam
            </Link>
          </nav>
        )}
      </header>

      <main className="flex-1 pt-16">
        {children}
      </main>

      <footer className="bg-card border-t border-border/50 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-serif text-lg font-bold">SAM WHITNEY</p>
              <p className="text-sm text-muted-foreground mt-1">Author · Speaker · Coach</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link href="/book" className="hover:text-primary transition-colors">Book</Link>
              <a href="https://sam-s-site-9e21.thinkific.com/courses/HTDAC" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Course</a>
              <Link href="/speaking" className="hover:text-primary transition-colors">Speaking</Link>
              <Link href="/coaching" className="hover:text-primary transition-colors">Coaching</Link>
              <Link href="/conference" className="hover:text-primary transition-colors">Conference</Link>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <a
                href="https://www.instagram.com/howtodateauthentically"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={16} />
                @howtodateauthentically
              </a>
              <p className="text-xs text-muted-foreground">
                © 2026 Sam Whitney. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
