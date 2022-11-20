import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddUser, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject!: BehaviorSubject<User | null>;
  public user!: Observable<User | null>;
  constructor(private readonly _http: HttpClient, private readonly router: Router) {
  }


  public get userValue(): User | null {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
    return this.userSubject.value;
  }

  /**
 * set Admin details
 * @param requestBody is user register details
 */
  register(requestBody: User) {
    const url = `${environment.apiUrl}/register`;
    return this._http.post(url, requestBody);
  }

  /**
 * Get all Admin details
 */
  checkUserCredentials() {
    const url = `${environment.apiUrl}/register`;
    return this._http.get(url);
  }

  /**
 * set admin user
 * @param requestBody is user details
 */
  setAddUserForm(requestedBody: AddUser) {
    const url = `${environment.apiUrl}/addUser`;
    return this._http.post(url, requestedBody);
  }

  /**
 * Get all User details
 */
  manageUserList() {
    const url = `${environment.apiUrl}/addUser`;
    return this._http.get(url);
  }


  /**
 * Delete specific user
 * @param id is selected user id
 */
  deleteUser(id: number) {
    const url = `${environment.apiUrl}/addUser/${id}`;
    return this._http.delete(url);
  }

  /**
* get specific user
* @param id is selected user id
*/
  getDetailsById(id: number) {
    const url = `${environment.apiUrl}/addUser/${id}`;
    return this._http.get(url);
  }
  /**
* update specific user
* @param id is selected user id
* @param params is user details
*/
  updateUserDetails(id: any, params: AddUser) {
    const url = `${environment.apiUrl}/addUser/${id}`;
    return this._http.put(url, params);
  }


  // remove user from local storage and set current user to null
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }
}
