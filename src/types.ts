/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MenuCategory = 'antipasti' | 'primi' | 'secondi' | 'pizze' | 'dolci' | 'bevande';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  ingredients: string[];
  image: string;
  isPopular?: boolean;
  isGlutenFree?: boolean;
  isVegetarian?: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  isLocalGuide?: boolean;
  avatarUrl?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  badge: string;
  validUntil: string;
}
