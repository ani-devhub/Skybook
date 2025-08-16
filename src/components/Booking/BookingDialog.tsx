import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Lock, User, Calendar, Plane } from 'lucide-react';
import { Flight, Passenger } from '@/types/flight';
import { toast } from 'sonner';

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  flight: Flight | null;
  passengers: number;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ 
  isOpen, 
  onClose, 
  flight, 
  passengers 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState<Passenger[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    if (isOpen && flight) {
      // Initialize passenger details
      const initialPassengers: Passenger[] = Array.from({ length: passengers }, (_, index) => ({
        id: `passenger-${index + 1}`,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: 'male' as const,
        passportNumber: ''
      }));
      setPassengerDetails(initialPassengers);
    }
  }, [isOpen, flight, passengers]);

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...passengerDetails];
    updated[index] = { ...updated[index], [field]: value };
    setPassengerDetails(updated);
  };

  const validateStep1 = () => {
    return passengerDetails.every(p => p.firstName && p.lastName && p.dateOfBirth && p.gender);
  };

  const validateStep2 = () => {
    return paymentMethod && paymentDetails.cardNumber && paymentDetails.expiryDate && 
           paymentDetails.cvv && paymentDetails.cardholderName;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleBooking = async () => {
    if (!validateStep2()) {
      toast.error('Please fill all payment details');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const bookingId = `SB${Date.now().toString().slice(-8)}`;
    
    toast.success(`Booking confirmed! Booking ID: ${bookingId}`);
    setIsProcessing(false);
    onClose();
    
    // Reset form
    setCurrentStep(1);
    setPaymentMethod('');
    setPaymentDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    });
  };

  if (!flight) return null;

  const totalPrice = flight.price * passengers;
  const taxes = Math.round(totalPrice * 0.12);
  const finalPrice = totalPrice + taxes;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plane className="h-5 w-5" />
            <span>Complete Your Booking</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium">Passenger Details</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300"></div>
              <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium">Payment</span>
              </div>
            </div>

            {/* Step 1: Passenger Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Passenger Information</h3>
                {passengerDetails.map((passenger, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Passenger {index + 1}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>First Name *</Label>
                          <Input
                            value={passenger.firstName}
                            onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                            placeholder="Enter first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Last Name *</Label>
                          <Input
                            value={passenger.lastName}
                            onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Date of Birth *</Label>
                          <Input
                            type="date"
                            value={passenger.dateOfBirth}
                            onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Gender *</Label>
                          <Select 
                            value={passenger.gender} 
                            onValueChange={(value) => updatePassenger(index, 'gender', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Passport Number (Optional)</Label>
                        <Input
                          value={passenger.passportNumber || ''}
                          onChange={(e) => updatePassenger(index, 'passportNumber', e.target.value)}
                          placeholder="Enter passport number"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-end">
                  <Button 
                    onClick={handleNext} 
                    disabled={!validateStep1()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Payment Information</h3>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Payment Method</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Credit Card', 'Debit Card', 'UPI'].map((method) => (
                        <Card 
                          key={method}
                          className={`cursor-pointer border-2 ${
                            paymentMethod === method ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => setPaymentMethod(method)}
                        >
                          <CardContent className="p-4 text-center">
                            <CreditCard className="h-6 w-6 mx-auto mb-2" />
                            <span className="text-sm font-medium">{method}</span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {paymentMethod && (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="space-y-2">
                          <Label>Cardholder Name *</Label>
                          <Input
                            value={paymentDetails.cardholderName}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cardholderName: e.target.value})}
                            placeholder="Enter cardholder name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Card Number *</Label>
                          <Input
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Expiry Date *</Label>
                            <Input
                              value={paymentDetails.expiryDate}
                              onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>CVV *</Label>
                            <Input
                              type="password"
                              value={paymentDetails.cvv}
                              onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                              placeholder="123"
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleBooking} 
                    disabled={!validateStep2() || isProcessing}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? (
                      <>
                        <Lock className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-base">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Flight</span>
                    <span className="font-medium">{flight.flightNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Route</span>
                    <span className="font-medium">{flight.departure.airport} → {flight.arrival.airport}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">{flight.departure.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium">{flight.departure.time} - {flight.arrival.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Passengers</span>
                    <span className="font-medium">{passengers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Class</span>
                    <Badge variant="secondary">{flight.class}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Base Price ({passengers}x)</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes & Fees</span>
                    <span>₹{taxes.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span className="text-blue-600">₹{finalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Lock className="h-4 w-4" />
                    <span className="text-xs">Secure SSL Encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;