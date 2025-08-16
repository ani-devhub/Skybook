import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeftRight, Search } from 'lucide-react';
import { airports } from '@/data/flights';
import { SearchParams } from '@/types';

interface FlightSearchProps {
  onSearch: (params: SearchParams) => void;
}

export function FlightSearch({ onSearch }: FlightSearchProps) {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    if (!from || !to || !departureDate) {
      return;
    }

    const searchParams: SearchParams = {
      from,
      to,
      departureDate,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      passengers,
      tripType
    };

    onSearch(searchParams);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Find Your Perfect Flight</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tripType} onValueChange={(value) => setTripType(value as 'one-way' | 'round-trip')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="one-way">One Way</TabsTrigger>
            <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
          </TabsList>
          
          <TabsContent value={tripType} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              {/* From */}
              <div className="space-y-2">
                <Label htmlFor="from">From</Label>
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger>
                    <SelectValue placeholder="Departure city" />
                  </SelectTrigger>
                  <SelectContent>
                    {airports.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        {airport.code} - {airport.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleSwap}
                  className="rounded-full"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>

              {/* To */}
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Arrival city" />
                  </SelectTrigger>
                  <SelectContent>
                    {airports.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        {airport.code} - {airport.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Departure Date */}
              <div className="space-y-2">
                <Label htmlFor="departure">Departure</Label>
                <Input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={today}
                />
              </div>

              {/* Return Date (if round trip) */}
              {tripType === 'round-trip' && (
                <div className="space-y-2">
                  <Label htmlFor="return">Return</Label>
                  <Input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={departureDate || today}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              {/* Passengers */}
              <div className="space-y-2">
                <Label htmlFor="passengers">Passengers</Label>
                <Select value={passengers.toString()} onValueChange={(value) => setPassengers(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
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

              {/* Search Button */}
              <Button 
                onClick={handleSearch} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <Search className="mr-2 h-4 w-4" />
                Search Flights
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}