import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://127.0.0.1:8000/users/';

  constructor(private http: HttpClient) {}

  // 🔹 INSCRIPTION
  register(role: string, data: any) {
    const url = role === 'patient'
      ? this.API + 'register/patient/'
      : this.API + 'register/doctor/';

    return this.http.post(url, data);
  }

  // 🔹 LOGIN
  login(data: any) {
    return this.http.post(this.API + 'login/', data);
  }

  // 🔹 STOCKER TOKEN
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // 🔹 RECUPERER TOKEN
  getToken() {
    return localStorage.getItem('token');
  }

  // 🔹 DECONNEXION
  logout() {
    localStorage.removeItem('token');
  }
}
