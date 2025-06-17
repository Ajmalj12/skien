import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

// Auth guard function
const authGuard = () => {
  const authService = inject(AuthService);
  return authService.isLoggedIn() ? true : { path: '/login' };
};

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/products' }
];
