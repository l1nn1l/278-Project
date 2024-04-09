import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, DropdownModule, ReactiveFormsModule, InputTextModule, RadioButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showModal: boolean = false;

  constructor() { }

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
