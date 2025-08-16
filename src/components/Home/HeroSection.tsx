import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plane, Star, Users, Shield } from 'lucide-react';

const HeroSection: React.FC = () => {
  const features = [
    {
      icon: <Plane className="h-6 w-6 text-blue-600" />,
      title: "Best Prices",
      description: "Compare and book flights at the lowest prices"
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: "Top Airlines",
      description: "Partner with world's leading airlines"
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: "24/7 Support", 
      description: "Round the clock customer assistance"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "Secure Booking",
      description: "Safe and encrypted payment process"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-1">
              ✈️ India's #1 Flight Booking Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Book Your Dream
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Flight Journey
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover amazing destinations worldwide with the best flight deals. 
              Compare prices, choose your favorite airline, and fly with confidence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-blue-100">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-200">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span>4.9/5 Customer Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>10M+ Happy Travelers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>100% Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;