import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { Header } from '@/components/Header';
import { PassengerForm } from '@/components/PassengerForm';
import { PaymentForm } from '@/components/PaymentForm';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Plane, Calendar, Users } from 'lucide-react';
import { Booking as BookingType } from '@/types';

type BookingStep = 'passengers' | 'payment' | 'confirmation';

export default function Booking() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('passengers');
  const [bookingConfirmation, setBookingConfirmation] = useState<BookingType | null>(null);
  
  const { user } = useAuth();
  const { 
    selectedFlight, 
    searchParams, 
    passengers, 
    setPassengers, 
    addBooking, 
    clearBooking 
  } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=booking');
      return;
    }
    
    if (!selectedFlight) {
      navigate('/');
      return;
    }
  }, [user, selectedFlight, navigate]);

  if (!user || !selectedFlight || !searchParams) {
    return null;
  }

  const handlePassengersNext = () => {
    setCurrentStep('payment');
  };

  const handlePaymentBack = () => {
    setCurrentStep('passengers');
  };

  const handlePassengersBack = () => {
    navigate('/');
  };

  const handlePaymentComplete = (paymentMethod: string) => {
    // Create booking
    const booking: BookingType = {
      id: 'BK' + Date.now(),
      userId: user.id,
      flight: selectedFlight,
      passengers,
      totalAmount: selectedFlight.price * passengers.length + Math.round(selectedFlight.price * passengers.length * 0.15),
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      paymentMethod
    };

    addBooking(booking);
    setBookingConfirmation(booking);
    setCurrentStep('confirmation');
  };

  const handleNewBooking = () => {
    clearBooking();
    navigate('/');
  };

  const handleViewBookings = () => {
    navigate('/bookings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Progress Steps */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${
              currentStep === 'passengers' ? 'text-blue-600' : 
              currentStep === 'payment' || currentStep === 'confirmation' ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === 'passengers' ? 'border-blue-600 bg-blue-600 text-white' :
                currentStep === 'payment' || currentStep === 'confirmation' ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300'
              }`}>
                {currentStep === 'payment' || currentStep === 'confirmation' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Users className="h-4 w-4" />
                )}
              </div>
              <span className="font-medium">Passengers</span>
            </div>

            <div className={`h-px w-16 ${
              currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-green-600' : 'bg-gray-300'
            }`}></div>

            <div className={`flex items-center space-x-2 ${
              currentStep === 'payment' ? 'text-blue-600' : 
              currentStep === 'confirmation' ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === 'payment' ? 'border-blue-600 bg-blue-600 text-white' :
                currentStep === 'confirmation' ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300'
              }`}>
                {currentStep === 'confirmation' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  '2'
                )}
              </div>
              <span className="font-medium">Payment</span>
            </div>

            <div className={`h-px w-16 ${
              currentStep === 'confirmation' ? 'bg-green-600' : 'bg-gray-300'
            }`}></div>

            <div className={`flex items-center space-x-2 ${
              currentStep === 'confirmation' ? 'text-blue-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === 'confirmation' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                <CheckCircle className="h-4 w-4" />
              </div>
              <span className="font-medium">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Flight Summary */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Plane className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedFlight.airline} {selectedFlight.flightNumber}
                  </h3>
                  <p className="text-gray-600">
                    {selectedFlight.departure.city} → {selectedFlight.arrival.city}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-gray-600 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedFlight.departure.date}</span>
                </div>
                <p className="text-lg font-bold text-blue-600">
                  ${selectedFlight.price} × {searchParams.passengers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {currentStep === 'passengers' && (
          <PassengerForm
            passengerCount={searchParams.passengers}
            passengers={passengers}
            onPassengersChange={setPassengers}
            onNext={handlePassengersNext}
            onBack={handlePassengersBack}
          />
        )}

        {currentStep === 'payment' && (
          <PaymentForm
            flight={selectedFlight}
            passengers={passengers}
            onPayment={handlePaymentComplete}
            onBack={handlePaymentBack}
          />
        )}

        {currentStep === 'confirmation' && bookingConfirmation && (
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600">
                Your flight has been successfully booked. Check your email for the confirmation details.
              </p>
            </div>

            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Reference:</span>
                    <span className="font-medium">{bookingConfirmation.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Flight:</span>
                    <span className="font-medium">
                      {bookingConfirmation.flight.airline} {bookingConfirmation.flight.flightNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium">
                      {bookingConfirmation.flight.departure.city} → {bookingConfirmation.flight.arrival.city}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-medium">
                      {bookingConfirmation.flight.departure.date} at {bookingConfirmation.flight.departure.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passengers:</span>
                    <span className="font-medium">{bookingConfirmation.passengers.length}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount:</span>
                    <span className="text-green-600">${bookingConfirmation.totalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleViewBookings}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Bookings
              </button>
              <button
                onClick={handleNewBooking}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Book Another Flight
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}