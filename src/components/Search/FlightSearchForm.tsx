import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Search, MapPin, Plane, Users } from 'lucide-react';
import { SearchFilters } from '@/types/flight';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface FlightSearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

const airports = [
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj International' },
  { code: 'BLR', city: 'Bangalore', name: 'Kempegowda International' },
  { code: 'GOI', city: 'Goa', name: 'Goa International' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhas Chandra Bose International' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International' }
];

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({ onSearch }) => {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState<'Economy' | 'Business' | 'First'>('Economy');

  const handleSearch = () => {
    if (!from || !to || !departureDate) {
      return;
    }

    const filters: SearchFilters = {
      from,
      to,
      departureDate: format(departureDate, 'yyyy-MM-dd'),
      returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : undefined,
      passengers,
      class: travelClass,
      tripType
    };

    onSearch(filters);
  };

  const swapAirports = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white shadow-lg">
      <CardContent className="p-6">
        <Tabs value={tripType} onValueChange={(value) => setTripType(value as 'one-way' | 'round-trip')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="one-way">One Way</TabsTrigger>
            <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
          </TabsList>

          <TabsContent value={tripType} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* From */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">From</Label>
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger className="h-12">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <SelectValue placeholder="Select departure" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {airports.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        <div className="flex flex-col">
                          <span className="font-medium">{airport.city}</span>
                          <span className="text-xs text-gray-500">{airport.code} - {airport.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Swap Button */}
              <div className="flex items-end justify-center lg:order-none order-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={swapAirports}
                >
                  <Plane className="h-4 w-4 transform rotate-90" />
                </Button>
              </div>

              {/* To */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">To</Label>
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger className="h-12">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <SelectValue placeholder="Select destination" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {airports.filter(airport => airport.code !== from).map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        <div className="flex flex-col">
                          <span className="font-medium">{airport.city}</span>
                          <span className="text-xs text-gray-500">{airport.code} - {airport.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Departure Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Departure</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 justify-start text-left font-normal",
                        !departureDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departureDate ? format(departureDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Return Date */}
              {tripType === 'round-trip' && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Return</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-12 justify-start text-left font-normal",
                          !returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate ? format(returnDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        disabled={(date) => date < (departureDate || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            {/* Passengers and Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Passengers</Label>
                <Select value={passengers.toString()} onValueChange={(value) => setPassengers(parseInt(value))}>
                  <SelectTrigger className="h-12">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Class</Label>
                <Select value={travelClass} onValueChange={(value) => setTravelClass(value as 'Economy' | 'Business' | 'First')}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Economy">Economy</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="First">First Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <Button 
                onClick={handleSearch} 
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 px-12 py-3 text-lg"
                disabled={!from || !to || !departureDate}
              >
                <Search className="mr-2 h-5 w-5" />
                Search Flights
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FlightSearchForm;