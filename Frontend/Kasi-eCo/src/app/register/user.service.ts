import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  private apiUrl = 'https://kasi-e-co.vercel.app//v1/traders/signup';    // Replace with your API URL

  constructor(private http: HttpClient) {}

  registerUser(fname: string, password: string, email: string, address: string, cell: string, businessName: string, image: string) {
    const registrationData = { fname, cell, address, image, businessName, email, password };
    return this.http.post(`${this.apiUrl}/register`, registrationData);
  }
}
