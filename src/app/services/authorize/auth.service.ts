import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+'/auth'
  private isAuthenticated = false;
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  signUp(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, { username, email, password });
  }
  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
