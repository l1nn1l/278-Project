import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainPageComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService]
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.autoLogin()) {
      this.router.navigate(['/main/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}