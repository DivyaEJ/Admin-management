import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html'
})
export class HomeContentComponent implements OnInit {
  user: User | null = null;
  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.userValue;
  }

}
