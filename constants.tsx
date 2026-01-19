
import { Room, Feature } from './types';

import loftImage from './components/assets/loofType.avif';
import familyImage from './components/assets/familyroom10.avif';
import diningImage from './components/assets/diningarea1.avif';
import kitchenImage from './components/assets/kitchen.avif';
import livingImage from './components/assets/living-area3.avif';

// Using high-quality nature/interior placeholders to simulate "different sides"
export const ROOMS: Room[] = [
  {
    id: 'loft',
    title: 'Loft Type Room',
    description: 'A charming attic-style room with a wooden finish, offering the most intimate views of the terraces.',
    price: 1800,
    icon: '🪵',
    features: ['Queen-sized floor mattress', 'Large viewing window', 'Private nook', 'Native decor'],
    images: [loftImage, loftImage, loftImage]
  },
  {
    id: 'family',
    title: 'Family Room',
    description: 'Spacious accommodation ideal for families or small groups exploring the heart of Ifugao.',
    price: 2500,
    icon: '👨‍👩‍👧‍👦',
    features: ['2 Double beds', 'Private bathroom', 'Hot shower', 'Balcony access'],
    images: [familyImage, familyImage, familyImage]
  },
  {
    id: 'dining',
    title: 'Dining Area',
    description: 'A communal space where guests enjoy local Ifugao coffee and traditional breakfast with a view.',
    price: 0,
    icon: '🍽️',
    features: ['Panoramic terrace view', 'Pine wood tables', 'Free breakfast included', 'Local coffee station'],
    images: [diningImage, diningImage, diningImage]
  },
  {
    id: 'kitchen',
    title: 'Guest Kitchen',
    description: 'Fully equipped kitchen for guests who prefer to prepare their own home-cooked meals.',
    price: 0,
    icon: '🍳',
    features: ['Stove & Cookware', 'Refrigerator', 'Rice cooker', 'Filtered water'],
    images: [kitchenImage, kitchenImage, kitchenImage]
  },
  {
    id: 'living',
    title: 'Living Area',
    description: 'The heart of our home. A cozy space to share stories, read books, or play board games.',
    price: 0,
    icon: '🛋️',
    features: ['Fireplace corner', 'Cultural library', 'Board games', 'Woven floor mats'],
    images: [livingImage, livingImage, livingImage]
  }
];

export const FEATURES: Feature[] = [
  {
    title: 'Prime Location',
    description: 'Walking distance to the famous Banaue Rice Terraces viewpoint and hiking trails.',
    icon: '🌄'
  },
  {
    title: 'Local Cuisine',
    description: 'Enjoy authentic Ifugao dishes and traditional Filipino breakfast prepared fresh daily.',
    icon: '🍽️'
  },
  {
    title: 'Tour Assistance',
    description: 'We can arrange trekking tours, cultural experiences, and transportation.',
    icon: '🗺️'
  },
  {
    title: 'Hot Showers',
    description: 'Warm up after a day of exploration with our reliable hot water system.',
    icon: '♨️'
  },
  {
    title: 'Friendly Staff',
    description: 'Our local team provides warm hospitality and insider tips for the best experience.',
    icon: '🤝'
  },
  {
    title: 'Free Parking',
    description: 'Secure parking space available for guests traveling with their own vehicles.',
    icon: '🅿️'
  }
];
