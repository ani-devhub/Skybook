import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Calendar, Clock, Users, MapPin, X, Ticket } from 'lucide-react';
import { Booking } from '@/types';

export default function Bookings() {
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const { user } = useAuth();
  const { bookings, cancelBooking } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Filter bookings for current user
    const filtered = bookings.filter(booking => booking.userId === user.id);
    setUserBookings(filtered);
  }, [user, bookings, navigate]);

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
      setUserBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your flight reservations</p>
        </div>

        {userBookings.length === 0 ? (
          <div className="text-center py-12">
            <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookings found</h3>
            <p className="text-gray-500 mb-6">You haven't made any flight bookings yet.</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Book Your First Flight
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {userBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Plane className="h-5 w-5 text-blue-600" />
                      <span>Booking #{booking.id}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={
                          booking.status === 'confirmed' ? 'default' :
                          booking.status === 'cancelled' ? 'destructive' : 'secondary'
                        }
                      >
                        {booking.status.toUpperCase()}
                      </Badge>
                      {booking.status === 'confirmed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Flight Details */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {booking.flight.airline} {booking.flight.flightNumber}
                          </h3>
                          <p className="text-sm text-gray-600">{booking.flight.aircraft}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Booking Date</p>
                          <p className="font-medium">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 items-center">
                        {/* Departure */}
                        <div className="text-center">
                          <div className="text-2xl font-bold">{booking.flight.departure.time}</div>
                          <div className="text-sm text-gray-600">{booking.flight.departure.airport}</div>
                          <div className="text-xs text-gray-500">{booking.flight.departure.city}</div>
                        </div>

                        {/* Duration */}
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            <div className="h-px bg-gray-300 flex-1"></div>
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div className="h-px bg-gray-300 flex-1"></div>
                          </div>
                          <div className="text-sm font-medium">{booking.flight.duration}</div>
                          <div className="text-xs text-gray-500">
                            {booking.flight.stops === 0 ? 'Non-stop' : `${booking.flight.stops} stop${booking.flight.stops > 1 ? 's' : ''}`}
                          </div>
                        </div>

                        {/* Arrival */}
                        <div className="text-center">
                          <div className="text-2xl font-bold">{booking.flight.arrival.time}</div>
                          <div className="text-sm text-gray-600">{booking.flight.arrival.airport}</div>
                          <div className="text-xs text-gray-500">{booking.flight.arrival.city}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.flight.departure.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{booking.passengers.length} passenger{booking.passengers.length > 1 ? 's' : ''}</span>
                        </div>
                      </div>

                      {/* Passengers */}
                      <div>
                        <h4 className="font-medium mb-2">Passengers</h4>
                        <div className="space-y-1">
                          {booking.passengers.map((passenger, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              {passenger.firstName} {passenger.lastName} • {passenger.email}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Booking Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Flight ({booking.passengers.length}x)</span>
                            <span>${booking.flight.price * booking.passengers.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxes & Fees</span>
                            <span>${booking.totalAmount - (booking.flight.price * booking.passengers.length)}</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${booking.totalAmount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p><strong>Payment Method:</strong> {booking.paymentMethod.replace('-', ' ')}</p>
                      </div>

                      {booking.status === 'confirmed' && (
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => window.print()}
                          >
                            Print Ticket
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}