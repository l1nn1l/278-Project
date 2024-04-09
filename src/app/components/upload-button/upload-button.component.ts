import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewFolderComponent } from '../dialog-new-folder/dialog-new-folder.component';
import { DialogUploadFileComponent } from '../dialog-upload-file/dialog-upload-file.component';
import { DialogUploadFolderComponent } from '../dialog-new-folder/dialog-upload-folder/dialog-upload-folder.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.css'] 
})
export class UploadButtonComponent {
  isDropdownOpen: boolean = false;

  constructor(private eRef: ElementRef, public dialog: MatDialog) { }

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

  createNew() {
    this.isDropdownOpen = false;
    this.dialog.open(DialogNewFolderComponent);
  }
}
