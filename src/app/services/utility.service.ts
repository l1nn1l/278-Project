import { Injectable } from '@angular/core';
import { DocumentDTO } from '../../assets/Models/DTO/DocumentDTO';

@Injectable({
  providedIn: 'root'
})

export class UtilityService {

  constructor() { }

  // Function to format dates relative to the current date
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

  /**
   * Sorts an array of objects by a specified date property in descending order.
   * @param items The array of items to sort.
   * @param dateProp The property of each item that contains the date string.
   * @returns The sorted array.
   */
  sortItemsByDateDesc(items: any[], dateProp: string): any[] {
    return items.sort((a, b) => {
      const dateA = new Date(a[dateProp]);
      const dateB = new Date(b[dateProp]);
      return dateB.getTime() - dateA.getTime(); // Sort in descending order
    });
  }

  /**
   * Determines if an item is selected.
   * @param item The item to check.
   * @param selectedItems The list of currently selected items.
   * @returns Boolean indicating if the item is selected.
   */
  isSelected(item: DocumentDTO, selectedItems: DocumentDTO[]): boolean {
    return selectedItems.some(selectedItem => selectedItem._id === item._id);
  }

  clearSelection(selectedItems: DocumentDTO[]): DocumentDTO[] {
    return [];
  }

  toggleActions(item: DocumentDTO, selectedItem: DocumentDTO | null, showActions: boolean): { selectedItem: DocumentDTO | null, showActions: boolean } {
    if (selectedItem === item) {
      return { selectedItem: null, showActions: false };
    } else {
      return { selectedItem: item, showActions: true };
    }
  }

  

}
