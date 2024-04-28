import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyDriveComponent } from './components/my-drive/my-drive.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SharedwithmeComponent } from './components/sharedwithme/sharedwithme.component';
import { StarredComponent } from './components/starred/starred.component';
import { FolderContentComponent } from './components/folder-content/folder-content.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { TrashComponent } from './components/trash/trash.component';

export const routes: Routes = [
    {path: 'main', component: MainPageComponent, 
        children:[
            {path:'mydrive', component:MyDriveComponent},
            {path:'home', component:MainContentComponent},
            {path:'sharedwithme', component:SharedwithmeComponent},
            {path:'starred', component:StarredComponent},
            {path:'folders/:folderId', component:FolderContentComponent},
            {path: 'search', component: SearchResultsComponent},
            {path: 'trash', component: TrashComponent},

        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
