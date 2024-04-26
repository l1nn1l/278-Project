import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DocumentService } from '../../services/document.service';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  providers: [
    DocumentService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class SideBarComponent {
  constructor(private router: Router, private documentService:DocumentService) {}

  storage: number = 0;
  storageToDisplay:string='';
  meter:number=0;

  ngOnInit(){
    this.getTotalSize();
  }
  goToMyDrive() {
    this.router.navigate(['/main/mydrive']);
  }

  goToHome() {
    this.router.navigate(['/main/home']);
  }

  goToSharedWithMe() {
    this.router.navigate(['/main/sharedwithme']);
  }

  goToStarred() {
    this.router.navigate(['/main/starred']);
  }


  getTotalSize() {
    // this.isLoading = true;
    this.documentService.getDocSize(localStorage.getItem('id')).subscribe(
      (response) => {
        this.storage=response.totalSizeMB/1000;
        this.meter=this.storage
        console.log(this.storage)
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
