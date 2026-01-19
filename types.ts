
export interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string;
  features: string[];
  images: string[];
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
