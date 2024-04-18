import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-user-profile-popup',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './user-profile-popup.component.html',
  styleUrl: './user-profile-popup.component.css'
})
export class UserProfilePopupComponent {
  @Input() userEmail!: string;
  public userName!: string;
  public profilePictureUrl!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.userName = data.username;
    this.profilePictureUrl = data.profilePictureUrl;
    this.userEmail = data.email;
  }

  
}
