import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem, DiscountType } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cart-container">
      <h2>Your Shopping Cart</h2>
      
      <div *ngIf="cartService.items().length === 0" class="empty-cart">
        <p>Your cart is empty</p>
        <button routerLink="/products" class="continue-shopping">Continue Shopping</button>
      </div>
      
      <div *ngIf="cartService.items().length > 0" class="cart-content">
        <div class="cart-items">
          <div *ngFor="let item of cartService.items()" class="cart-item">
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="category">{{ item.category }}</p>
              <p class="price">₹{{ item.price.toLocaleString() }}</p>
            </div>
            
            <div class="item-quantity">
              <button (click)="updateQuantity(item, item.quantity - 1)" class="quantity-btn">-</button>
              <input type="number" [value]="item.quantity" (input)="onQuantityInput(item, $event)" min="1" class="quantity-input">
              <button (click)="updateQuantity(item, item.quantity + 1)" class="quantity-btn">+</button>
            </div>
            
            <div class="item-subtotal">
              ₹{{ (item.price * item.quantity).toLocaleString() }}
            </div>
            
            <button (click)="removeItem(item)" class="remove-btn">
              Remove
            </button>
          </div>
        </div>
        
        <div class="cart-summary">
          <h3>Order Summary</h3>
          
          <div class="discount-options">
            <h4>Select Discount</h4>
            
            <div class="discount-option">
              <input type="radio" id="flat" name="discount" [value]="'flat'" 
                     [checked]="cartService.selectedDiscountType() === 'flat'"
                     (change)="setDiscountType('flat')">
              <label for="flat">Flat ₹50 off on orders above ₹500</label>
            </div>
            
            <div class="discount-option">
              <input type="radio" id="percentage" name="discount" [value]="'percentage'" 
                     [checked]="cartService.selectedDiscountType() === 'percentage'"
                     (change)="setDiscountType('percentage')">
              <label for="percentage">10% off on Electronics</label>
            </div>
            
            <div class="discount-option">
              <input type="radio" id="bogo" name="discount" [value]="'bogo'" 
                     [checked]="cartService.selectedDiscountType() === 'bogo'"
                     (change)="setDiscountType('bogo')">
              <label for="bogo">Buy 3 Books, Get 1 Free</label>
            </div>
            
            <div class="discount-option">
              <input type="radio" id="firsttime" name="discount" [value]="'firsttime'" 
                     [checked]="cartService.selectedDiscountType() === 'firsttime'"
                     (change)="setDiscountType('firsttime')">
              <label for="firsttime">First-time user: ₹200 off</label>
            </div>
            
            <div class="discount-option">
              <input type="radio" id="best" name="discount" [value]="'best'" 
                     [checked]="cartService.selectedDiscountType() === 'best'"
                     (change)="setDiscountType('best')">
              <label for="best">Best discount (automatic)</label>
            </div>
          </div>
          
          <div class="coupon-section">
            <h4>Coupon Code</h4>
            <div class="coupon-input">
              <input type="text" [(ngModel)]="couponCode" placeholder="Enter coupon code">
              <button (click)="applyCoupon()">Apply</button>
            </div>
            <p class="coupon-hint">Try: WELCOME50 for ₹50 off</p>
          </div>
          
          <div class="price-details">
            <div class="price-row">
              <span>Subtotal</span>
              <span>₹{{ cartService.discount()?.totalBeforeDiscount?.toLocaleString() || '0' }}</span>
            </div>
            
            <div class="price-row discount" *ngIf="cartService.discount()?.discount">
              <span>Discount</span>
              <span>-₹{{ cartService.discount()?.discount?.toLocaleString() || '0' }}</span>
            </div>
            
            <div class="price-row total">
              <span>Total</span>
              <span>₹{{ cartService.discount()?.totalAfterDiscount?.toLocaleString() || '0' }}</span>
            </div>
          </div>
          
          <button class="checkout-btn">Proceed to Checkout</button>
          <button routerLink="/products" class="continue-shopping">Continue Shopping</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h2 {
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .empty-cart {
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }
    }
    
    .cart-items {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
    }
    
    .cart-item {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr auto;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
    }
    
    .cart-item:last-child {
      border-bottom: none;
    }
    
    .item-details h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
    }
    
    .category {
      color: #666;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
    
    .price {
      font-weight: bold;
      color: #4a148c;
    }
    
    .item-quantity {
      display: flex;
      align-items: center;
    }
    
    .quantity-btn {
      width: 30px;
      height: 30px;
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    .quantity-input {
      width: 40px;
      height: 30px;
      text-align: center;
      margin: 0 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .item-subtotal {
      font-weight: bold;
      display: flex;
      align-items: center;
    }
    
    .remove-btn {
      background: none;
      border: none;
      color: #f44336;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    
    .cart-summary {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      height: fit-content;
    }
    
    .cart-summary h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #eee;
    }
    
    .discount-options, .coupon-section {
      margin-bottom: 1.5rem;
    }
    
    .discount-options h4, .coupon-section h4 {
      margin-bottom: 0.75rem;
    }
    
    .discount-option {
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
    }
    
    .discount-option input {
      margin-right: 0.5rem;
    }
    
    .coupon-input {
      display: flex;
    }
    
    .coupon-input input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
    }
    
    .coupon-input button {
      padding: 0.75rem 1rem;
      background-color: #4a148c;
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
    }
    
    .coupon-hint {
      font-size: 0.875rem;
      color: #666;
      margin-top: 0.5rem;
    }
    
    .price-details {
      margin-bottom: 1.5rem;
    }
    
    .price-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .price-row.discount {
      color: #4caf50;
    }
    
    .price-row.total {
      font-weight: bold;
      font-size: 1.1rem;
      padding-top: 0.5rem;
      margin-top: 0.5rem;
      border-top: 1px solid #eee;
    }
    
    .checkout-btn {
      width: 100%;
      padding: 0.75rem;
      background-color: #4a148c;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-bottom: 0.75rem;
    }
    
    .continue-shopping {
      width: 100%;
      padding: 0.75rem;
      background-color: white;
      color: #4a148c;
      border: 1px solid #4a148c;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      display: inline-block;
    }
  `]
})
export class CartComponent {
  cartService = inject(CartService);
  couponCode = '';
  
  updateQuantity(item: CartItem, quantity: number | string): void {
    const newQuantity = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
    if (isNaN(newQuantity) || newQuantity < 1) return;
    
    this.cartService.updateQuantity(item.id, newQuantity);
  }
  
  onQuantityInput(item: CartItem, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.updateQuantity(item, input.value);
    }
  }
  
  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id);
  }
  
  setDiscountType(type: DiscountType): void {
    this.cartService.setDiscountType(type);
  }
  
  applyCoupon(): void {
    this.cartService.setCouponCode(this.couponCode);
  }
}