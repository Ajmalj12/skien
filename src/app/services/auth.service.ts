import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginResponse, User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private isLoggedInState = signal<boolean>(false);

  // Computed values
  readonly user = this.currentUser.asReadonly();
  readonly isLoggedIn = this.isLoggedInState.asReadonly();
  readonly isFirstTimeUser = computed(() => this.currentUser()?.firstTime || false);

  constructor(private apiService: ApiService, private router: Router) {
    // Check for saved user in localStorage on initialization
    this.loadUserFromStorage();
  }

  login(email: string, password: string): Observable<boolean> {
    return this.apiService.login(email, password).pipe(
      tap((response: LoginResponse) => {
        if (response.success && response.user) {
          this.setCurrentUser(response.user);
        }
      }),
      map((response) => response.success),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.currentUser.set(null);
    this.isLoggedInState.set(false);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/login']);
  }

  private setCurrentUser(user: User): void {
    // Remove password before storing
    const { password, ...userWithoutPassword } = user;
    
    this.currentUser.set(userWithoutPassword);
    this.isLoggedInState.set(true);
    
    // Save to localStorage for persistence if in browser environment
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    }
    
    this.router.navigate(['/products']);
  }

  private loadUserFromStorage(): void {
    // Check if running in browser environment before accessing localStorage
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser) as User;
          this.currentUser.set(user);
          this.isLoggedInState.set(true);
        } catch (error) {
          console.error('Error parsing saved user', error);
          localStorage.removeItem('currentUser');
        }
      }
    }
  }
}