import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Clock, Users, Wifi, Coffee } from 'lucide-react';
import { Flight } from '@/types/flight';
import { useAuth } from '@/context/AuthContext';

interface FlightCardProps {
  flight: Flight;
  onBook: (flight: Flight) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onBook }) => {
  const { user } = useAuth();

  const getAirlineLogo = (airline: string) => {
    const logos: { [key: string]: string } = {
      'Air India': '🇮🇳',
      'SpiceJet': '🌶️',
      'Vistara': '✈️',
      'IndiGo': '🛩️'
    };
    return logos[airline] || '✈️';
  };

  const getClassColor = (flightClass: string) => {
    switch (flightClass) {
      case 'Economy':
        return 'bg-green-100 text-green-800';
      case 'Business':
        return 'bg-blue-100 text-blue-800';
      case 'First':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Airline Info */}
          <div className="lg:col-span-3 flex items-center space-x-3">
            <div className="text-2xl">{getAirlineLogo(flight.airline)}</div>
            <div>
              <div className="font-semibold text-gray-900">{flight.airline}</div>
              <div className="text-sm text-gray-500">{flight.flightNumber}</div>
            </div>
          </div>

          {/* Flight Times */}
          <div className="lg:col-span-4 flex items-center justify-between">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{flight.departure.time}</div>
              <div className="text-sm text-gray-600">{flight.departure.airport}</div>
              <div className="text-xs text-gray-500">{flight.departure.city}</div>
            </div>
            
            <div className="flex flex-col items-center px-4">
              <div className="text-xs text-gray-500 mb-1">{flight.duration}</div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <div className="flex-1 h-0.5 bg-gray-300 relative">
                  <Plane className="absolute -top-2 left-1/2 transform -translate-x-1/2 h-4 w-4 text-blue-600" />
                </div>
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
              </div>
            </div>

            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{flight.arrival.time}</div>
              <div className="text-sm text-gray-600">{flight.arrival.airport}</div>
              <div className="text-xs text-gray-500">{flight.arrival.city}</div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="lg:col-span-2 flex flex-col items-center space-y-2">
            <Badge className={getClassColor(flight.class)}>
              {flight.class}
            </Badge>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Users className="h-3 w-3" />
              <span>{flight.seats} seats left</span>
            </div>
            <div className="flex space-x-2">
              <Wifi className="h-4 w-4 text-gray-400" />
              <Coffee className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Price and Book */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end space-y-2">
            <div className="text-center lg:text-right">
              <div className="text-2xl font-bold text-blue-600">₹{flight.price.toLocaleString()}</div>
              <div className="text-sm text-gray-500">per person</div>
            </div>
            
            <Button 
              onClick={() => onBook(flight)}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-2"
              disabled={flight.seats === 0}
            >
              {user ? 'Book Now' : 'Sign in to Book'}
            </Button>
          </div>
        </div>

        {/* Mobile responsive adjustments */}
        <div className="lg:hidden mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Badge className={getClassColor(flight.class)}>
                {flight.class}
              </Badge>
              <span className="text-sm text-gray-500">{flight.seats} seats left</span>
            </div>
            <div className="flex space-x-2">
              <Wifi className="h-4 w-4 text-gray-400" />
              <Coffee className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;