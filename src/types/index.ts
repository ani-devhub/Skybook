export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  stops: number;
  aircraft: string;
  availableSeats: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  passportNumber?: string;
}

export interface Booking {
  id: string;
  userId: string;
  flight: Flight;
  passengers: Passenger[];
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  bookingDate: string;
  paymentMethod: string;
}

export interface SearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  tripType: 'one-way' | 'round-trip';
}