import { Component } from '@angular/core';
import {FormGroup,FormControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-new-folder',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  templateUrl: './dialog-new-folder.component.html',
  styleUrl: './dialog-new-folder.component.css'
})
export class DialogNewFolderComponent {
  createForm = this.fb.group({
    folderName: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogNewFolderComponent>) { }

  onCreate() {
    if (this.createForm.valid) {
      this.dialogRef.close(this.createForm.value.folderName);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
