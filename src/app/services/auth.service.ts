// File: src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ApiResponse } from '../../assets/Models/DTO/ApiResponse'; // Import UserData if used
import { LoginDTO } from '../../assets/Models/DTO/LoginDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'https://googledriveclonebackend.onrender.com';
  private signInUrl: string = 'auth';

  constructor(private http: HttpClient, private router: Router) {}

  signIn(email: string, password: string): Observable<ApiResponse> {
    const loginDTO = new LoginDTO(email, password);
    return this.http.post<ApiResponse>(`${this.baseUrl}/${this.signInUrl}`, loginDTO).pipe(
      tap((response: ApiResponse) => {
        console.log("API Response:", response);
        if (response && response.message === 'Login Successful') {
          localStorage.setItem('Access_Token', response.data.token);
          localStorage.setItem('User_Email', response.data.email);
          localStorage.setItem('User_Name', response.data.name);
          this.router.navigate(['/home']);
        } else {
          console.error('Login failed:', response.message);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed due to server error'));
      })
    );
  }
}
