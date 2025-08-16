import React, { useState } from 'react';
import { FlightSearch } from '@/components/FlightSearch';
import { FlightCard } from '@/components/FlightCard';
import { Header } from '@/components/Header';
import { generateFlights } from '@/data/flights';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SearchParams, Flight } from '@/types';
import { Plane, Star, Shield, Clock } from 'lucide-react';

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { setSearchParams, setSelectedFlight } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = async (params: SearchParams) => {
    setIsSearching(true);
    setSearchParams(params);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const searchResults = generateFlights(params.from, params.to, params.departureDate);
    setFlights(searchResults);
    setIsSearching(false);
  };

  const handleSelectFlight = (flight: Flight) => {
    if (!user) {
      // Store selected flight and redirect to login
      setSelectedFlight(flight);
      navigate('/login?redirect=booking');
      return;
    }
    
    setSelectedFlight(flight);
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      {flights.length === 0 && !isSearching && (
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center space-y-6 mb-12">
              <h1 className="text-4xl md:text-6xl font-bold">
                Find Your Perfect Flight
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Book flights to destinations worldwide with ease. Compare prices, 
                choose your seat, and travel with confidence.
              </p>
            </div>
            
            <FlightSearch onSearch={handleSearch} />
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Best Prices</h3>
                <p className="text-blue-100">
                  Compare prices across airlines to find the best deals for your journey.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Secure Booking</h3>
                <p className="text-blue-100">
                  Your personal and payment information is always protected and secure.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">24/7 Support</h3>
                <p className="text-blue-100">
                  Get help whenever you need it with our round-the-clock customer support.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {(flights.length > 0 || isSearching) && (
        <div className="container mx-auto px-4 py-8">
          {/* Search Form - Compact */}
          <div className="mb-8">
            <FlightSearch onSearch={handleSearch} />
          </div>

          {isSearching ? (
            <div className="text-center py-12">
              <Plane className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Searching for flights...</h3>
              <p className="text-gray-600">Please wait while we find the best options for you.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Available Flights ({flights.length})
                </h2>
                <div className="text-sm text-gray-600">
                  Prices shown are per person
                </div>
              </div>

              {flights.length === 0 ? (
                <div className="text-center py-12">
                  <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No flights found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {flights.map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      onSelect={handleSelectFlight}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}