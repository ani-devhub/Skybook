import { Flight } from '@/types/flight';

export const mockFlights: Flight[] = [
  {
    id: 'AI101',
    airline: 'Air India',
    flightNumber: 'AI 101',
    departure: {
      airport: 'DEL',
      city: 'New Delhi',
      time: '06:00',
      date: '2024-08-20'
    },
    arrival: {
      airport: 'BOM',
      city: 'Mumbai',
      time: '08:15',
      date: '2024-08-20'
    },
    duration: '2h 15m',
    price: 4500,
    seats: 45,
    class: 'Economy',
    stops: 0
  },
  {
    id: 'SG202',
    airline: 'SpiceJet',
    flightNumber: 'SG 202',
    departure: {
      airport: 'DEL',
      city: 'New Delhi',
      time: '08:30',
      date: '2024-08-20'
    },
    arrival: {
      airport: 'BOM',
      city: 'Mumbai',
      time: '10:45',
      date: '2024-08-20'
    },
    duration: '2h 15m',
    price: 3800,
    seats: 32,
    class: 'Economy',
    stops: 0
  },
  {
    id: 'UK303',
    airline: 'Vistara',
    flightNumber: 'UK 303',
    departure: {
      airport: 'DEL',
      city: 'New Delhi',
      time: '10:00',
      date: '2024-08-20'
    },
    arrival: {
      airport: 'BOM',
      city: 'Mumbai',
      time: '12:30',
      date: '2024-08-20'
    },
    duration: '2h 30m',
    price: 6200,
    seats: 28,
    class: 'Business',
    stops: 0
  },
  {
    id: 'AI404',
    airline: 'Air India',
    flightNumber: 'AI 404',
    departure: {
      airport: 'BOM',
      city: 'Mumbai',
      time: '14:00',
      date: '2024-08-20'
    },
    arrival: {
      airport: 'BLR',
      city: 'Bangalore',
      time: '15:30',
      date: '2024-08-20'
    },
    duration: '1h 30m',
    price: 3200,
    seats: 52,
    class: 'Economy',
    stops: 0
  },
  {
    id: 'IN505',
    airline: 'IndiGo',
    flightNumber: 'IN 505',
    departure: {
      airport: 'DEL',
      city: 'New Delhi',
      time: '16:15',
      date: '2024-08-20'
    },
    arrival: {
      airport: 'CCU',
      city: 'Kolkata',
      time: '18:30',
      date: '2024-08-20'
    },
    duration: '2h 15m',
    price: 4100,
    seats: 38,
    class: 'Economy',
    stops: 0
  },
  {
    id: 'UK606',
    airline: 'Vistara',
    flightNumber: 'UK 606',
    departure: {
      airport: 'BOM',
      city: 'Mumbai',
      time: '19:00',
      date: '2024-08-20'
    },
    arrival: {
      airport: 'GOI',
      city: 'Goa',
      time: '20:15',
      date: '2024-08-20'
    },
    duration: '1h 15m',
    price: 2800,
    seats: 24,
    class: 'Economy',
    stops: 0
  },
  {
    id: 'AI707',
    airline: 'Air India',
    flightNumber: 'AI 707',
    departure: {
      airport: 'DEL',
      city: 'New Delhi',
      time: '22:00',
      date: '2024-08-20'
    },
    arrival: {
      airport: 'HYD',
      city: 'Hyderabad',
      time: '00:15',
      date: '2024-08-21'
    },
    duration: '2h 15m',
    price: 5500,
    seats: 18,
    class: 'Business',
    stops: 0
  },
  {
    id: 'SG808',
    airline: 'SpiceJet',
    flightNumber: 'SG 808',
    departure: {
      airport: 'CCU',
      city: 'Kolkata',
      time: '07:30',
      date: '2024-08-20'
    },
    arrival: {
      airport: 'BOM',
      city: 'Mumbai',
      time: '10:00',
      date: '2024-08-20'
    },
    duration: '2h 30m',
    price: 4200,
    seats: 41,
    class: 'Economy',
    stops: 0
  }
];

export const popularDestinations = [
  { city: 'Mumbai', airport: 'BOM', image: '🏙️' },
  { city: 'Delhi', airport: 'DEL', image: '🏛️' },
  { city: 'Bangalore', airport: 'BLR', image: '🌆' },
  { city: 'Goa', airport: 'GOI', image: '🏖️' },
  { city: 'Kolkata', airport: 'CCU', image: '🎭' },
  { city: 'Hyderabad', airport: 'HYD', image: '🏰' }
];