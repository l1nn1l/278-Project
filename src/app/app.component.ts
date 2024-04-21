import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from "./components/main-page/main-page.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    template: `
    <router-outlet></router-outlet>
  `,
    imports: [RouterModule, MainPageComponent]
})
export class AppComponent {
  title = '278proj';
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigation started to:', event.url); // TypeScript should know 'url' is a property of NavigationStart
      } else if (event instanceof NavigationEnd) {
        console.log('Navigation ended on:', event.url); // Similarly here for NavigationEnd
      } else if (event instanceof NavigationError) {
        console.log('Navigation error:', event.error); // And 'error' for NavigationError
      }
    });
  }
}
