import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.userValue;
  }

  logout() {
    this.authService.logout();
    this.user = this.authService.userValue;
  }
}
