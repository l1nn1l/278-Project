
import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

interface Item {
  id: number;
  name: string;
  type: 'file' | 'folder';
  modified: string;
}


@Component({
  selector: 'app-my-drive',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: './my-drive.component.html',
  styleUrl: './my-drive.component.css',
  encapsulation: ViewEncapsulation.None,
})

export class MyDriveComponent {
  showActions: boolean = false;
  selectedItem: Item | null = null;
  isGridView: boolean = true;
  contentType: 'files' | 'folders' = 'files';
  selectedItems: Item[] = [];
  isSelecting: boolean = false;
  selectionBoxStyle = {};
  startSelectionPosition = { x: 0, y: 0 };
  items: Item[] = [
    { id: 1, name: 'Assignment1.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 2, name: 'Assignment2.ipynb', type: 'folder', modified: 'Mar 30, 2024' },
    { id: 3, name: 'Assignment3.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 4, name: 'Assignment4.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 5, name: 'Assignment5.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 6, name: 'Assignment6.ipynb', type: 'folder', modified: 'Mar 30, 2024' },
    { id: 7, name: 'Assignment7.ipynb', type: 'folder', modified: 'Mar 30, 2024' },
    { id: 8, name: 'Assignment8.ipynb', type: 'folder', modified: 'Mar 30, 2024' },
    { id: 9, name: 'Assignment9.ipynb', type: 'folder', modified: 'Mar 30, 2024' },
    { id: 10, name: 'Assignment10.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 11, name: 'Assignment11.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 12, name: 'Assignment12.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 13, name: 'Assignment13.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 14, name: 'Assignment14.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 15, name: 'Assignment15.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 16, name: 'Assignment16.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 17, name: 'Assignment17.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 18, name: 'Assignment18.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 19, name: 'Assignment19.ipynb', type: 'file', modified: 'Mar 30, 2024' },
    { id: 20, name: 'Assignment20.ipynb', type: 'file', modified: 'Mar 30, 2024' },
  ];



  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef) { }

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
    return this.items; // Display all items without filtering
  }
  getOwner(item: any) {
    // Download logic
  }

  getDate(item: any) {
    // Move to trash logic
  }

  getLocation(item: any) {
    // View details logic
  }

  moveToTrash(item: any) {
    // View details logic
  }

  viewDetails(item: any) {
    // View details logic
  }

  getName(item: any): void {
    console.log('Item Name:', item.name);
    // Add any additional logic needed when the name is clicked
  }

  
  getFolders() {
    return this.displayedItems.filter(item => item.type === 'folder');
  }

  // Method to filter files
  getFiles() {
    return this.displayedItems.filter(item => item.type === 'file');
  }


  toggleActions(item: Item): void {
    console.log('Toggle actions for:', item.name);
    if (this.selectedItem === item) {
      this.selectedItem = null;
      this.showActions = false;
    } else {
      this.selectedItem = item;
      this.showActions = true;
    }
    console.log('Current state of selectedItem:', this.selectedItem);
  }

  closeActions(): void {
    this.selectedItem = null;
    this.showActions = false;
  }

  clearSelection(): void {
    console.log('Clearing selection. Previous selectedItems:', this.selectedItems);
    this.selectedItems = [];
    this.showActions = false;
    this.cd.detectChanges();
    console.log('Selection cleared. Current selectedItems:', this.selectedItems);
  }

  isSelected(item: Item): boolean {
    return this.selectedItems.some(selectedItem => selectedItem.id === item.id);
  }
  startSelection(event: MouseEvent): void {
    this.isSelecting = true;
    this.startSelectionPosition.x = event.clientX;
    this.startSelectionPosition.y = event.clientY;
    this.selectionBoxStyle = {
      left: `${this.startSelectionPosition.x}px`,
      top: `${this.startSelectionPosition.y}px`,
      width: '0px',
      height: '0px'
    };
    event.preventDefault(); // Prevent text selection
  }

  updateSelection(event: MouseEvent): void {
    if (!this.isSelecting) return;
    const currentX = event.clientX;
    const currentY = event.clientY;
    const width = currentX - this.startSelectionPosition.x;
    const height = currentY - this.startSelectionPosition.y;

    this.selectionBoxStyle = {
      left: `${Math.min(currentX, this.startSelectionPosition.x)}px`,
      top: `${Math.min(currentY, this.startSelectionPosition.y)}px`,
      width: `${Math.abs(width)}px`,
      height: `${Math.abs(height)}px`
    };
    this.cd.detectChanges();
  }

  endSelection(event: MouseEvent): void {
    if (!this.isSelecting) {
      console.log('Selection ended without starting');
      return;
    }  
    // Calculate the bounds of the selection box
    const selectionBounds = {
      x1: this.startSelectionPosition.x,
      y1: this.startSelectionPosition.y,
      x2: event.clientX,
      y2: event.clientY
    };
  
    // Normalize the coordinates to always have the smallest values in x1/y1
    const normalizedBounds = {
      x1: Math.min(selectionBounds.x1, selectionBounds.x2),
      y1: Math.min(selectionBounds.y1, selectionBounds.y2),
      x2: Math.max(selectionBounds.x1, selectionBounds.x2),
      y2: Math.max(selectionBounds.y1, selectionBounds.y2)
    };
  
    // Filter the items to find which ones intersect with the selection box
    this.selectedItems = this.items.filter(item => {
      const itemElement = document.getElementById(`item-${item.id}`);
      if (itemElement) {
        const rect = itemElement.getBoundingClientRect();
        return (
          rect.left < normalizedBounds.x2 &&
          rect.right > normalizedBounds.x1 &&
          rect.top < normalizedBounds.y2 &&
          rect.bottom > normalizedBounds.y1
        );
      }
      return false;
    });
  
    // Update the state to reflect the selection
    this.isSelecting = false;
    this.showActions = this.selectedItems.length > 0;
    this.selectionBoxStyle = {}; // Reset the selection box style
    this.cd.detectChanges();
    console.log('Selected items:', this.selectedItems.map(item => item.id));
    // Optional: log selected items
    this.logSelectedItems();
  }
  

  handleItemMouseDown(event: MouseEvent, item: Item): void {
    event.stopPropagation();
  
    const isSelected = this.isSelected(item);
  
    if (event.ctrlKey || event.metaKey) {
      if (isSelected) {
        this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem.id !== item.id);
      } else {
        this.selectedItems = [...this.selectedItems, item];
      }
    } else {
      this.selectedItems = isSelected ? [] : [item];
    }
  
    this.showActions = this.selectedItems.length > 0;
    this.cd.detectChanges();
  }


  logSelectedItems(): void {
    this.selectedItems.forEach(item => {
      console.log('Selected Item Name:', item.name);
    });
  }
}

