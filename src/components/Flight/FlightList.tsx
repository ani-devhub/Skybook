import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Flight } from '@/types/flight';
import FlightCard from './FlightCard';
import { Filter, SortAsc } from 'lucide-react';

interface FlightListProps {
  flights: Flight[];
  onBookFlight: (flight: Flight) => void;
  isLoading?: boolean;
}

const FlightList: React.FC<FlightListProps> = ({ flights, onBookFlight, isLoading = false }) => {
  const [sortBy, setSortBy] = useState<string>('price');
  const [filterClass, setFilterClass] = useState<string>('all');

  const filteredAndSortedFlights = React.useMemo(() => {
    let filtered = flights;

    // Filter by class
    if (filterClass !== 'all') {
      filtered = filtered.filter(flight => flight.class.toLowerCase() === filterClass.toLowerCase());
    }

    // Sort flights
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration': {
          const aDuration = parseInt(a.duration.replace(/[^\d]/g, ''));
          const bDuration = parseInt(b.duration.replace(/[^\d]/g, ''));
          return aDuration - bDuration;
        }
        case 'departure':
          return a.departure.time.localeCompare(b.departure.time);
        case 'arrival':
          return a.arrival.time.localeCompare(b.arrival.time);
        default:
          return 0;
      }
    });

    return sorted;
  }, [flights, sortBy, filterClass]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="text-6xl mb-4">✈️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
          <p className="text-gray-600">Try adjusting your search criteria to find more flights.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Sort */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter & Sort</span>
            </span>
            <Badge variant="secondary">
              {filteredAndSortedFlights.length} flight{filteredAndSortedFlights.length !== 1 ? 's' : ''} found
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Sort by</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <div className="flex items-center space-x-2">
                    <SortAsc className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price (Low to High)</SelectItem>
                  <SelectItem value="duration">Duration (Shortest First)</SelectItem>
                  <SelectItem value="departure">Departure Time</SelectItem>
                  <SelectItem value="arrival">Arrival Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Filter by Class</label>
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flight Cards */}
      <div className="space-y-4">
        {filteredAndSortedFlights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            onBook={onBookFlight}
          />
        ))}
      </div>
    </div>
  );
};

export default FlightList;