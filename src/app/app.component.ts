import { Component } from '@angular/core';
import { AuthService } from './services/authorize/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Euroleague';
  constructor(private authService: AuthService) {}
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
