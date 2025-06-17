import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <a routerLink="/" class="logo">Skien Shop</a>
        
        <nav class="nav">
          <a routerLink="/products" routerLinkActive="active">Products</a>
          <a *ngIf="authService.isLoggedIn()" routerLink="/cart" routerLinkActive="active" class="cart-link">
            Cart
            <span *ngIf="cartService.totalItems() > 0" class="cart-badge">{{ cartService.totalItems() }}</span>
          </a>
        </nav>
        
        <div class="auth-actions">
          <ng-container *ngIf="authService.isLoggedIn(); else loginButton">
            <span class="user-email">{{ authService.user()?.email }}</span>
            <button (click)="logout()" class="logout-btn">Logout</button>
          </ng-container>
          
          <ng-template #loginButton>
            <a routerLink="/login" class="login-btn">Login</a>
          </ng-template>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: #4a148c;
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
    }
    
    .nav {
      display: flex;
      gap: 1.5rem;
    }
    
    .nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 0;
      position: relative;
    }
    
    .nav a.active {
      font-weight: bold;
    }
    
    .nav a.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: white;
    }
    
    .cart-link {
      position: relative;
    }
    
    .cart-badge {
      position: absolute;
      top: -8px;
      right: -12px;
      background-color: #ff4081;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
    }
    
    .auth-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .user-email {
      font-size: 0.875rem;
      margin-right: 0.5rem;
    }
    
    .logout-btn {
      background: none;
      border: 1px solid white;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
    }
    
    .login-btn {
      color: white;
      text-decoration: none;
      border: 1px solid white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .container {
        flex-direction: column;
        gap: 1rem;
      }
      
      .nav {
        width: 100%;
        justify-content: center;
      }
      
      .auth-actions {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HeaderComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);
  
  logout(): void {
    this.authService.logout();
  }
}