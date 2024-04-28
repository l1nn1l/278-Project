import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ApiResponse } from '../../assets/Models/DTO/ApiResponse'; 
import { DocumentDTO } from '../../assets/Models/DTO/DocumentDTO';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private baseUrl: string = 'https://googledriveclonebackend.onrender.com';
  private getOwnedDocumentsUrl: string = '/document/owned/';
  private getSharedDocumentsUrl: string = '/document/shared/';
  private getDocSizeUrl:string='/document//size/';
  private update: string = '/document/';
  private getStarredDocumentUrl: string = '/document/starred/';
  private softDeleteDocumentUrl = '/document/delete/soft/'; 
  private getDeletedDocumentUrl: string = '/document/deleted/';
  private hardDeleteDocumentUrl = '/document/delete/hard/'; 

  constructor(private http: HttpClient) {}

  getOwnedDocuments(id: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('Access_Token')}`
    );
    console.log("This is the access token before sending APi call",localStorage.getItem('Access_Token'));
    // Use template literals to append the id to the getUserUrl
    const urlWithId = `${this.baseUrl}${this.getOwnedDocumentsUrl}${id}`;
    console.log("This is the URL were sending the API to ", urlWithId)
    return this.http.get<ApiResponse>(urlWithId, { headers: headers });
  }

  getSharedDocuments(id: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('Access_Token')}`
    );
    console.log("This is the access token before sending APi call",localStorage.getItem('Access_Token'));
    // Use template literals to append the id to the getUserUrl
    const urlWithId = `${this.baseUrl}${this.getSharedDocumentsUrl}${id}`;
    console.log("This is the URL were sending the API to ", urlWithId)
    return this.http.get<ApiResponse>(urlWithId, { headers: headers });
  }

  getDocSize(id: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('Access_Token')}`
    );
    console.log("This is the access token before sending APi call",localStorage.getItem('Access_Token'));
    // Use template literals to append the id to the getUserUrl
    const urlWithId = `${this.baseUrl}${this.getDocSizeUrl}${id}`;
    console.log("This is the URL were sending the API to ", urlWithId)
    return this.http.get<ApiResponse>(urlWithId, { headers: headers });
  }
  
  updateDocumentStarStatus(id: string, isStarred: boolean): Observable<any> {
    const accessToken = localStorage.getItem('Access_Token');
    if (!accessToken) {
      console.error('Access token is missing');
      return throwError(() => new Error('Authentication token is missing'));
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });
  
    const urlWithId = `${this.baseUrl}${this.update}${id}`;
    const data = { 
      starred: isStarred ,
      ownerId: localStorage.getItem('id')
    
    };
  
    return this.http.put(urlWithId, data, { headers }).pipe(
      catchError((error) => {
        console.error('Failed to update the document status:', error);
        return throwError(() => new Error('Failed to update document'));
      })
    );
  }

  updateDocumentName(id: string, newName: string): Observable<any> {
    const accessToken = localStorage.getItem('Access_Token');
    if (!accessToken) {
      console.error('Access token is missing');
      return throwError(() => new Error('Authentication token is missing'));
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });
  
    const urlWithId = `${this.baseUrl}${this.update}${id}`;
    const data = {
      docName: newName,
      ownerId: localStorage.getItem('id')
    };
  
    return this.http.put(urlWithId, data, { headers }).pipe(
      catchError((error) => {
        console.error('Failed to update the document name:', error);
        return throwError(() => new Error('Failed to update document name'));
      })
    );
  }
  
  
  getStarredDocuments(id: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('Access_Token')}`
    );
    console.log("This is the access token before sending APi call",localStorage.getItem('Access_Token'));
    // Use template literals to append the id to the getUserUrl
    const urlWithId = `${this.baseUrl}${this.getStarredDocumentUrl}${id}`;
    console.log("This is the URL were sending the API to ", urlWithId)
    return this.http.get<ApiResponse>(urlWithId, { headers: headers });
  }
  
  createFolder(title: string, ownerId: string, currentDirectoryId: string | null): Observable<any> {
    const folderData = {
      folderTitle: title,
      ownerId: ownerId,
      parentId: currentDirectoryId ? currentDirectoryId : "base",
      parentFolderId: currentDirectoryId ? currentDirectoryId : "base",
      type: 'folder'
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('Access_Token')}`
    });

    console.log("folder data", folderData)
    return this.http.post(`${this.baseUrl}/document/owned/folder`, folderData, { headers })
      .pipe(catchError(error => throwError(() => new Error('Failed to create folder: ' + error.message))));
  }


  getFolderDetails(folderId: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('Access_Token')}`
    });

    return this.http.get(`${this.baseUrl}/document/folder/${folderId}`, { headers })
      .pipe(catchError(error => throwError(() => new Error('Failed to fetch folder details: ' + error.message))));
  }


  getSearchResultDocuments(searchParams: any, userId: string): Observable<DocumentDTO[]> {
    let params = new HttpParams();
    Object.keys(searchParams).forEach(key => {
      const value = searchParams[key];
      if (value !== null && value !== undefined && value !== '') {
        params = params.append(key, value);
      }
    });

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('Access_Token')}`
    });
    const url = `${this.baseUrl}/document/search/${userId}`;

    return this.http.get<DocumentDTO[]>(url, { params, headers }).pipe(
      catchError(error => {
        console.error('Failed to retrieve search results:', error);
        return throwError(() => new Error('Failed to retrieve search results'));
      })
    );
  }

  softDeleteDocument(id: string): Observable<any> {
    const accessToken = localStorage.getItem('Access_Token');
    if (!accessToken) {
      console.error('Access token is missing');
      return throwError(() => new Error('Authentication token is missing'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });

    const urlWithId = `${this.baseUrl}${this.softDeleteDocumentUrl}${id}`;
    
    return this.http.delete(urlWithId, { headers }).pipe(
      catchError((error) => {
        console.error('Failed to delete the document:', error);
        return throwError(() => new Error('Failed to delete the document'));
      })
    );
  }

  hardDeleteDocument(id: string): Observable<any> {
    const accessToken = localStorage.getItem('Access_Token');
    if (!accessToken) {
      console.error('Access token is missing');
      return throwError(() => new Error('Authentication token is missing'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });

    const urlWithId = `${this.baseUrl}${this.hardDeleteDocumentUrl}${id}`;
    
    return this.http.delete(urlWithId, { headers }).pipe(
      catchError((error) => {
        console.error('Failed to delete the document:', error);
        return throwError(() => new Error('Failed to delete the document'));
      })
    );
  }

  getTrashDocuments(id: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('Access_Token')}`
    );
    console.log("This is the access token before sending APi call",localStorage.getItem('Access_Token'));
    // Use template literals to append the id to the getUserUrl
    const urlWithId = `${this.baseUrl}${this.getDeletedDocumentUrl}${id}`;
    console.log("This is the URL were sending the API to ", urlWithId)
    return this.http.get<ApiResponse>(urlWithId, { headers: headers });
  }
  
}
