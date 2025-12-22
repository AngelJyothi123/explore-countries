import { Globe2 } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-search flex items-center justify-center shadow-button">
            <Globe2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">World Explorer</h1>
            <p className="text-xs text-muted-foreground">Discover countries worldwide</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth">
            Home
          </a>
          <a href="#search" className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth">
            Search
          </a>
          <a href="#countries" className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth">
            Countries
          </a>
        </nav>
      </div>
    </header>
  );
}
