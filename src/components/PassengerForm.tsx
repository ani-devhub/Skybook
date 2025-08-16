import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Passenger } from '@/types';
import { User, Plus, Minus } from 'lucide-react';

interface PassengerFormProps {
  passengerCount: number;
  passengers: Passenger[];
  onPassengersChange: (passengers: Passenger[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PassengerForm({ 
  passengerCount, 
  passengers, 
  onPassengersChange, 
  onNext, 
  onBack 
}: PassengerFormProps) {
  const [currentPassengers, setCurrentPassengers] = useState<Passenger[]>(
    passengers.length > 0 ? passengers : Array.from({ length: passengerCount }, () => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'male' as const,
      passportNumber: ''
    }))
  );

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...currentPassengers];
    updated[index] = { ...updated[index], [field]: value };
    setCurrentPassengers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const isValid = currentPassengers.every(passenger => 
      passenger.firstName && 
      passenger.lastName && 
      passenger.email && 
      passenger.phone && 
      passenger.dateOfBirth &&
      passenger.gender
    );

    if (!isValid) {
      alert('Please fill in all required fields for all passengers');
      return;
    }

    onPassengersChange(currentPassengers);
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Passenger Information</h2>
        <p className="text-gray-600">Please provide details for all passengers</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentPassengers.map((passenger, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Passenger {index + 1}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`firstName-${index}`}>First Name *</Label>
                <Input
                  id={`firstName-${index}`}
                  value={passenger.firstName}
                  onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`lastName-${index}`}>Last Name *</Label>
                <Input
                  id={`lastName-${index}`}
                  value={passenger.lastName}
                  onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                  placeholder="Enter last name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`email-${index}`}>Email *</Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={passenger.email}
                  onChange={(e) => updatePassenger(index, 'email', e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`phone-${index}`}>Phone Number *</Label>
                <Input
                  id={`phone-${index}`}
                  type="tel"
                  value={passenger.phone}
                  onChange={(e) => updatePassenger(index, 'phone', e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`dateOfBirth-${index}`}>Date of Birth *</Label>
                <Input
                  id={`dateOfBirth-${index}`}
                  type="date"
                  value={passenger.dateOfBirth}
                  onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`gender-${index}`}>Gender *</Label>
                <Select 
                  value={passenger.gender} 
                  onValueChange={(value) => updatePassenger(index, 'gender', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`passport-${index}`}>Passport Number (Optional)</Label>
                <Input
                  id={`passport-${index}`}
                  value={passenger.passportNumber || ''}
                  onChange={(e) => updatePassenger(index, 'passportNumber', e.target.value)}
                  placeholder="Enter passport number"
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="w-full sm:w-auto"
          >
            Back to Flight Selection
          </Button>
          
          <Button 
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
}