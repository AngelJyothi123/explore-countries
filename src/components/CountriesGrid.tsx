import { Country } from "@/lib/countries-api";
import { CountryCard } from "./CountryCard";
import { CountryCardSkeleton } from "./CountryCardSkeleton";
import { Globe2, SearchX } from "lucide-react";

interface CountriesGridProps {
  countries: Country[];
  isLoading: boolean;
  onCountryClick: (country: Country) => void;
  hasSearched: boolean;
}

export function CountriesGrid({ countries, isLoading, onCountryClick, hasSearched }: CountriesGridProps) {
  if (isLoading) {
    return (
      <section id="countries" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CountryCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!hasSearched) {
    return (
      <section id="countries" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <Globe2 className="w-12 h-12 text-primary animate-float" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Start Your Exploration</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Use the search above to discover countries by name, code, capital, or continent.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (countries.length === 0) {
    return (
      <section id="countries" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
              <SearchX className="w-12 h-12 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">No Countries Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any countries matching your search. Try a different query or search type.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="countries" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Results <span className="text-primary">({countries.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {countries.map((country, index) => (
            <CountryCard
              key={country.cca3}
              country={country}
              onClick={() => onCountryClick(country)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
