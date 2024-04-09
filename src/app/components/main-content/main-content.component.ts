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
}
