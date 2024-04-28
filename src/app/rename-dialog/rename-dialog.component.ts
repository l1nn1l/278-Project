import { Component, Inject, NgModule, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DocumentDTO } from '../../assets/Models/DTO/DocumentDTO';
import { DocumentService } from '../services/document.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule, 
    CommonModule,
    HttpClientModule
  ],
  providers: [
    DocumentService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class RenameDialogComponent {
  createForm: FormGroup;
  documents: DocumentDTO[] = [];
  owner = localStorage.getItem('User_Email');
  isLoading: boolean = true;
  contentType: 'file' | 'folder' = 'file';

  constructor(
    public dialogRef: MatDialogRef<RenameDialogComponent>,
    private fb: FormBuilder,
    private documentService: DocumentService,
    @Inject(MAT_DIALOG_DATA) public data: { documentId: string }
  ) {
    this.createForm = this.fb.group({
      newName: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  rename() {
    const newName = this.createForm.value.newName;
    this.documentService.updateDocumentName(this.data.documentId, newName).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        this.dialogRef.close(newName);
      },
      error: (error) => {
        console.error('Update failed:', error);
      }
    });
  }
}
