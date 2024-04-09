import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-upload-folder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-upload-folder.component.html',
  styleUrl: './dialog-upload-folder.component.css'
})
export class DialogUploadFolderComponent implements AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  fileChooserOpened: boolean = false; 

  constructor(private dialogRef: MatDialogRef<DialogUploadFolderComponent>) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.fileInput.nativeElement.click();
      let fileChooserOpened = true;
      setTimeout(() => {
        if (fileChooserOpened) {
          this.dialogRef.close();
        }
      }, 150); 
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      console.log('File selected:', file.name);
    } else {
      console.log('File selection was cancelled.');
    }
    
     this.fileChooserOpened = false;
  }
}
