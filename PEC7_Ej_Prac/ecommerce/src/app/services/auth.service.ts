import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth = false;
  private username = '';

  login(username: string): void {
    this.isAuth = true;
    this.username = username;
    localStorage.setItem('user', username);
  }

  logout(): void {
    this.isAuth = false;
    this.username = '';
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getUsername(): string {
    return localStorage.getItem('user') || '';
  }
}
