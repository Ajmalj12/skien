import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, DiscountRequest, DiscountResponse, DiscountType } from '../models/cart.model';
import { Product } from '../models/product.model';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  private discountInfo = signal<DiscountResponse | null>(null);
  private selectedDiscount = signal<DiscountType>('best');
  private couponCode = signal<string>('');

  // Computed values
  readonly items = this.cartItems.asReadonly();
  readonly discount = this.discountInfo.asReadonly();
  readonly selectedDiscountType = this.selectedDiscount.asReadonly();
  readonly coupon = this.couponCode.asReadonly();
  
  readonly totalItems = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  });

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}

  addToCart(product: Product, quantity: number = 1): void {
    // Check if user is logged in before adding to cart
    if (!this.authService.isLoggedIn()) {
      // Redirect to login page if not logged in
      this.router.navigate(['/login']);
      return;
    }
    
    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
      this.cartItems.set(updatedItems);
    } else {
      // Add new item
      this.cartItems.update(items => [...items, { ...product, quantity }]);
    }

    this.updateDiscount();
  }

  removeFromCart(productId: number): void {
    this.cartItems.update(items => items.filter(item => item.id !== productId));
    this.updateDiscount();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.update(items =>
      items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

    this.updateDiscount();
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.discountInfo.set(null);
  }

  setDiscountType(type: DiscountType): void {
    this.selectedDiscount.set(type);
    this.updateDiscount();
  }

  setCouponCode(code: string): void {
    this.couponCode.set(code);
    this.updateDiscount();
  }

  private updateDiscount(): void {
    const items = this.cartItems();
    if (items.length === 0) {
      this.discountInfo.set(null);
      return;
    }

    const request: DiscountRequest = {
      cartItems: items,
      isFirstTimeUser: this.authService.isFirstTimeUser(),
      selectedDiscount: this.selectedDiscount(),
      couponCode: this.couponCode() || undefined
    };

    this.apiService.calculateDiscount(request).subscribe({
      next: (response) => this.discountInfo.set(response),
      error: (error) => console.error('Error calculating discount', error)
    });
  }
}