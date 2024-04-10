import { Component } from '@angular/core';
import {FormGroup,FormControl, FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';


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
  createform = this.fb.group({
    form: new FormControl(''),
  })

  constructor(public fb: FormBuilder){}

}
