import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';


interface Item {
  name: string;
  type: 'file' | 'folder';
  modified: string;
}


@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
  encapsulation: ViewEncapsulation.None,

})
export class MainContentComponent {
  showActions = false;
  selectedItem: Item | null = null;
  isGridView: boolean = true;
  contentType: 'files' | 'folders' = 'files';
  selectedItemIndex: number | null = null;
  showMenu = false;
  items: Item[] = [
    { name: 'Assignment1.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment2.ipynb', type: 'folder', modified: 'Mar 30, 2024' },
    { name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment4.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment5.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { name: 'Assignment6.ipynb', type: 'folder', modified: 'Mar 30, 2024' },
    { name: 'Assignment7.ipynb', type: 'folder', modified: 'Mar 30, 2024' },
    { name: 'Assignment8.ipynb', type: 'folder', modified: 'Mar 30, 2024' },
    { name: 'Assignment9.ipynb', type: 'folder', modified: 'Mar 30, 2024' },
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

  constructor(public dialog: MatDialog) {}

  setListView(): void {
    this.isGridView = false;
  }

  setGridView(): void {
    this.isGridView = true;
  }

  toggleContentType(type: 'files' | 'folders'): void {
    this.contentType = type;
  }

  get displayedItems(): Item[] {
    return this.items.filter(item => this.contentType === 'files' ? item.type === 'file' : item.type === 'folder');
  }

  toggleActions(item: Item): void {
    if (this.selectedItem === item) {
      this.selectedItem = null;
      this.showActions = false;
    } else {
      this.selectedItem = item;
      this.showActions = true;
    }
  }

  closeActions(): void {
    this.selectedItem = null;
    this.showActions = false;
  }


  openWith(item: any) {

   }

  download(item: any) {
    // Download logic
  }

  moveToTrash(item: any) {
    // Move to trash logic
  }

  viewDetails(item: any) {
    // View details logic
  }

}

