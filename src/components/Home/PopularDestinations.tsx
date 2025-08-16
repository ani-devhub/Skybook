import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, TrendingUp } from 'lucide-react';
import { popularDestinations } from '@/data/mockFlights';

interface PopularDestinationsProps {
  onDestinationSelect: (destination: string) => void;
}

const PopularDestinations: React.FC<PopularDestinationsProps> = ({ onDestinationSelect }) => {
  const destinationOffers = [
    { ...popularDestinations[0], price: 'From ₹4,200', discount: '25% OFF' },
    { ...popularDestinations[1], price: 'From ₹3,800', discount: '20% OFF' },
    { ...popularDestinations[2], price: 'From ₹5,100', discount: '30% OFF' },
    { ...popularDestinations[3], price: 'From ₹2,800', discount: '15% OFF' },
    { ...popularDestinations[4], price: 'From ₹4,500', discount: '22% OFF' },
    { ...popularDestinations[5], price: 'From ₹5,800', discount: '18% OFF' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Trending Now
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the most loved destinations by travelers. Book now and save big with our exclusive offers!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinationOffers.map((destination, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => onDestinationSelect(destination.airport)}
            >
              <CardContent className="p-0 relative overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white font-semibold">
                      {destination.discount}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl filter drop-shadow-lg">
                      {destination.image}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-1">{destination.city}</h3>
                      <div className="flex items-center space-x-1 text-sm opacity-90">
                        <MapPin className="h-4 w-4" />
                        <span>{destination.airport}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Starting from</p>
                      <p className="text-xl font-bold text-blue-600">{destination.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Per person</p>
                      <div className="flex items-center space-x-1 text-sm text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span>Popular</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            🔥 Limited time offers • Book now and save up to 30% on your next flight
          </p>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;