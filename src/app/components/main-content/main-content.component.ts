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
  isGridView: boolean = true; // Assuming grid view is the default

  setListView(): void {
    console.log('Set to list view');
    this.isGridView = false;
  }

  setGridView(): void {
    console.log('Set to grid view');
    this.isGridView = true;
  }

  toggleActions(item: any): void {
    console.log('Toggle actions for item:', item);
    this.showActions = !this.showActions;
  }

  closeActions(): void {
    console.log('Close actions');
    this.showActions = false;
  }
  items = [
    { name: 'Assignment1.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment2.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment4.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment5.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment6.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment7.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment8.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment9.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment10.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment11.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment12.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment13.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment14.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment15.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment16.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment17.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment18.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment19.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment20.ipynb', type: 'file', modified: 'Mar 30, 2024' },

    ];
}
