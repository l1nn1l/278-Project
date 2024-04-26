import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ApiResponse } from '../../assets/Models/DTO/ApiResponse'; 

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private baseUrl: string = 'https://googledriveclonebackend.onrender.com';
  private getOwnedDocumentsUrl: string = '/document/owned/';
  private getSharedDocumentsUrl: string = '/document/shared/';
  private getDocSizeUrl:string='/document//size/';

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

  createFolder(title: string, ownerId: string, currentDirectoryId: string | null): Observable<any> {
    const folderData = {
      folderTitle: title,
      ownerId: ownerId,
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

}
