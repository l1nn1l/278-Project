import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  showActions = false;
  selectedItem = null;
  items = [
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },

      ];

  toggleActions(item : any): void {
    this.selectedItem = item;
    this.showActions = !this.showActions;
  }
  closeActions(): void {
    this.showActions = false;
  }
}
