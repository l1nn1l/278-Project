import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export interface UserProfile {
  email: string;
  username: string;
  profilePictureUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Manages user profile information 

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'https://googledriveclonebackend.onrender.com';

  getUserInfo(): Observable<UserProfile> {
    const email = localStorage.getItem('User_Email') || '';
    const username = localStorage.getItem('User_Name') || '';
    const profilePictureUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'; // Default or fetched URL

    return of({ email, username, profilePictureUrl });
  }

  searchUsers(filter: string, userId: string): Observable<any> {
    const searchUrl = `${this.baseUrl}/users/search/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('Access_Token')}`
    });
    let params = new HttpParams().set('filter', filter);

    const paramString = params.toString();
    // console.log('Full URL sent to server:', `${searchUrl}?${paramString}`);

    return this.http.get<{ status: number, data: any[] }>(searchUrl, { headers, params }).pipe(
      map(response => {
        // console.log('Received from filter users API:', response);
        return response.data;
      }),
      catchError(error => {
        console.error('Failed to fetch users:', error);
        return [];
      })
    );
  }

}
