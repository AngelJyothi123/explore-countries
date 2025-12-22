export function CountryCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/50">
      {/* Flag skeleton */}
      <div className="h-44 bg-muted animate-pulse" />
      
      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        <div className="h-6 bg-muted rounded-lg w-3/4 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full animate-pulse" />
          <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
          <div className="h-4 bg-muted rounded w-4/5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
