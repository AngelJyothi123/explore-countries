import { useState } from "react";
import { Search, ChevronDown, MapPin, Code, Building2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchType } from "@/lib/countries-api";

interface SearchSectionProps {
  onSearch: (query: string, type: SearchType) => void;
  isLoading: boolean;
}

const searchTypeOptions: { value: SearchType; label: string; icon: React.ReactNode; placeholder: string }[] = [
  { value: 'name', label: 'Country Name', icon: <Globe className="w-4 h-4" />, placeholder: 'e.g., Japan, Germany, Brazil...' },
  { value: 'code', label: 'Country Code', icon: <Code className="w-4 h-4" />, placeholder: 'e.g., US, GB, JP, DE...' },
  { value: 'capital', label: 'Capital City', icon: <Building2 className="w-4 h-4" />, placeholder: 'e.g., Tokyo, London, Paris...' },
  { value: 'region', label: 'Continent/Region', icon: <MapPin className="w-4 h-4" />, placeholder: 'e.g., Asia, Europe, Africa...' },
];

export function SearchSection({ onSearch, isLoading }: SearchSectionProps) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('name');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedOption = searchTypeOptions.find(opt => opt.value === searchType)!;

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section id="search" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Explore</span> the World
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Search by country name, code, capital city, or continent to discover fascinating details about any nation.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl p-2 shadow-card border border-border/50 flex flex-col md:flex-row gap-2">
            {/* Search Type Dropdown */}
            <div className="relative md:w-52">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-12 px-4 rounded-xl bg-secondary flex items-center justify-between gap-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-smooth"
              >
                <div className="flex items-center gap-2">
                  {selectedOption.icon}
                  <span>{selectedOption.label}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-lg border border-border/50 overflow-hidden z-50 animate-fade-in">
                  {searchTypeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSearchType(option.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 text-sm font-medium hover:bg-secondary transition-smooth ${
                        searchType === option.value ? 'bg-primary/10 text-primary' : 'text-foreground'
                      }`}
                    >
                      {option.icon}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={selectedOption.placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-12 pl-12 pr-4 border-0 bg-transparent focus-visible:ring-0"
              />
            </div>

            {/* Search Button */}
            <Button
              variant="hero"
              size="lg"
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
              className="h-12 px-8"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['Japan', 'Europe', 'Paris', 'US'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  onSearch(suggestion, suggestion === 'Europe' ? 'region' : suggestion === 'Paris' ? 'capital' : suggestion === 'US' ? 'code' : 'name');
                }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-smooth"
              >
                Try "{suggestion}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
