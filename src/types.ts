export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'meat' | 'vegan' | 'drinks';
  tags: string[]; // e.g., "Vegan", "Gluten-Free" (100% Teff Injera)
  spicyLevel: number; // 0 to 3
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: 'confirmed' | 'pending';
  notes?: string;
}

export interface CulturalStory {
  title: string;
  subtitle: string;
  content: string;
  graphic?: string;
}
