import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import HeroSection from '@/components/Home/HeroSection';
import PopularDestinations from '@/components/Home/PopularDestinations';
import Footer from '@/components/Home/Footer';
import FlightSearchForm from '@/components/Search/FlightSearchForm';
import FlightList from '@/components/Flight/FlightList';
import LoginDialog from '@/components/Auth/LoginDialog';
import BookingDialog from '@/components/Booking/BookingDialog';
import { SearchFilters, Flight } from '@/types/flight';
import { mockFlights } from '@/data/mockFlights';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function Index() {
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);

  const handleSearch = async (filters: SearchFilters) => {
    setIsSearching(true);
    setShowResults(true);
    setSearchFilters(filters);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Filter mock flights based on search criteria
    let results = mockFlights.filter(flight => 
      flight.departure.airport === filters.from && 
      flight.arrival.airport === filters.to
    );

    // If no exact matches, show all flights as suggestions
    if (results.length === 0) {
      results = mockFlights;
      toast.info('Showing all available flights for your reference');
    }

    setSearchResults(results);
    setIsSearching(false);
  };

  const handleBookFlight = (flight: Flight) => {
    if (!user) {
      setShowLoginDialog(true);
      toast.error('Please sign in to book flights');
      return;
    }
    
    setSelectedFlight(flight);
    setShowBookingDialog(true);
  };

  const handleDestinationSelect = (destinationCode: string) => {
    // Auto-fill destination in search form
    toast.success(`Selected destination: ${destinationCode}. Please complete your search!`);
  };

  const scrollToSearch = () => {
    const searchElement = document.getElementById('search-section');
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onLoginClick={() => setShowLoginDialog(true)} />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Search Section */}
        <section id="search-section" className="py-12 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="-mt-16 relative z-10">
              <FlightSearchForm onSearch={handleSearch} />
            </div>
          </div>
        </section>

        {/* Search Results */}
        {showResults && (
          <section className="py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isSearching ? 'Searching flights...' : `Flight Results`}
                </h2>
                {searchFilters && !isSearching && (
                  <p className="text-gray-600">
                    {searchFilters.from} → {searchFilters.to} • {searchFilters.departureDate} • {searchFilters.passengers} passenger{searchFilters.passengers > 1 ? 's' : ''}
                  </p>
                )}
              </div>
              
              <FlightList 
                flights={searchResults}
                onBookFlight={handleBookFlight}
                isLoading={isSearching}
              />
            </div>
          </section>
        )}

        {/* Popular Destinations */}
        {!showResults && (
          <PopularDestinations onDestinationSelect={handleDestinationSelect} />
        )}

        {/* Features Section */}
        {!showResults && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Why Choose SkyBook?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="text-4xl">💰</div>
                  <h3 className="text-xl font-semibold">Best Price Guarantee</h3>
                  <p className="text-gray-600">Find the lowest prices or we'll refund the difference</p>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl">⚡</div>
                  <h3 className="text-xl font-semibold">Instant Confirmation</h3>
                  <p className="text-gray-600">Get your booking confirmed in seconds</p>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl">🛡️</div>
                  <h3 className="text-xl font-semibold">Secure & Safe</h3>
                  <p className="text-gray-600">Your data and payments are protected with industry-leading security</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Dialogs */}
      <LoginDialog 
        isOpen={showLoginDialog} 
        onClose={() => setShowLoginDialog(false)} 
      />
      
      <BookingDialog
        isOpen={showBookingDialog}
        onClose={() => setShowBookingDialog(false)}
        flight={selectedFlight}
        passengers={searchFilters?.passengers || 1}
      />
    </div>
  );
}
