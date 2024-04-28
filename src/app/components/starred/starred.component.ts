
import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DocumentService } from '../../services/document.service';
import { DocumentDTO } from '../../../assets/Models/DTO/DocumentDTO';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { catchError, forkJoin, of } from 'rxjs';


@Component({
  selector: 'app-starred',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: './starred.component.html',
  styleUrl: './starred.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [
    DocumentService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class StarredComponent {
  showActions: boolean = false;
  selectedItem: DocumentDTO | null = null;
  isGridView: boolean = true;
  contentType: 'files' | 'folders' = 'files';
  selectedItems: DocumentDTO[] = [];
  isSelecting: boolean = false;
  selectionBoxStyle = {};
  startSelectionPosition = { x: 0, y: 0 };
  isLoading: boolean = true;

  documents: DocumentDTO[] = [];
  owner = localStorage.getItem('User_Email');

  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef, private documentService: DocumentService, private router: Router) { }

  ngOnInit() {
    this.getStarredDocuments();
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


  moveToTrash(id: string): void {
    this.documentService.softDeleteDocument(id).pipe(
      catchError((error: any) => {
        return of(null);  
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          this.documents = this.documents.filter(doc => doc._id !== id);
          this.cd.detectChanges();
        }
      },
      error: (error) => {
        console.error(`Error occurred when trying to move the document to trash:`, error);
      }
    });
  }


  viewDetails(item: any) {
    // View details logic
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
      height: `${Math.abs(height)}px`
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
      y2: event.clientY
    };

    const normalizedBounds = {
      x1: Math.min(selectionBounds.x1, selectionBounds.x2),
      y1: Math.min(selectionBounds.y1, selectionBounds.y2),
      x2: Math.max(selectionBounds.x1, selectionBounds.x2),
      y2: Math.max(selectionBounds.y1, selectionBounds.y2)
    };

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

    this.isSelecting = false;
    this.showActions = this.selectedItems.length > 0;
    this.selectionBoxStyle = {};
    this.cd.detectChanges();
    console.log('Selected items:', this.selectedItems.map(item => item._id));
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

  get displayedItems(): DocumentDTO[] {
    return this.documents;
  }

  getFolders() {
    return this.displayedItems.filter((item) => item.type === 'folder');
  }

  getFiles() {
    return this.displayedItems.filter((item) => item.type !== 'folder');
  }
  getStarredDocuments() {
    this.isLoading = true;
    this.documentService.getStarredDocuments(localStorage.getItem('id')).subscribe({
      next: (response) => {
        this.documents = response.data.filter((doc: DocumentDTO) => doc.starred);
        this.isLoading = false;
        console.log('These are the Shared Documents from the database', this.documents);
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
        if (error.status === 401) {
          console.log('Authentication Token Expired, Redirecting to Login Page');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  //method that gets triggered when user clicks on folder icon or double clicks folder 
  //(dblclick currently only works in list view)
  openFolder(document: DocumentDTO) {
    console.log('Attempting to open folder:', document._id);
    this.router.navigate(['/main/folders', document._id]);
  }

  openRenameDialog(document: DocumentDTO): void {
    console.log('openRenameDialog called with document:', document);

    const dialogRef = this.dialog.open(RenameDialogComponent, {
      data: { documentId: document._id }
    });

    console.log('Dialog opened');

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedDocumentIndex = this.documents.findIndex(doc => doc._id === document._id);
        if (updatedDocumentIndex !== -1) {
          this.documents[updatedDocumentIndex].title = result;
          this.cd.markForCheck();
        }
      }
    });
  }

  deleteSelectedDocuments(): void {
    console.log('Starting deletion of selected documents:', this.selectedItems.map(item => item._id));
    
    const deletionRequests = this.selectedItems.map((item: DocumentDTO) =>
      this.documentService.softDeleteDocument(item._id).pipe(
        catchError((error: any) => {
          console.error(`Failed to delete document with ID ${item._id}:`, error);
          return of(null); 
        })
      )
    );
  
    forkJoin(deletionRequests).subscribe((results: any[]) => {
      console.log('Deletion results:', results);
  
      results.forEach((result, index: number) => {
        if (result !== null) {
          const itemId = this.selectedItems[index]._id;
          console.log(`Document with ID ${itemId} deleted successfully`, result);
        } else {
          console.log(`Failed to delete document with ID ${this.selectedItems[index]._id}`);
        }
      });
  
      // Update documents after deletion
      const remainingDocs = this.documents.filter(doc => !this.selectedItems.some(item => item._id === doc._id));
      console.log('Documents remaining after deletion:', remainingDocs.map(doc => doc._id));
  
      this.documents = remainingDocs;
      this.clearSelection();
      this.cd.detectChanges();
    });
  }
}
