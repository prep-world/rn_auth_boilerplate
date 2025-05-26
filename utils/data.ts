// Types for our data
type ParkingSpot = {
  id: number;
  name: string;
  location: string;
  rating: number;
  availableSpots: number;
  hourlyRate: number;
  features: { name: string; icon: string }[];
  featured: boolean;
  description?: string;
  amenities?: string[];
  openHours?: string;
  coordinates?: { latitude: number; longitude: number };
};

type Booking = {
  id: number;
  parkingId: number;
  parkingName: string;
  location: string;
  date: string;
  time: string;
  duration: number;
  price: string;
  vehicleNo: string;
  spotNo: string;
  status: "active" | "upcoming" | "completed";
};

// Dummy data for the application
const parkingSpots: ParkingSpot[] = [
  {
    id: 1,
    name: "Downtown Parking Garage",
    location: "123 Main St, Downtown",
    rating: 4.7,
    availableSpots: 15,
    hourlyRate: 3.5,
    features: [
      { name: "Covered", icon: "home-outline" },
      { name: "Security", icon: "shield-checkmark-outline" },
      { name: "EV Charging", icon: "flash-outline" },
    ],
    featured: true,
    description: "Centrally located parking garage with 24/7 security and convenient access to downtown attractions.",
    amenities: ["Security cameras", "Elevator access", "Restrooms", "EV charging stations"],
    openHours: "24/7",
    coordinates: { latitude: 40.7128, longitude: -74.006 },
  },
  {
    id: 2,
    name: "City Center Parking",
    location: "456 Market Ave, City Center",
    rating: 4.5,
    availableSpots: 8,
    hourlyRate: 4.0,
    features: [
      { name: "Covered", icon: "home-outline" },
      { name: "Security", icon: "shield-checkmark-outline" },
    ],
    featured: true,
    description: "Conveniently located parking in the heart of the city center.",
    openHours: "6:00 AM - 11:00 PM",
    coordinates: { latitude: 40.7135, longitude: -74.008 },
  },
  {
    id: 3,
    name: "Riverside Parking Lot",
    location: "789 River Rd, Riverside",
    rating: 4.2,
    availableSpots: 23,
    hourlyRate: 2.5,
    features: [{ name: "Open Air", icon: "sunny-outline" }],
    featured: false,
    description: "Affordable open-air parking with beautiful river views.",
    openHours: "7:00 AM - 10:00 PM",
    coordinates: { latitude: 40.72, longitude: -74.01 },
  },
  {
    id: 4,
    name: "Central Station Parking",
    location: "321 Station Blvd, Central",
    rating: 4.8,
    availableSpots: 5,
    hourlyRate: 5.0,
    features: [
      { name: "Covered", icon: "home-outline" },
      { name: "Security", icon: "shield-checkmark-outline" },
      { name: "Valet", icon: "person-outline" },
    ],
    featured: true,
    description: "Premium parking facility with valet service near the Central Station.",
    amenities: ["Valet service", "Car wash", "Security", "Covered spaces"],
    openHours: "24/7",
    coordinates: { latitude: 40.7145, longitude: -74.004 },
  },
  {
    id: 5,
    name: "Shopping Mall Parking",
    location: "555 Mall Dr, Shopping District",
    rating: 4.3,
    availableSpots: 42,
    hourlyRate: 2.0,
    features: [
      { name: "Covered", icon: "home-outline" },
      { name: "Family", icon: "people-outline" },
    ],
    featured: false,
    description: "Convenient parking for all your shopping needs with family-friendly spaces.",
    amenities: ["Family parking", "Handicapped spaces", "Direct mall access"],
    openHours: "9:00 AM - 10:00 PM",
    coordinates: { latitude: 40.718, longitude: -74.003 },
  },
  {
    id: 6,
    name: "Tech Park Garage",
    location: "987 Innovation Way, Tech District",
    rating: 4.6,
    availableSpots: 12,
    hourlyRate: 4.5,
    features: [
      { name: "Covered", icon: "home-outline" },
      { name: "Security", icon: "shield-checkmark-outline" },
      { name: "EV Charging", icon: "flash-outline" },
    ],
    featured: true,
    description: "Modern parking facility with multiple EV charging stations and tech-enabled security.",
    amenities: ["EV charging stations", "Smart parking system", "License plate recognition", "Mobile payment"],
    openHours: "24/7",
    coordinates: { latitude: 40.721, longitude: -74.007 },
  },
  {
    id: 7,
    name: "University Parking",
    location: "654 Campus Dr, University Area",
    rating: 4.0,
    availableSpots: 30,
    hourlyRate: 2.0,
    features: [
      { name: "Open Air", icon: "sunny-outline" },
      { name: "Student", icon: "school-outline" },
    ],
    featured: false,
    description: "Affordable parking option near the university campus.",
    openHours: "7:00 AM - 11:00 PM",
    coordinates: { latitude: 40.723, longitude: -74.009 },
  },
];

const bookings: Booking[] = [
  {
    id: 101,
    parkingId: 1,
    parkingName: "Downtown Parking Garage",
    location: "123 Main St, Downtown",
    date: "May 16, 2025",
    time: "9:00 AM - 11:00 AM",
    duration: 2,
    price: "$7.00",
    vehicleNo: "ABC123",
    spotNo: "A12",
    status: "active",
  },
  {
    id: 102,
    parkingId: 4,
    parkingName: "Central Station Parking",
    location: "321 Station Blvd, Central",
    date: "May 17, 2025",
    time: "2:00 PM - 5:00 PM",
    duration: 3,
    price: "$15.00",
    vehicleNo: "ABC123",
    spotNo: "B5",
    status: "upcoming",
  },
  {
    id: 103,
    parkingId: 2,
    parkingName: "City Center Parking",
    location: "456 Market Ave, City Center",
    date: "May 14, 2025",
    time: "10:00 AM - 1:00 PM",
    duration: 3,
    price: "$12.00",
    vehicleNo: "ABC123",
    spotNo: "C8",
    status: "completed",
  },
  {
    id: 104,
    parkingId: 6,
    parkingName: "Tech Park Garage",
    location: "987 Innovation Way, Tech District",
    date: "May 10, 2025",
    time: "9:00 AM - 6:00 PM",
    duration: 9,
    price: "$40.50",
    vehicleNo: "XYZ789",
    spotNo: "D3",
    status: "completed",
  },
  {
    id: 105,
    parkingId: 1,
    parkingName: "Downtown Parking Garage",
    location: "123 Main St, Downtown",
    date: "May 18, 2025",
    time: "1:00 PM - 3:00 PM",
    duration: 2,
    price: "$7.00",
    vehicleNo: "ABC123",
    spotNo: "A15",
    status: "upcoming",
  },
];

export const parkingData = {
  parkingSpots,
  bookings,
};