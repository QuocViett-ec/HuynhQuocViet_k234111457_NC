export interface Product {
  _id?: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface CartResponse {
  cart: CartItem[];
  total: number;
  message?: string;
}

export interface CheckoutForm {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}
