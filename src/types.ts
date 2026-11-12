export type ProductCategory = 
  | 'all'
  | 'breads'
  | 'pastries'
  | 'drinks'
  | 'spreads';

export type FulfillmentMethod = 'delivery' | 'pickup';

export interface BreadProduct {
  id: string;
  name: string;
  category: 'breads' | 'pastries' | 'drinks' | 'spreads';
  description: string;
  longDescription: string;
  price: number; // in GH₵
  bakeTimeMinutes: number;
  crustType: string;
  ingredients: string[];
  allergens: string[];
  image: string;
  calories: number;
  isPopular?: boolean;
  isNew?: boolean;
  flavorNotes: string[];
  volumeOrWeight?: string;
  dietary?: ('vegan' | 'vegetarian' | 'dairy-free' | 'contains-nuts' | 'organic')[];
}

export interface CartItem {
  product: BreadProduct;
  quantity: number;
  selectedWarmth?: 'piping_hot' | 'room_temp';
  selectedCut?: 'whole' | 'thick_sliced' | 'scored_half';
  selectedAddonDipId?: string;
  drinkTemperature?: 'iced' | 'hot';
}

export interface CustomBreadBox {
  id: string;
  title: string;
  loaves: BreadProduct[];
  spreads: BreadProduct[];
  price: number;
}

export interface KioskLocation {
  id: string;
  name: string;
  area: string;
  city: string;
  address: string;
  coordinates: { lat: number; lng: number };
  status: 'online' | 'baking_rush' | 'restocking';
  ovenTempC: number;
  loavesReady: number;
  approxWaitMins: number;
  hours: string;
  features: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  rating: number;
  date: string;
  location: string;
  comment: string;
  favoriteLoaf: string;
  verifiedOrder: boolean;
}

export interface OrderRecord {
  orderCode: string;
  createdAt: string;
  fulfillment: FulfillmentMethod;
  customerName: string;
  phone: string;
  email: string;
  deliveryAddress?: string;
  deliveryLandmark?: string;
  kioskId?: string;
  kioskName?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'preparing' | 'on_the_way' | 'ready_at_kiosk' | 'completed';
  paymentMethod: string;
}
