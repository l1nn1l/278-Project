import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyDriveComponent } from './components/my-drive/my-drive.component';
import { MainContentComponent } from './components/main-content/main-content.component';

export const routes: Routes = [
    {path: 'main', component: MainPageComponent,
        children:[
            {path:'mydrive', component:MyDriveComponent},
            {path:'home', component:MainContentComponent}

        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
