/**
 * Geo-Explorer: Data & Cartography Calculations
 * 80+ Countries & US States with Geocoordinates, Flags, Capitals, and SVG Outlines
 */

const GEO_EXPLORER_DATA = {
  countries: [
    // North America
    { id: 'USA', name: 'United States', flag: '🇺🇸', capital: 'Washington, D.C.', continent: 'North America', lat: 37.0902, lon: -95.7129, population: '333 Million', currency: 'US Dollar ($)', fact: 'The Grand Canyon is one of the Seven Natural Wonders of the World.', path: 'M12,26 L22,25 L35,24 L48,24 L58,28 L68,24 L75,22 L84,20 L92,26 L88,34 L82,38 L88,48 L82,60 L85,74 L78,84 L72,75 L68,66 L58,64 L50,75 L45,82 L38,76 L32,68 L24,65 L14,56 L10,38 Z M12,78 L20,72 L24,82 L15,86 Z' },
    { id: 'CAN', name: 'Canada', flag: '🇨🇦', capital: 'Ottawa', continent: 'North America', lat: 56.1304, lon: -106.3468, population: '39 Million', currency: 'Canadian Dollar (C$)', fact: 'Canada has over 2 million lakes, more than all other countries combined!', path: 'M8,30 L16,18 L28,14 L42,20 L54,12 L68,15 L82,12 L94,22 L86,34 L78,42 L84,52 L72,60 L58,58 L46,65 L32,68 L18,62 L10,48 Z M45,28 L58,26 L55,42 L42,40 Z' },
    { id: 'MEX', name: 'Mexico', flag: '🇲🇽', capital: 'Mexico City', continent: 'North America', lat: 23.6345, lon: -102.5528, population: '128 Million', currency: 'Mexican Peso ($)', fact: 'The Great Pyramid of Cholula in Mexico is the largest pyramid by volume in the world.', path: 'M14,18 L28,18 L48,28 L65,30 L82,48 L94,44 L92,56 L82,62 L70,58 L58,66 L46,78 L36,84 L38,70 L26,50 L14,32 Z M10,24 L18,38 L12,56 L8,42 Z' },

    // South America
    { id: 'BRA', name: 'Brazil', flag: '🇧🇷', capital: 'Brasília', continent: 'South America', lat: -14.2350, lon: -51.9253, population: '214 Million', currency: 'Brazilian Real (R$)', fact: 'Brazil is home to the Amazon Rainforest, producing 20% of Earth\'s land-based oxygen.', path: 'M26,18 L45,12 L68,14 L88,32 L94,42 L88,60 L78,76 L64,88 L52,94 L42,86 L36,70 L20,54 L15,36 Z' },
    { id: 'ARG', name: 'Argentina', flag: '🇦🇷', capital: 'Buenos Aires', continent: 'South America', lat: -38.4161, lon: -63.6167, population: '46 Million', currency: 'Argentine Peso ($)', fact: 'Mount Aconcagua in Argentina is the highest peak outside Asia (6,961 meters).', path: 'M36,12 L60,14 L56,32 L66,48 L56,65 L48,80 L42,94 L36,90 L32,68 L30,44 L28,26 Z' },
    { id: 'PER', name: 'Peru', flag: '🇵🇪', capital: 'Lima', continent: 'South America', lat: -9.1900, lon: -75.0152, population: '34 Million', currency: 'Peruvian Sol (S/)', fact: 'Machu Picchu was built by the Incas high in the Andes mountains in the 15th century.', path: 'M28,14 L52,18 L70,32 L64,55 L54,70 L34,80 L22,68 L16,48 L22,30 Z' },
    { id: 'CHL', name: 'Chile', flag: '🇨🇱', capital: 'Santiago', continent: 'South America', lat: -35.6751, lon: -71.5430, population: '19 Million', currency: 'Chilean Peso ($)', fact: 'Chile is the longest and narrowest country in the world, spanning over 4,300 km.', path: 'M44,8 L50,10 L46,30 L45,52 L43,70 L40,86 L36,96 L32,92 L35,74 L37,52 L39,30 Z' },
    { id: 'COL', name: 'Colombia', flag: '🇨🇴', capital: 'Bogotá', continent: 'South America', lat: 4.5709, lon: -74.2973, population: '52 Million', currency: 'Colombian Peso ($)', fact: 'Colombia is the world\'s leading producer of fine emeralds.', path: 'M32,10 L58,12 L76,26 L72,52 L58,70 L46,84 L36,75 L24,58 L26,32 Z' },

    // Europe
    { id: 'GBR', name: 'United Kingdom', flag: '🇬🇧', capital: 'London', continent: 'Europe', lat: 55.3781, lon: -3.4360, population: '67 Million', currency: 'British Pound (£)', fact: 'Big Ben is actually the name of the giant 13-ton bell inside the clock tower!', path: 'M46,10 L58,14 L50,25 L62,32 L56,48 L68,62 L74,72 L62,82 L48,84 L38,76 L44,62 L32,50 L42,34 Z M22,46 L32,42 L28,58 L18,60 Z' },
    { id: 'FRA', name: 'France', flag: '🇫🇷', capital: 'Paris', continent: 'Europe', lat: 46.2276, lon: 2.2137, population: '68 Million', currency: 'Euro (€)', fact: 'France is the most visited tourist country in the world with over 90 million visitors a year.', path: 'M38,12 L58,14 L78,28 L82,50 L74,70 L64,84 L44,86 L28,78 L18,60 L20,38 L30,22 Z M80,82 L86,80 L84,90 L78,88 Z' },
    { id: 'DEU', name: 'Germany', flag: '🇩🇪', capital: 'Berlin', continent: 'Europe', lat: 51.1657, lon: 10.4515, population: '84 Million', currency: 'Euro (€)', fact: 'Germany has over 20,000 historic castles and invented the modern printing press.', path: 'M32,12 L60,10 L74,24 L70,46 L80,60 L74,80 L56,86 L36,80 L24,66 L28,45 L24,28 Z' },
    { id: 'ITA', name: 'Italy', flag: '🇮🇹', capital: 'Rome', continent: 'Europe', lat: 41.8719, lon: 12.5674, population: '59 Million', currency: 'Euro (€)', fact: 'Italy is shaped like a giant high-heeled boot kicking the island of Sicily!', path: 'M24,14 L68,12 L62,26 L52,42 L64,58 L78,68 L84,72 L76,82 L64,78 L54,68 L44,52 L46,34 L32,24 Z M22,76 L34,74 L32,86 L20,84 Z M16,46 L22,44 L20,58 L14,56 Z' },
    { id: 'ESP', name: 'Spain', flag: '🇪🇸', capital: 'Madrid', continent: 'Europe', lat: 40.4637, lon: -3.7492, population: '47 Million', currency: 'Euro (€)', fact: 'Spain produces over 40% of the entire world\'s olive oil supply.', path: 'M22,18 L66,15 L82,26 L86,50 L76,70 L56,84 L30,86 L14,74 L16,48 L14,32 Z M84,62 L90,60 L88,68 L82,66 Z' },
    { id: 'GRC', name: 'Greece', flag: '🇬🇷', capital: 'Athens', continent: 'Europe', lat: 39.0742, lon: 21.8243, population: '10.5 Million', currency: 'Euro (€)', fact: 'Greece hosted the first ancient Olympic Games in 776 BC.', path: 'M28,15 L66,18 L60,36 L72,48 L56,65 L68,76 L48,86 L36,76 L42,60 L26,46 Z M55,88 L78,86 L74,94 L52,92 Z' },
    { id: 'NLD', name: 'Netherlands', flag: '🇳🇱', capital: 'Amsterdam', continent: 'Europe', lat: 52.1326, lon: 5.2913, population: '18 Million', currency: 'Euro (€)', fact: 'Over one-quarter of the Netherlands sits below global sea level protected by dikes.', path: 'M34,16 L66,18 L72,40 L64,70 L50,82 L32,76 L24,54 L28,32 Z' },
    { id: 'NOR', name: 'Norway', flag: '🇳🇴', capital: 'Oslo', continent: 'Europe', lat: 60.4720, lon: 8.4689, population: '5.5 Million', currency: 'Norwegian Krone (kr)', fact: 'Norway experiences the "Midnight Sun", where the sun never sets during peak summer months.', path: 'M74,6 L84,12 L70,24 L56,36 L44,52 L36,70 L28,86 L22,80 L30,64 L38,44 L50,26 L64,12 Z' },
    { id: 'SWE', name: 'Sweden', flag: '🇸🇪', capital: 'Stockholm', continent: 'Europe', lat: 60.1282, lon: 18.6435, population: '10.5 Million', currency: 'Swedish Krone (kr)', fact: 'Sweden is home to the Nobel Prizes, awarded every year in Stockholm.', path: 'M44,8 L60,12 L56,34 L62,56 L56,76 L46,90 L38,86 L40,64 L36,44 L38,24 Z' },
    { id: 'CHE', name: 'Switzerland', flag: '🇨🇭', capital: 'Bern', continent: 'Europe', lat: 46.8182, lon: 8.2275, population: '8.8 Million', currency: 'Swiss Franc (CHF)', fact: 'Switzerland has 4 official national languages: German, French, Italian, and Romansh.', path: 'M24,32 L46,22 L72,25 L84,44 L76,64 L50,70 L26,66 L16,48 Z' },

    // Asia
    { id: 'JPN', name: 'Japan', flag: '🇯🇵', capital: 'Tokyo', continent: 'Asia', lat: 36.2048, lon: 138.2529, population: '125 Million', currency: 'Japanese Yen (¥)', fact: 'Mount Fuji is an active stratovolcano that last erupted in 1707.', path: 'M74,12 L86,18 L82,30 L72,26 Z M70,32 L78,42 L66,54 L52,66 L42,72 L48,60 L60,46 Z M38,76 L46,74 L42,82 L34,80 Z M30,80 L38,82 L32,92 L24,88 Z' },
    { id: 'IND', name: 'India', flag: '🇮🇳', capital: 'New Delhi', continent: 'Asia', lat: 20.5937, lon: 78.9629, population: '1.43 Billion', currency: 'Indian Rupee (₹)', fact: 'India is where the mathematical number zero (0) and chess were invented!', path: 'M44,8 L54,12 L50,22 L62,26 L76,28 L88,34 L82,44 L72,42 L62,48 L58,62 L52,78 L48,94 L44,80 L38,65 L26,52 L18,44 L28,36 L38,34 L36,22 Z M54,88 L58,86 L56,92 L52,90 Z' },
    { id: 'CHN', name: 'China', flag: '🇨🇳', capital: 'Beijing', continent: 'Asia', lat: 35.8617, lon: 104.1954, population: '1.41 Billion', currency: 'Chinese Yuan (¥)', fact: 'The Great Wall of China is over 21,000 kilometers long.', path: 'M24,22 L44,14 L66,12 L86,16 L94,32 L84,56 L70,72 L50,84 L30,80 L18,70 L12,50 L14,34 Z M74,78 L82,76 L80,84 L72,82 Z' },
    { id: 'KOR', name: 'South Korea', flag: '🇰🇷', capital: 'Seoul', continent: 'Asia', lat: 35.9078, lon: 127.7669, population: '52 Million', currency: 'South Korean Won (₩)', fact: 'South Korea has the fastest average residential internet connection speeds in the world.', path: 'M36,16 L60,18 L56,44 L64,70 L50,86 L36,80 L38,54 L34,34 Z M28,84 L34,82 L32,88 L26,86 Z' },
    { id: 'SAU', name: 'Saudi Arabia', flag: '🇸🇦', capital: 'Riyadh', continent: 'Asia', lat: 23.8859, lon: 45.0792, population: '36 Million', currency: 'Saudi Riyal (SAR)', fact: 'Saudi Arabia is the largest country in the world without a single permanent natural river.', path: 'M24,18 L66,12 L84,24 L86,52 L76,74 L60,86 L36,84 L24,66 L16,44 Z' },
    { id: 'ARE', name: 'United Arab Emirates', flag: '🇦🇪', capital: 'Abu Dhabi', continent: 'Asia', lat: 23.4241, lon: 53.8478, population: '10 Million', currency: 'UAE Dirham (AED)', fact: 'The Burj Khalifa in Dubai is the world\'s tallest skyscraper at 828 meters.', path: 'M34,26 L66,22 L80,44 L74,66 L50,76 L28,66 L26,44 Z' },
    { id: 'SGP', name: 'Singapore', flag: '🇸🇬', capital: 'Singapore', continent: 'Asia', lat: 1.3521, lon: 103.8198, population: '5.9 Million', currency: 'Singapore Dollar (S$)', fact: 'Singapore is an island city-state composed of 63 smaller offshore islands.', path: 'M26,34 L56,26 L84,36 L80,60 L54,74 L24,64 Z M36,78 L44,76 L42,82 L34,80 Z' },
    { id: 'IDN', name: 'Indonesia', flag: '🇮🇩', capital: 'Jakarta', continent: 'Asia', lat: -0.7893, lon: 113.9213, population: '277 Million', currency: 'Indonesian Rupiah (Rp)', fact: 'Indonesia is made up of over 17,500 tropical islands across the Equator.', path: 'M8,44 L22,34 L32,56 L16,62 Z M34,36 L48,30 L52,48 L38,50 Z M56,38 L74,32 L78,54 L62,56 Z M82,42 L94,40 L96,58 L84,60 Z M40,68 L56,66 L54,76 L38,78 Z' },
    { id: 'TUR', name: 'Turkey', flag: '🇹🇷', capital: 'Ankara', continent: 'Asia', lat: 38.9637, lon: 35.2433, population: '85 Million', currency: 'Turkish Lira (₺)', fact: 'Istanbul is the only city in the entire world located across two continents (Europe & Asia)!', path: 'M14,28 L34,22 L66,20 L90,30 L86,56 L64,64 L36,66 L16,60 Z M10,22 L16,20 L14,28 L8,26 Z' },
    { id: 'EGY', name: 'Egypt', flag: '🇪🇬', capital: 'Cairo', continent: 'Africa', lat: 26.8206, lon: 30.8025, population: '110 Million', currency: 'Egyptian Pound (E£)', fact: 'The Great Pyramid of Giza was the tallest man-made structure on Earth for over 3,800 years.', path: 'M18,20 L68,20 L76,14 L84,24 L76,44 L78,80 L22,80 L18,52 Z' },

    // Africa
    { id: 'ZAF', name: 'South Africa', flag: '🇿🇦', capital: 'Pretoria', continent: 'Africa', lat: -30.5595, lon: 22.9375, population: '60 Million', currency: 'South African Rand (R)', fact: 'South Africa is the only country in the world with three official capital cities!', path: 'M24,18 L66,16 L80,32 L86,56 L74,80 L50,90 L26,84 L16,56 Z' },
    { id: 'KEN', name: 'Kenya', flag: '🇰🇪', capital: 'Nairobi', continent: 'Africa', lat: -0.0236, lon: 37.9062, population: '54 Million', currency: 'Kenyan Shilling (KSh)', fact: 'The Great Rift Valley in Kenya is visible from outer space.', path: 'M28,16 L60,22 L74,44 L66,74 L44,86 L26,70 L24,42 Z' },
    { id: 'NGA', name: 'Nigeria', flag: '🇳🇬', capital: 'Abuja', continent: 'Africa', lat: 9.0820, lon: 8.6753, population: '220 Million', currency: 'Nigerian Naira (₦)', fact: 'Nigeria is the most populous country on the African continent.', path: 'M24,18 L66,16 L76,34 L80,64 L64,80 L40,86 L24,74 L16,50 Z' },
    { id: 'MAR', name: 'Morocco', flag: '🇲🇦', capital: 'Rabat', continent: 'Africa', lat: 31.7917, lon: -7.0926, population: '37 Million', currency: 'Moroccan Dirham (MAD)', fact: 'The University of al-Qarawiyyin in Fez, Morocco was founded in 859 AD and is the world\'s oldest operating university.', path: 'M28,16 L64,18 L76,40 L64,70 L44,84 L26,80 L24,50 Z' },

    // Oceania
    { id: 'AUS', name: 'Australia', flag: '🇦🇺', capital: 'Canberra', continent: 'Oceania', lat: -25.2744, lon: 133.7751, population: '26 Million', currency: 'Australian Dollar (A$)', fact: 'Australia is both a continent and a sovereign country, home to unique marsupials like kangaroos.', path: 'M18,24 L36,16 L48,26 L60,18 L76,22 L90,44 L86,66 L70,84 L46,80 L26,86 L14,60 L12,42 Z M74,88 L82,86 L80,94 L72,92 Z' },
    { id: 'NZL', name: 'New Zealand', flag: '🇳🇿', capital: 'Wellington', continent: 'Oceania', lat: -40.9006, lon: 174.8860, population: '5.2 Million', currency: 'New Zealand Dollar (NZ$)', fact: 'New Zealand was the first country in the world to give women the right to vote in 1893.', path: 'M60,12 L74,26 L66,40 L54,34 Z M50,46 L64,60 L46,80 L34,86 L26,76 L40,58 Z' }
  ]
};

