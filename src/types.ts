export interface ProductDetails {
  origin?: string;
  roastLevel?: string;
  notes?: string[];
  weight?: string;
  brewingGuide?: string;
}

export interface Product {
  id: string;
  category: 'cafe' | 'home' | 'drip' | 'goods';
  name: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  details: ProductDetails;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ArtistIP {
  id: string;
  name: string;
  groupName: string;
  votes: number;
  image: string;
  description: string;
  tags: string[];
}

export interface InquiryFormData {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  inquiryType: 'franchise' | 'b2b' | 'collaboration' | 'other';
  message: string;
}
