export type AppTab = 'updates' | 'dorms' | 'map' | 'transport' | 'spots' | 'forum';

export type UpdateCategory = 'emergency' | 'power' | 'mmsu' | 'barangay' | 'market';
export type UrgencyLevel = 'high' | 'medium' | 'info';

export interface LocalUpdate {
  id: string;
  title: string;
  category: UpdateCategory;
  urgency: UrgencyLevel;
  timestamp: string;
  summary: string;
  content: string;
  source: string;
  location: string;
  likes: number;
  isImportant?: boolean;
}

export type GenderPolicy = 'female' | 'male' | 'coed';

export interface RoomOption {
  type: 'Bedspace' | 'Solo Room' | 'Studio Unit' | '2-Person Room';
  priceMonthly: number;
  slotsAvailable: number;
  inclusions: string;
}

export interface DormReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Dormitory {
  id: string;
  name: string;
  landlord: string;
  phone: string;
  purok: string;
  address: string;
  distanceToMMSU: string;
  nearestCollege: string;
  walkingMinutes: number;
  genderPolicy: GenderPolicy;
  lat: number;
  lng: number;
  roomOptions: RoomOption[];
  minPrice: number;
  maxPrice: number;
  amenities: string[];
  curfew: string;
  cookingAllowed: boolean;
  airconAvailable: boolean;
  generatorBackup: boolean;
  hasWifi: boolean;
  submeteredPower: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  verifiedLandlord: boolean;
  reviews: DormReview[];
}

export interface TransportRoute {
  id: string;
  origin: string;
  destination: string;
  vehicleType: 'Tricycle' | 'Jeepney' | 'Bus' | 'Mini-bus';
  regularFare: number;
  studentFare: number;
  seniorFare: number;
  travelTimeMinutes: number;
  operatingHours: string;
  description: string;
  terminalLocation: string;
}

export interface DriverContact {
  id: string;
  name: string;
  todaUnit: string;
  plateNo: string;
  phone: string;
  standLocation: string;
  rating: number;
  availableHours: string;
  isOnline: boolean;
}

export interface Spot {
  id: string;
  name: string;
  category: 'empanada_food' | 'mmsu_landmark' | 'heritage' | 'health_essential' | 'student_hub';
  address: string;
  distanceFromMMSU: string;
  priceLevel: '₱' | '₱₱' | '₱₱₱' | 'Free';
  operatingHours: string;
  description: string;
  mustTryOrTip: string;
  image: string;
  tags: string[];
  googleMapsQuery: string;
}

export interface ForumComment {
  id: string;
  author: string;
  authorRole: 'MMSU Student' | 'Quiling Sur Local' | 'Freshman' | 'Faculty/Staff';
  avatarColor: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface ForumPost {
  id: string;
  author: string;
  authorRole: 'MMSU Student' | 'Quiling Sur Local' | 'Freshman' | 'Faculty/Staff';
  avatarColor: string;
  title: string;
  content: string;
  category: 'campus' | 'pasalo' | 'buy_sell' | 'lost_found' | 'safety' | 'barangay' | 'general';
  tags: string[];
  timestamp: string;
  likes: number;
  comments: ForumComment[];
  isPinned?: boolean;
  contactHint?: string;
}

export interface EmergencyContact {
  id: string;
  agency: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  badge: string;
  available: string;
}

export interface IlocanoPhrase {
  id: string;
  ilocano: string;
  tagalog: string;
  english: string;
  category: 'commute' | 'market' | 'greeting' | 'school';
  pronunciation: string;
}
