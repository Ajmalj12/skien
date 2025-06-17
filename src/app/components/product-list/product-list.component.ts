import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-list-container">
      <h2>Products</h2>
      
      <div *ngIf="isLoading" class="loading">
        Loading products...
      </div>
      
      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>
      
      <div class="product-grid">
        <div *ngFor="let product of products" class="product-card">
          <h3>{{ product.name }}</h3>
          <p class="category">{{ product.category }}</p>
          <p class="price">₹{{ product.price.toLocaleString() }}</p>
          <button (click)="addToCart(product)" class="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-list-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h2 {
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .loading, .error-message {
      text-align: center;
      padding: 2rem;
    }
    
    .error-message {
      color: #f44336;
    }
    
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    
    .product-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    
    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: #333;
    }
    
    .category {
      color: #666;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
    
    .price {
      font-weight: bold;
      font-size: 1.25rem;
      color: #4a148c;
      margin-bottom: 1rem;
    }
    
    .add-to-cart-btn {
      width: 100%;
      padding: 0.75rem;
      background-color: #4a148c;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .add-to-cart-btn:hover {
      background-color: #7b1fa2;
    }
  `]
})
export class ProductListComponent implements OnInit {
  private apiService = inject(ApiService);
  private cartService = inject(CartService);
  
  products: Product[] = [];
  isLoading = true;
  error = '';
  
  ngOnInit(): void {
    this.loadProducts();
  }
  
  loadProducts(): void {
    // Only set loading state if products array is empty
    if (this.products.length === 0) {
      this.isLoading = true;
    }
    
    this.apiService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load products. Please try again later.';
        this.isLoading = false;
        console.error('Error loading products', error);
      }
    });
  }
  
  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
  }
}