import { Country, formatPopulation } from "@/lib/countries-api";
import { X, Users, MapPin, Globe2, Languages, Coins, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CountryModalProps {
  country: Country;
  onClose: () => void;
}

export function CountryModal({ country, onClose }: CountryModalProps) {
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currencies = country.currencies
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
    : 'N/A';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-smooth"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Flag Header */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Country codes */}
          <div className="absolute bottom-4 left-6 flex gap-2">
            <span className="text-sm font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full">
              {country.cca2}
            </span>
            <span className="text-sm font-semibold bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
              {country.cca3}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {country.name.common}
          </h2>
          <p className="text-muted-foreground mb-6">{country.name.official}</p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <InfoItem icon={<Users className="w-5 h-5" />} label="Population" value={formatPopulation(country.population)} />
            <InfoItem icon={<Globe2 className="w-5 h-5" />} label="Region" value={country.region || 'N/A'} />
            <InfoItem icon={<MapPin className="w-5 h-5" />} label="Capital" value={country.capital?.join(', ') || 'N/A'} />
            <InfoItem icon={<Languages className="w-5 h-5" />} label="Languages" value={languages} />
            <InfoItem icon={<Coins className="w-5 h-5" />} label="Currencies" value={currencies} />
          </div>

          {/* Borders */}
          {country.borders && country.borders.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Bordering Countries</h3>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((border) => (
                  <span
                    key={border}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                  >
                    {border}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Map Link */}
          {country.maps?.googleMaps && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open(country.maps?.googleMaps, '_blank')}
            >
              <Map className="w-4 h-4 mr-2" />
              View on Google Maps
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
