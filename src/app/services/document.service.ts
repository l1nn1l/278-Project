import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ApiResponse } from '../../assets/Models/DTO/ApiResponse'; 

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl: string = 'https://googledriveclonebackend.onrender.com';
  private getOwnedDocumentsUrl: string = '/document/owned/';
  private getSharedDocumentsUrl: string = '/document/shared/';
  private getDocSizeUrl:string='/document//size/';
  private putStar: string = '/document/';

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
  
    const urlWithId = `${this.baseUrl}${this.putStar}${id}`;
    const data = { starred: isStarred };
  
    return this.http.put(urlWithId, data, { headers }).pipe(
      catchError((error) => {
        console.error('Failed to update the document status:', error);
        return throwError(() => new Error('Failed to update document'));
      })
    );
  }
  

}
