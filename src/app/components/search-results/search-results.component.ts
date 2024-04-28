import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DocumentService } from '../../services/document.service';
import { DocumentDTO } from '../../../assets/Models/DTO/DocumentDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FilterTabComponent } from "../filter-tab/filter-tab.component";
import { SearchAndFilterService } from '../../services/search-and-filter.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [
    SearchAndFilterService, AuthService, DocumentService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  imports: [CommonModule, MatMenuModule, FilterTabComponent]
})
export class SearchResultsComponent {
  showActions: boolean = false;
  selectedItem: DocumentDTO | null = null;
  isGridView: boolean = true;
  contentType: 'file' | 'folder' = 'file';
  selectedItems: DocumentDTO[] = [];
  isSelecting: boolean = false;
  selectionBoxStyle = {};
  startSelectionPosition = { x: 0, y: 0 };
  isLoading: boolean = true;
  documents: DocumentDTO[] = [];
  owner = localStorage.getItem('User_Email');

  constructor(
    public dialog: MatDialog, 
    private cd: ChangeDetectorRef, 
    private documentService: DocumentService, 
    private router: Router, 
    private searchService: SearchAndFilterService,
    private route: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.performSearch(params);
      }
    });

  }

  performSearch(params: any) {
    const userId = this.authService.getCurrentUserID();
    this.isLoading = true;  
    this.searchService.performSearch(params, userId).subscribe(
      response => {
        console.log("data received", response);
        if (response.status === 200 && response.data) {
          this.documents = response.data;  
          console.log("Search results received:", this.documents);
        } else {
          this.documents = [];  // Clear documents if no data is returned
          console.log("No results found");
        }
        this.isLoading = false;
        this.cd.markForCheck();  // Force change detection to update the view
      },
      error => {
        console.error('Search failed:', error);
        this.documents = [];  // Clear documents on error
        this.isLoading = false;
        this.cd.markForCheck();  // Force change detection to update the view
      }
    );
  }



  setListView(): void {
    this.isGridView = false;
  }

  setGridView(): void {
    this.isGridView = true;
  }

  toggleContentType(type: 'file' | 'folder'): void {
    this.contentType = type;
  }

  get displayedItems(): DocumentDTO[] {
    return this.documents;
  }


  moveToTrash(item: any) {
    // View details logic
  }

  viewDetails(item: any) {
    // View details logic
  }

  toggleStarred(document: DocumentDTO) {
    document.starred=!document.starred;
    this.documentService.updateDocumentStarStatus(document._id, document.starred).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
      },
      error: (error) => {
        console.error('Update failed:', error);
        document.starred = !document.starred; 
      }
    });
  }

  getFolders() {
    return this.displayedItems.filter((item) => item.type === 'folder');
  }

  getFiles() {
    return this.displayedItems.filter((item) => item.type !== 'folder');
  }


  closeActions(): void {
    this.selectedItem = null;
    this.showActions = false;
  }

  clearSelection(): void {
    console.log(
      'Clearing selection. Previous selectedItems:',
      this.selectedItems
    );
    this.selectedItems = [];
    this.showActions = false;
    this.cd.detectChanges();
    console.log(
      'Selection cleared. Current selectedItems:',
      this.selectedItems
    );
  }

  isSelected(item: DocumentDTO): boolean {
    return this.selectedItems.some(
      (selectedItem) => selectedItem._id === item._id
    );
  }
  startSelection(event: MouseEvent): void {
    this.isSelecting = true;
    this.startSelectionPosition.x = event.clientX;
    this.startSelectionPosition.y = event.clientY;
    this.selectionBoxStyle = {
      left: `${this.startSelectionPosition.x}px`,
      top: `${this.startSelectionPosition.y}px`,
      width: '0px',
      height: '0px',
    };
    event.preventDefault();
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
      height: `${Math.abs(height)}px`,
    };
    this.cd.detectChanges();
  }

  endSelection(event: MouseEvent): void {
    if (!this.isSelecting) {
      console.log('Selection ended without starting');
      return;
    }
    const selectionBounds = {
      x1: this.startSelectionPosition.x,
      y1: this.startSelectionPosition.y,
      x2: event.clientX,
      y2: event.clientY,
    };

    const normalizedBounds = {
      x1: Math.min(selectionBounds.x1, selectionBounds.x2),
      y1: Math.min(selectionBounds.y1, selectionBounds.y2),
      x2: Math.max(selectionBounds.x1, selectionBounds.x2),
      y2: Math.max(selectionBounds.y1, selectionBounds.y2),
    };

    this.selectedItems = this.documents.filter((item) => {
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

    this.isSelecting = false;
    this.showActions = this.selectedItems.length > 0;
    this.selectionBoxStyle = {};
    this.cd.detectChanges();
  }

  handleItemMouseDown(event: MouseEvent, item: DocumentDTO): void {
    event.stopPropagation();

    const isSelected = this.isSelected(item);

    if (event.ctrlKey || event.metaKey) {
      if (isSelected) {
        this.selectedItems = this.selectedItems.filter(
          (selectedItem) => selectedItem._id !== item._id
        );
      } else {
        this.selectedItems = [...this.selectedItems, item];
      }
    } else {
      this.selectedItems = isSelected ? [] : [item];
    }

    this.showActions = this.selectedItems.length > 0;
    this.cd.detectChanges();
  }

  //method that gets triggered when user clicks on folder icon or double clicks folder 
  //(dblclick currently only works in list view)
  openFolder(document: DocumentDTO) {
    console.log('Attempting to open folder:', document._id);
    this.router.navigate(['/main/folders', document._id]);
  }
}
