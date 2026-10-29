export type PackageType = 'domestic' | 'international' | 'trending' | 'group-departures' | 'jungle-safaris' | 'cruise' | 'pilgrimage';

export interface Tour {
  id: string;
  title: string;
  location: string;
  days: number;
  price: number;
  image: string;
  description: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  category: 'Culture' | 'Nature' | 'Adventure' | 'Spiritual' | 'Relaxation';
  packageType: PackageType;
  featured: boolean;
  showInPopup?: boolean;
  inclusions?: string[];
  exclusions?: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  tripLocation: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}