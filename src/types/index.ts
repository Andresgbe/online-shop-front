export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count?: { products: number };
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  images: string[];
  isActive: boolean;
  categoryId: string;
  category: Category;
  createdAt: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  userId: string;
  productId: string;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
}

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  productId: string;
  product: Product;
}

export interface Order {
  id: string;
  status: 'PENDING' | 'VERIFIED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  shippingAddress: string;
  contactPhone: string;
  paymentProofUrl: string | null;
  notes: string | null;
  items: OrderItem[];
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}