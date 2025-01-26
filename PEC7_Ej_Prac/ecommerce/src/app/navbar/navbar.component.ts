import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  mostraArticleList(): void {
    this.router.navigate(['/articles']);
  }

  mostraFormReactive(): void {
    this.router.navigate(['/article-new-reactive']);
  }

  isLoggedIn(): boolean {
    this.username = this.authService.getUsername();
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
