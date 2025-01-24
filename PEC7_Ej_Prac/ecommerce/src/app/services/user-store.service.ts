import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private token: string | null = null;

  constructor() {}

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();  // Retorna true si hi ha un token
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }
}
