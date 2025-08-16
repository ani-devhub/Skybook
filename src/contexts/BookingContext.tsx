import React, { createContext, useContext, useState } from 'react';
import { Flight, Passenger, Booking, SearchParams } from '@/types';

interface BookingContextType {
  searchParams: SearchParams | null;
  selectedFlight: Flight | null;
  passengers: Passenger[];
  bookings: Booking[];
  setSearchParams: (params: SearchParams) => void;
  setSelectedFlight: (flight: Flight) => void;
  setPassengers: (passengers: Passenger[]) => void;
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
    // Store in localStorage
    const storedBookings = localStorage.getItem('flightBookings') || '[]';
    const allBookings = [...JSON.parse(storedBookings), booking];
    localStorage.setItem('flightBookings', JSON.stringify(allBookings));
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
    
    // Update localStorage
    const storedBookings = JSON.parse(localStorage.getItem('flightBookings') || '[]');
    const updatedBookings = storedBookings.map((booking: Booking) =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    );
    localStorage.setItem('flightBookings', JSON.stringify(updatedBookings));
  };

  const clearBooking = () => {
    setSelectedFlight(null);
    setPassengers([]);
  };

  // Load bookings from localStorage on mount
  React.useEffect(() => {
    const storedBookings = localStorage.getItem('flightBookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  const value = {
    searchParams,
    selectedFlight,
    passengers,
    bookings,
    setSearchParams,
    setSelectedFlight,
    setPassengers,
    addBooking,
    cancelBooking,
    clearBooking
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}