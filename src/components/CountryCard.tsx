import { Country, formatPopulation } from "@/lib/countries-api";
import { Users, MapPin, Globe2 } from "lucide-react";

interface CountryCardProps {
  country: Country;
  onClick: () => void;
  index: number;
}

export function CountryCard({ country, onClick, index }: CountryCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-smooth cursor-pointer border border-border/50 hover:border-primary/30 animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Flag */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={country.flags.svg || country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-semibold text-primary-foreground bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
            {country.cca2}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors truncate">
          {country.name.common}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span className="font-medium">Population:</span>
            <span>{formatPopulation(country.population)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe2 className="w-4 h-4 text-primary" />
            <span className="font-medium">Region:</span>
            <span>{country.region}</span>
          </div>

          {country.capital && country.capital[0] && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">Capital:</span>
              <span className="truncate">{country.capital[0]}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
