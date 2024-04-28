import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-profile-popup',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, HttpClientModule],
  templateUrl: './user-profile-popup.component.html',
  styleUrl: './user-profile-popup.component.css',
  providers: [AuthService]
})
export class UserProfilePopupComponent {
  @Input() userEmail!: string;
  public userName!: string;
  public profilePictureUrl!: string;

  constructor(private authService: AuthService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userName = data.username;
    this.profilePictureUrl = data.profilePictureUrl;
    this.userEmail = data.email;
  }

  onLogout() {
    this.authService.logout();
  }

  
}
