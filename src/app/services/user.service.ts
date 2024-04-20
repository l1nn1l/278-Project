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


  constructor(private http: HttpClient) {}
  private baseUrl: string = 'https://googledriveclonebackend.onrender.com';
  private signInUrl:string='https://googledriveclonebackend.onrender.com'

  private user: UserProfile = {
    email: 'user@example.com',
    username: 'JohnDoe',
    profilePictureUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  };

  // constructor(private http: HttpClient) { }

  getUserInfo(): Observable<UserProfile> {
    return of(this.user);
  }

  signIn(username: string, password: string): Observable<any> {
    var loginDTO = new LoginDTO(username, password);

    return this.http.post<ApiResponse>(
      `${this.baseUrl}${this.signInUrl}`,
      loginDTO
    );
  }

}
