import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

constructor(private router:Router){}

  


goToMyDrive(){
  this.router.navigate(['/main/mydrive']);
  }

  goToHome(){
    this.router.navigate(['/main/home']);
    }

}
