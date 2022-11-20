import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthActiveGuard implements CanLoad {
  constructor(private readonly authService:AuthService,private router:Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.authService.userValue;
      if (user) {
          // authorised so return true
          return true;
      }
      // not logged in so redirect to login page
      this.router.navigate(['/account/login']);
      return false;
  }
}
