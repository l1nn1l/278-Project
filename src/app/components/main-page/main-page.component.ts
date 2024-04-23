import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { UploadButtonComponent } from '../upload-button/upload-button.component';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { routes } from '../../app.routes';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavbarComponent, MainContentComponent, SideBarComponent, UploadButtonComponent,RouterModule,RouterOutlet],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
