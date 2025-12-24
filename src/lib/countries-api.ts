export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  cca2: string;
  cca3: string;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  borders?: string[];
  timezones?: string[];
  continents: string[];
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
  coatOfArms?: {
    png: string;
    svg: string;
  };
  latlng?: [number, number];
}

export type SearchType = 'name' | 'code' | 'capital' | 'region';

const BASE_URL = 'https://restcountries.com/v3.1';

export async function searchCountries(query: string, searchType: SearchType): Promise<Country[]> {
  if (!query.trim()) {
    return [];
  }

  let endpoint = '';
  
  switch (searchType) {
    case 'name':
      endpoint = `${BASE_URL}/name/${encodeURIComponent(query)}`;
      break;
    case 'code':
      endpoint = `${BASE_URL}/alpha/${encodeURIComponent(query)}`;
      break;
    case 'capital':
      endpoint = `${BASE_URL}/capital/${encodeURIComponent(query)}`;
      break;
    case 'region':
      endpoint = `${BASE_URL}/region/${encodeURIComponent(query)}`;
      break;
    default:
      endpoint = `${BASE_URL}/name/${encodeURIComponent(query)}`;
  }

  const response = await fetch(endpoint);
  
  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch countries');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

export async function getAllCountries(): Promise<Country[]> {
  const fields = 'name,cca2,cca3,capital,region,subregion,population,area,flags,languages,currencies,borders,timezones,continents,maps,coatOfArms,latlng';
  const response = await fetch(`${BASE_URL}/all?fields=${fields}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }

  return response.json();
}

export function formatPopulation(population: number): string {
  if (population >= 1_000_000_000) {
    return `${(population / 1_000_000_000).toFixed(1)}B`;
  }
  if (population >= 1_000_000) {
    return `${(population / 1_000_000).toFixed(1)}M`;
  }
  if (population >= 1_000) {
    return `${(population / 1_000).toFixed(1)}K`;
  }
  return population.toString();
}

export function formatArea(area: number): string {
  return new Intl.NumberFormat('en-US').format(area) + ' km²';
}
