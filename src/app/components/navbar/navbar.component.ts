import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { UserService, UserProfile } from '../../services/user.service';
import { UserProfilePopupComponent } from "../user-profile-popup/user-profile-popup.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [CommonModule, DropdownModule, ReactiveFormsModule, InputTextModule, RadioButtonModule, UserProfilePopupComponent]
})
export class NavbarComponent {
  showModal: boolean = false;
  public userProfile!: UserProfile;
  private dialogRef: MatDialogRef<UserProfilePopupComponent> | null = null;

  constructor(private userService: UserService, public dialog: MatDialog) { }


  openUserProfileDialog(): void {
    if (this.dialogRef) {
      // Dialog is currently opened, close it
      this.dialogRef.close();
      this.dialogRef = null; // Reset the reference
    } else {
      // Fetch the user profile every time the dialog is opened
      this.userService.getUserInfo().subscribe(profile => {
        this.dialogRef = this.dialog.open(UserProfilePopupComponent, {
          width: '250px',
          hasBackdrop: true,
          backdropClass: 'transparent-backdrop',
          panelClass: 'custom-dialog-container',
          position: {
            top: '65px'
          },
          data: profile  // Pass the fetched user profile as data
        });
        // Reset the reference when the dialog is closed
        this.dialogRef.afterClosed().subscribe(() => {
          this.dialogRef = null;
        });
      });
    }
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
    console.log('toggleModal called', this.showModal);
  }

  onBackgroundClick(event: MouseEvent): void {
    this.showModal = false;
  }

  formGroup = new FormGroup({
    type: new FormControl('any'),
    owner: new FormControl('anyone'),
    includes_words: new FormControl(''),
    item_name: new FormControl(''),
    location: new FormControl('anywhere'),
    fileStatus: new FormControl('')
  });

  types = [
    { label: 'Any', value: 'any' },
    // Add more types as needed
  ];

  owners = [
    { label: 'Anyone', value: 'anyone' },
    { label: 'Owned by me', value: 'owned-by-me' },
    { label: 'Not owned by me', value: 'not-owned-by-me' },
    // Add more owner options as needed
  ];

  driveLocations = [
    { label: 'Anywhere', value: 'anywhere' },
    { label: 'My Drive', value: 'my-drive' },
    { label: 'Shared with me', value: 'shared-with-me' },
  ]

  onSubmit() {
    console.log(this.formGroup.value);
    this.toggleModal();
  }

}
