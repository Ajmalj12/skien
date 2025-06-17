import { Product } from './product.model';

export interface CartItem extends Product {
  quantity: number;
}

export type DiscountType = 'flat' | 'percentage' | 'bogo' | 'firsttime' | 'best';

export interface DiscountRequest {
  cartItems: CartItem[];
  isFirstTimeUser: boolean;
  couponCode?: string;
  selectedDiscount: DiscountType;
}

export interface DiscountResponse {
  totalBeforeDiscount: number;
  discount: number;
  totalAfterDiscount: number;
}