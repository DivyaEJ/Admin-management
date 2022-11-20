import { Component } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-management';
  user:User | null = null;
  constructor(private readonly authService : AuthService){
    this.user = this.authService.userValue;
  }

}
