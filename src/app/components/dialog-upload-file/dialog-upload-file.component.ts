import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-upload-file',
  standalone: true,
  templateUrl: './dialog-upload-file.component.html',
  styleUrls: ['./dialog-upload-file.component.css']
})
export class DialogUploadFileComponent implements AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  fileChooserOpened: boolean = false; 

  constructor(private dialogRef: MatDialogRef<DialogUploadFileComponent>) {}

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
