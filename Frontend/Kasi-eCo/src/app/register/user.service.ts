import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  private apiUrl = 'http://api.example.com'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  registerUser(username: string, email: string, password: string) {
    const registrationData = { username, email, password };
    return this.http.post(`${this.apiUrl}/register`, registrationData);
  }
}
