
import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DocumentService } from '../../services/document.service';
import { DocumentDTO } from '../../../assets/Models/DTO/DocumentDTO';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@Component({
  selector: 'app-sharedwithme',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: './sharedwithme.component.html',
  styleUrl: './sharedwithme.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [
    DocumentService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class SharedwithmeComponent {
  showActions: boolean = false;
  selectedItem: DocumentDTO | null = null;
  isGridView: boolean = true;
  contentType: 'files' | 'folders' = 'files';
  selectedItems: DocumentDTO[] = [];
  isSelecting: boolean = false;
  selectionBoxStyle = {};
  startSelectionPosition = { x: 0, y: 0 };

  documents:DocumentDTO[]=[];
  owner= localStorage.getItem('User_Email');

  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef, private documentService:DocumentService, private router:Router) { }

  ngOnInit() {
  this.getDocuments();
  }
  
  setListView(): void {
    this.isGridView = false;
  }

  setGridView(): void {
    this.isGridView = true;
  }

  toggleContentType(type: 'files' | 'folders'): void {
    this.contentType = type;
  }

  // get displayedItems(): Item[] {
  //   return this.items; // Display all items without filtering
  // }
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

  toggleActions(item: DocumentDTO): void {
    console.log('Toggle actions for:', item.title);
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

  isSelected(item: DocumentDTO): boolean {
    return this.selectedItems.some(selectedItem => selectedItem._id === item._id);
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
    this.selectedItems = this.documents.filter(item => {
      const itemElement = document.getElementById(`item-${item._id}`);
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
    console.log('Selected items:', this.selectedItems.map(item => item._id));
    // Optional: log selected items
    this.logSelectedItems();
  }
  

  handleItemMouseDown(event: MouseEvent, item: DocumentDTO): void {
    event.stopPropagation();
  
    const isSelected = this.isSelected(item);
  
    if (event.ctrlKey || event.metaKey) {
      if (isSelected) {
        this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem._id !== item._id);
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
      console.log('Selected Item Name:', item.title);
    });
  }

  sortItemsByModifiedDate(): void {
    this.documents.sort((a, b) => {
      // Convert to date objects to compare
      const dateA = new Date(a.uploadDate);
      const dateB = new Date(b.uploadDate);
      // Sort in descending order
      return dateB.getTime() - dateA.getTime();
    });
  }

  getDateString(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);
  
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else if (date >= startOfWeek) {
      return 'Earlier this week';
    } else if (date >= startOfMonth) {
      return 'Earlier this month';
    } else if (date < startOfMonth && date >= startOfLastMonth) {
      return 'Last month';
    } else if (date >= startOfYear) {
      return 'Earlier this year';
    } else {
      return 'Older';
    }
  }
  

  getDocuments() {
    // this.isLoading = true;
    this.documentService.getSharedDocuments(localStorage.getItem('id')).subscribe(
      (response) => {
        console.log('Response:', response);
        this.documents = response.data;
        // this.isLoading = false;
        this.sortItemsByModifiedDate(); // Sort after the documents are fetched
        console.log('These are the Shared Documents from the database', this.documents);
      },
      (error) => {
        if (error.status == 401) {
          console.error('Error:', error);
          console.log('Authentication Token Expired');
          console.log('Redirecting to Login Page');
          this.router.navigate(['/login']);
        }

        // this.isLoading = false;
      }
    );
  }
  
}
