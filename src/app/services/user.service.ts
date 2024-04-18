import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface UserProfile {
  email: string;
  username: string;
  profilePictureUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'https://googledriveclonebackend.onrender.com';

  private user: UserProfile = {
    email: 'user@example.com',
    username: 'JohnDoe',
    profilePictureUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  };

  // constructor(private http: HttpClient) { }

  getUserInfo(): Observable<UserProfile> {
    return of(this.user);
  }

}
