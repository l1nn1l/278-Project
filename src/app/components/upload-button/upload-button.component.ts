import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewFolderComponent } from '../dialog-new-folder/dialog-new-folder.component';
import { DialogUploadFileComponent } from '../dialog-upload-file/dialog-upload-file.component';
import { DialogUploadFolderComponent } from '../dialog-new-folder/dialog-upload-folder/dialog-upload-folder.component';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../../services/document.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

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

  constructor(
    private eRef: ElementRef,
    private dialog: MatDialog,
    private documentService: DocumentService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentDirectoryId();
      }
    });
  }

  private updateCurrentDirectoryId(): void {
    const urlSegments = this.activatedRoute.root.snapshot.firstChild?.firstChild?.url;
    if (urlSegments && urlSegments.length > 1 && urlSegments[0].path === 'folders') {
      this.currentDirectoryId = urlSegments[1].path;
      console.log('Current Directory ID:', this.currentDirectoryId);
    } else {
      this.currentDirectoryId = null; // Reset when navigating away from folder paths
    }
  }

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
    const dialogRef = this.dialog.open(DialogNewFolderComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const parentId = this.currentDirectoryId || 'base';
        console.log("parent id of new folder:", parentId);
        this.documentService.createFolder(result, this.authService.getCurrentUserID(), parentId).subscribe({
          next: response => {
            console.log('Folder created:', response);
            window.location.reload(); 
          },          
          error: error => console.error('Error creating folder:', error)
        });
      }
    });
  }
  
  
}
