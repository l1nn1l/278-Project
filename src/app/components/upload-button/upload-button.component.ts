import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewFolderComponent } from '../dialog-new-folder/dialog-new-folder.component';
import { DialogUploadFileComponent } from '../dialog-upload-file/dialog-upload-file.component';
import { DialogUploadFolderComponent } from '../dialog-new-folder/dialog-upload-folder/dialog-upload-folder.component';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../../services/document.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-upload-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.css'],
  providers: [
    AuthService,
    DocumentService
  ],
})
export class UploadButtonComponent {
  isDropdownOpen: boolean = false;
  currentDirectoryId: string | null = null;

  constructor(private eRef: ElementRef, public dialog: MatDialog, private documentService: DocumentService, private authService: AuthService) { }

  @HostListener('document:click', ['$event'])
  clickOutside(event : any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  upload(type: string) {
    this.isDropdownOpen = false;
    if (type === 'file') {
      this.dialog.open(DialogUploadFileComponent);
    } else if (type === 'folder') {
      this.dialog.open(DialogUploadFolderComponent);
    }
  }


  navigateToFolder(folderId: string) {
    this.currentDirectoryId = folderId;
  }

  createNew() {
    this.isDropdownOpen = false;
    const dialogRef = this.dialog.open(DialogNewFolderComponent, {
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.documentService.createFolder(result, this.authService.getCurrentUserID(), this.currentDirectoryId).subscribe({
          next: response => console.log('Folder created:', response),
          error: error => console.error('Error creating folder:', error)
        });
      }
    });
  }
  
}
