
export interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface Location {
  lat: number;
  lng: number;
  timestamp: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  password?: string;
  isLoggedIn: boolean;
  isVerified: boolean;
}

export interface CycleData {
  lastDate: string;
  cycleLength: number;
}

export type AppView = 'login' | 'dashboard' | 'safety' | 'resources' | 'contacts' | 'welfare' | 'profile';

export interface DispatchStatus {
  contactId: string;
  contactName: string;
  status: 'pending' | 'sending' | 'delivered' | 'failed';
}
