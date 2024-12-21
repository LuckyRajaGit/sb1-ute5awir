// Product related types
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  barcode?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// User related types
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'cashier';
}

// Payment related types
export type PaymentMethod = 'cash' | 'card' | 'upi';

export interface Payment {
  method: PaymentMethod;
  amount: number;
}

export interface Bill {
  id: string;
  items: CartItem[];
  payments: Payment[];
  subtotal: number;
  tax: number;
  total: number;
  customerId?: string;
  createdAt: Date;
  status: 'pending' | 'completed' | 'cancelled';
}