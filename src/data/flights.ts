import { Flight } from '@/types';

export const airports = [
  { code: 'NYC', name: 'New York City', city: 'New York' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles' },
  { code: 'LHR', name: 'London Heathrow', city: 'London' },
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris' },
  { code: 'NRT', name: 'Narita International', city: 'Tokyo' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapore' },
  { code: 'DEL', name: 'Indira Gandhi International', city: 'Delhi' },
  { code: 'BOM', name: 'Chhatrapati Shivaji International', city: 'Mumbai' },
  { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney' }
];

export const airlines = [
  'Emirates', 'Singapore Airlines', 'Qatar Airways', 'Lufthansa', 'British Airways',
  'American Airlines', 'Delta Air Lines', 'United Airlines', 'Air India', 'IndiGo'
];

export const generateFlights = (from: string, to: string, date: string): Flight[] => {
  const flights: Flight[] = [];
  const numFlights = Math.floor(Math.random() * 8) + 5; // 5-12 flights

  for (let i = 0; i < numFlights; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const flightNumber = `${airline.slice(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`;
    
    // Generate departure time
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const departureTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    // Generate flight duration (2-15 hours)
    const durationHours = Math.floor(Math.random() * 13) + 2;
    const durationMinutes = Math.floor(Math.random() * 60);
    const duration = `${durationHours}h ${durationMinutes}m`;
    
    // Calculate arrival time
    const departureDate = new Date(`${date}T${departureTime}`);
    const arrivalDate = new Date(departureDate.getTime() + (durationHours * 60 + durationMinutes) * 60000);
    const arrivalTime = `${arrivalDate.getHours().toString().padStart(2, '0')}:${arrivalDate.getMinutes().toString().padStart(2, '0')}`;
    
    const stops = Math.random() < 0.6 ? 0 : Math.random() < 0.8 ? 1 : 2;
    const basePrice = 200 + Math.floor(Math.random() * 1800);
    const price = stops === 0 ? basePrice + 100 : basePrice;
    
    flights.push({
      id: `${flightNumber}-${i}`,
      airline,
      flightNumber,
      departure: {
        airport: from,
        city: airports.find(a => a.code === from)?.city || from,
        time: departureTime,
        date
      },
      arrival: {
        airport: to,
        city: airports.find(a => a.code === to)?.city || to,
        time: arrivalTime,
        date: arrivalDate.toISOString().split('T')[0]
      },
      duration,
      price,
      stops,
      aircraft: ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A350'][Math.floor(Math.random() * 4)],
      availableSeats: Math.floor(Math.random() * 50) + 10
    });
  }

  return flights.sort((a, b) => a.price - b.price);
};