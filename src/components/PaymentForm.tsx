import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Flight, Passenger } from '@/types';
import { CreditCard, Lock, Calendar, User } from 'lucide-react';

interface PaymentFormProps {
  flight: Flight;
  passengers: Passenger[];
  onPayment: (paymentMethod: string) => void;
  onBack: () => void;
}

export function PaymentForm({ flight, passengers, onPayment, onBack }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = flight.price * passengers.length;
  const taxes = Math.round(subtotal * 0.15);
  const total = subtotal + taxes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'credit-card') {
      if (!cardNumber || !expiryDate || !cvv || !cardName) {
        alert('Please fill in all payment details');
        return;
      }
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onPayment(paymentMethod);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Payment Details</h2>
        <p className="text-gray-600">Secure payment processing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit/Debit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="apple-pay">Apple Pay</SelectItem>
                      <SelectItem value="google-pay">Google Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentMethod === 'credit-card' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Enter name on card"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod !== 'credit-card' && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      You will be redirected to {paymentMethod.replace('-', ' ')} to complete your payment.
                    </p>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                className="w-full sm:w-auto"
                disabled={isProcessing}
              >
                Back to Passenger Details
              </Button>
              
              <Button 
                type="submit"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay $${total}`}
              </Button>
            </div>
          </form>
        </div>

        {/* Booking Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">{flight.airline} {flight.flightNumber}</h4>
                <p className="text-sm text-gray-600">
                  {flight.departure.city} → {flight.arrival.city}
                </p>
                <p className="text-sm text-gray-600">
                  {flight.departure.date} at {flight.departure.time}
                </p>
              </div>

              <Separator />

              <div>
                <h5 className="font-medium mb-2">Passengers ({passengers.length})</h5>
                {passengers.map((passenger, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <User className="h-3 w-3" />
                    <span>{passenger.firstName} {passenger.lastName}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Flight ({passengers.length}x)</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>${taxes}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}