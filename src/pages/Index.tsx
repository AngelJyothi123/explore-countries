import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchSection } from "@/components/SearchSection";
import { CountriesGrid } from "@/components/CountriesGrid";
import { CountryModal } from "@/components/CountryModal";
import { Footer } from "@/components/Footer";
import { Country, SearchType, searchCountries } from "@/lib/countries-api";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string, searchType: SearchType) => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const results = await searchCountries(query, searchType);
      setCountries(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: `No countries found for "${query}". Try a different search term.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Countries found!",
          description: `Found ${results.length} ${results.length === 1 ? 'country' : 'countries'} matching your search.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch countries. Please try again.",
        variant: "destructive",
      });
      setCountries([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <SearchSection onSearch={handleSearch} isLoading={isLoading} />
        <CountriesGrid
          countries={countries}
          isLoading={isLoading}
          onCountryClick={setSelectedCountry}
          hasSearched={hasSearched}
        />
      </main>

      <Footer />

      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
};

export default Index;
