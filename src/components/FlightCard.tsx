import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Plane, Users } from 'lucide-react';
import { Flight } from '@/types';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Flight Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Plane className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-lg">{flight.airline}</span>
                <span className="text-gray-500">{flight.flightNumber}</span>
              </div>
              <Badge variant={flight.stops === 0 ? 'default' : 'secondary'}>
                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              {/* Departure */}
              <div className="text-center">
                <div className="text-2xl font-bold">{flight.departure.time}</div>
                <div className="text-sm text-gray-600">{flight.departure.airport}</div>
                <div className="text-xs text-gray-500">{flight.departure.city}</div>
              </div>

              {/* Duration */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>
                <div className="text-sm font-medium">{flight.duration}</div>
              </div>

              {/* Arrival */}
              <div className="text-center">
                <div className="text-2xl font-bold">{flight.arrival.time}</div>
                <div className="text-sm text-gray-600">{flight.arrival.airport}</div>
                <div className="text-xs text-gray-500">{flight.arrival.city}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{flight.aircraft}</span>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{flight.availableSeats} seats left</span>
              </div>
            </div>
          </div>

          {/* Price and Book Button */}
          <div className="lg:w-48 flex lg:flex-col items-center lg:items-end gap-4">
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">${flight.price}</div>
              <div className="text-sm text-gray-500">per person</div>
            </div>
            <Button 
              onClick={() => onSelect(flight)}
              className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700"
            >
              Select Flight
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}