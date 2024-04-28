import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../services/document.service';
import { DocumentDTO } from '../../../assets/Models/DTO/DocumentDTO';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { FilterTabComponent } from "../filter-tab/filter-tab.component";

@Component({
    selector: 'app-folder-content',
    standalone: true,
    templateUrl: './folder-content.component.html',
    styleUrl: './folder-content.component.css',
    encapsulation: ViewEncapsulation.None,
    providers: [
        DocumentService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    imports: [CommonModule, MatMenuModule, FilterTabComponent]
})
export class FolderContentComponent implements OnInit {
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
  folderName: string = '';


  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef, private documentService: DocumentService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      const folderId = params['folderId'];
      this.fetchFolderDetails(folderId);
    });
  }


  fetchFolderDetails(folderId: string) {
    this.isLoading = true;
    this.documentService.getFolderDetails(folderId).subscribe({
      next: (response) => {
        if (response && response.data && response.data.folder) {
          this.folderName = response.data.folder.title || '';
          this.documents = response.data.content || [];
        } else {
          console.error('Folder details not found in response:', response);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching folder details:', error);
        this.isLoading = false;
      }
    });
  }

  //method that gets triggered when user clicks on folder icon
  openFolder(document: DocumentDTO) {
    this.router.navigate(['/main/folders', document._id]);
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
    // console.log(
    //   'Clearing selection. Previous selectedItems:',
    //   this.selectedItems
    // );
    this.selectedItems = [];
    this.showActions = false;
    this.cd.detectChanges();
    // console.log(
    //   'Selection cleared. Current selectedItems:',
    //   this.selectedItems
    // );
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
      // console.log('Selection ended without starting');
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
  
}