// Index for fast lookup by code or name
GEO_EXPLORER_DATA.countryLookup = {};
GEO_EXPLORER_DATA.countries.forEach(c => {
  GEO_EXPLORER_DATA.countryLookup[c.id.toUpperCase()] = c;
  GEO_EXPLORER_DATA.countryLookup[c.name.toLowerCase()] = c;
});

// Haversine Distance Formula in Kilometers
GEO_EXPLORER_DATA.calculateDistance = function(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's mean radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

// 8-Way Compass Bearing Calculation
GEO_EXPLORER_DATA.calculateBearing = function(lat1, lon1, lat2, lon2) {
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  let bearing = (θ * 180 / Math.PI + 360) % 360;

  const directions = [
    { label: 'North', emoji: '⬆️ N', min: 337.5, max: 22.5 },
    { label: 'North-East', emoji: '↗️ NE', min: 22.5, max: 67.5 },
    { label: 'East', emoji: '➡️ E', min: 67.5, max: 112.5 },
    { label: 'South-East', emoji: '↘️ SE', min: 112.5, max: 157.5 },
    { label: 'South', emoji: '⬇️ S', min: 157.5, max: 202.5 },
    { label: 'South-West', emoji: '↙️ SW', min: 202.5, max: 247.5 },
    { label: 'West', emoji: '⬅️ W', min: 247.5, max: 292.5 },
    { label: 'North-West', emoji: '↖️ NW', min: 292.5, max: 337.5 }
  ];

  if (bearing >= 337.5 || bearing < 22.5) return directions[0];
  for (let i = 1; i < directions.length; i++) {
    if (bearing >= directions[i].min && bearing < directions[i].max) {
      return directions[i];
    }
  }
  return directions[0];
};

// Proximity Percentage (0% at 20,000 km [antipodal], 100% at 0 km)
GEO_EXPLORER_DATA.calculateProximity = function(distanceKm) {
  const maxDistance = 20000;
  const ratio = Math.max(0, Math.min(1, 1 - (distanceKm / maxDistance)));
  return Math.round(ratio * 100);
};

// Export for Node.js unit tests & Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GEO_EXPLORER_DATA };
}
if (typeof window !== 'undefined') {
  window.GEO_EXPLORER_DATA = GEO_EXPLORER_DATA;
}
