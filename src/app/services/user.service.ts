import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginDTO } from '../../assets/Models/DTO/LoginDTO';
import { ApiResponse } from '../../assets/Models/DTO/ApiResponse';

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

  getUserInfo(): Observable<UserProfile> {
    const email = localStorage.getItem('User_Email') || '';
    const username = localStorage.getItem('User_Name') || '';
    const profilePictureUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'; // Default or fetched URL
  
    return of({ email, username, profilePictureUrl });
  }

}
