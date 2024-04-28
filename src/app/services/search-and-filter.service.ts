import { Injectable } from '@angular/core';
import { SearchParams } from '../../assets/Models/DTO/SearchParams';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DocumentDTO } from '../../assets/Models/DTO/DocumentDTO';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchAndFilterService {
  private baseUrl: string = 'https://googledriveclonebackend.onrender.com/document/search/';

  private searchResults = new BehaviorSubject<DocumentDTO[]>([]);
  public currentSearchResults = this.searchResults.asObservable();

  constructor(private http: HttpClient) { }

  performSearch(searchParams: SearchParams, userId: string): Observable<any> {
    let params = new HttpParams();
    Object.keys(searchParams).forEach(key => {
      const value = searchParams[key as keyof SearchParams];
      if (value !== null && value !== undefined) {
        // Adjust for handling objects and non-object values correctly
        const paramValue = typeof value === 'object' && value !== null && 'value' in value ? value['value'] : value.toString();
        params = params.append(key, paramValue);
      }
    });

    const searchUrl = `${this.baseUrl}${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('Access_Token')}`
    });

    return this.http.get<{status: number, message: string, data: DocumentDTO[]}>(searchUrl, { headers, params }).pipe(
      tap(response => {
        console.log('Received from API:', response);
        if (response && response.data) {
          this.saveSearchResults(response.data); // Save and emit the results
        } else {
          this.searchResults.next([]); // Emit an empty array if no data is found
        }
      }),
      catchError(error => {
        console.error('Search failed:', error);
        this.searchResults.next([]); // Emit an empty array on error
        return throwError(() => new Error('Search failed due to server error'));
      })
    );
  }

  private saveSearchResults(data: DocumentDTO[]): void {
    localStorage.setItem('searchResults', JSON.stringify(data));
    this.searchResults.next(data);
  }
}
