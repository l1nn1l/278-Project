import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { UserService, UserProfile } from '../../services/user.service';
import { UserProfilePopupComponent } from "../user-profile-popup/user-profile-popup.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [CommonModule, DropdownModule, ReactiveFormsModule, InputTextModule, CheckboxModule, UserProfilePopupComponent, FormsModule, HttpClientModule],
  providers: [AuthService]
})
export class NavbarComponent {
  searchTerm: string = '';
  showModal: boolean = false;
  public userProfile!: UserProfile;
  private dialogRef: MatDialogRef<UserProfilePopupComponent> | null = null;

  constructor(
    private userService: UserService, 
    public dialog: MatDialog, 
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }


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
    // console.log('toggleModal called', this.showModal);
  }

  onBackgroundClick(event: MouseEvent): void {
    this.showModal = false;
  }

 
  types = [
    { label: 'Any', value: 'any' },
    { 
      label: 'PDF', 
      value: 'application/pdf',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="pdf-logo" style="width: 16px; height: 16px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.778 0h12.444C15.2 0 16 .8 16 1.778v12.444C16 15.2 15.2 16 14.222 16H1.778C.8 16 0 15.2 0 14.222V1.778C0 .8.8 0 1.778 0zm2.666 7.556h-.888v-.89h.888v.89zm1.334 0c0 .737-.596 1.333-1.334 1.333h-.888v1.778H2.222V5.333h2.222c.738 0 1.334.596 1.334 1.334v.889zm6.666-.89h2.223V5.334H11.11v5.334h1.333V8.889h1.334V7.556h-1.334v-.89zm-2.222 2.667c0 .738-.595 1.334-1.333 1.334H6.667V5.333h2.222c.738 0 1.333.596 1.333 1.334v2.666zm-1.333 0H8V6.667h.889v2.666z"></path></svg>')
    },
    { 
      label: 'Word', 
      value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="word-logo" style="width: 16px; height: 16px;"><path d="M14.222 0H1.778C.8 0 0 .8 0 1.778v12.444C0 15.2.8 16 1.778 16h12.444C15.2 16 16 15.2 16 14.222V1.778C16 .8 15.2 0 14.222 0zm-3.11 12.444H9.777L8 5.778l-1.778 6.666H4.89L2.756 3.556h1.51l1.37 6.675 1.742-6.675h1.244l1.751 6.675 1.36-6.675h1.511l-2.133 8.888z"></path></svg>')
    },
    { 
      label: 'Excel', 
      value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="excel-logo" style="width: 16px; height: 16px;"><path d="M14.222 0H1.778C.796 0 0 .796 0 1.778v12.444C0 15.204.796 16 1.778 16h12.444c.982 0 1.778-.796 1.778-1.778V1.778C16 .796 15.204 0 14.222 0zm-2.489 12.444H9.956L8 9.067l-1.956 3.377H4.267L7.11 8 4.267 3.556h1.777L8 6.933l1.956-3.377h1.777L8.89 8l2.844 4.444z"></path></svg>')
    },
    { 
      label: 'Image', 
      value: 'image/png' || 'image/jpg',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="image-logo" style="width: 16px; height: 16px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 14.222V1.778C16 .796 15.204 0 14.222 0H1.778C.796 0 0 .796 0 1.778v12.444C0 15.204.796 16 1.778 16h12.444c.982 0 1.778-.796 1.778-1.778zM4.889 9.333l2.222 2.671L10.222 8l4 5.333H1.778l3.11-4z"></path></svg>')
    },
    { 
      label: 'Video', 
      value: 'video/quicktime' || 'video/mp4',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg" class="video-logo" style="width: 16px; height: 16px;"><path d="M12.8 0l1.6 3.2H12L10.4 0H8.8l1.6 3.2H8L6.4 0H4.8l1.6 3.2H4L2.4 0h-.8C.72 0 .008.72.008 1.6L0 11.2c0 .88.72 1.6 1.6 1.6h12.8c.88 0 1.6-.72 1.6-1.6V0h-3.2z"></path></svg>')
    },
    { 
      label: 'Text File', 
      value: 'text/plain',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg" class="txt-logo" style="width: 16px; height: 16px;"><path d="M8 0H1.6C.72 0 .008.72.008 1.6L0 14.4c0 .88.712 1.6 1.592 1.6H11.2c.88 0 1.6-.72 1.6-1.6V4.8L8 0zm1.6 12.8H3.2v-1.6h6.4v1.6zm0-3.2H3.2V8h6.4v1.6zm-2.4-4V1.2l4.4 4.4H7.2z"></path></svg>')
    },
    { 
      label: 'Archives (zip)', 
      value: 'application/zip' || 'application/rar'
    }
  ];

  owners = [
    { label: 'Anyone', value: 'anyone' },
    { label: 'Owned by me', value: 'owned by me' },
    { label: 'Not owned by me', value: 'not owned by me' },
  ];

  driveLocations = [
    { label: 'Anywhere', value: 'anywhere' },
    { label: 'My Drive', value: 'my drive' },
    { label: 'Shared with me', value: 'shared with me' },
  ]

  formGroup = new FormGroup({
    type: new FormControl(this.types[0]),
    owner: new FormControl(this.owners[0]), // Set default value as a string
    textSearchString: new FormControl(''),
    itemName: new FormControl(''),
    location: new FormControl(this.driveLocations[0]), // Set default value as a string
    starred: new FormControl(false),
    deleted: new FormControl(false)
  });

  performSearch(term: string) {
    if (term) {
      // console.log('Performing search for:', term);
      this.router.navigate(['/main/search'], { queryParams: { itemName: term } });
    }
    // console.log('Performing search for:', term);
  }
  
  onSubmit(): void {
    // console.log(this.formGroup.value);
    this.toggleModal();
  
    const formValues = this.formGroup.value;
    const sanitizedSearchParams: any = {
      type: formValues.type?.value !== 'any' ? formValues.type?.value : undefined,
      owner: formValues.owner?.value !== 'anyone' ? formValues.owner?.value : undefined,
      itemName: formValues.itemName || undefined,
      location: formValues.location?.value  !== 'anywhere' ? formValues.location?.value : undefined,
      starred: formValues.starred || undefined,
      deleted: formValues.deleted || undefined,
      textSearchString: formValues.textSearchString || undefined
    };

    this.router.navigate(['/main/search'], { queryParams: sanitizedSearchParams });
  }
  

}
