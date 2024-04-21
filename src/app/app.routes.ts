import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MyDriveComponent } from './components/my-drive/my-drive.component';
import { MainContentComponent } from './components/main-content/main-content.component';

export const routes: Routes = [
    {path: 'home', component: MainContentComponent},
    { path: 'My-Drive', component: MyDriveComponent},
    {path: 'Shared-w-me', component: MyDriveComponent}
];
