import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavbarComponent, MainContentComponent, SideBarComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
