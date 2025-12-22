import { Globe2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-search flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">World Explorer</h3>
              <p className="text-xs text-muted-foreground">Powered by REST Countries API</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for exploration
          </p>
        </div>
      </div>
    </footer>
  );
}
