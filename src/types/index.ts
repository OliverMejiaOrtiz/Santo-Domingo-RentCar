export interface Car {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  features: string[];
  rating: number;
  available: boolean;
  popular: boolean;
}

export interface SearchFilters {
  location: string;
  startDate: string;
  endDate: string;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface BookingDetails {
  carId: number;
  location: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
}