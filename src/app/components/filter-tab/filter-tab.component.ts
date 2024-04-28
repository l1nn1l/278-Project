import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchAndFilterService } from '../../services/search-and-filter.service';
import { SearchParams } from '../../../assets/Models/DTO/SearchParams';
import { Subscription, debounceTime } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-filter-tab',
  standalone: true,
  imports: [DropdownModule, FormsModule, ReactiveFormsModule, HttpClientModule, AutoCompleteModule],
  templateUrl: './filter-tab.component.html',
  styleUrl: './filter-tab.component.css',
  providers: [SearchAndFilterService, UserService, AuthService]
})
export class FilterTabComponent implements OnInit {

  filterForm: FormGroup;
  userId = this.authService.getCurrentUserID();


  constructor(
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { 
    this.filterForm = this.formBuilder.group({
      type: [''],
      location: [''],
      filter: [''] // This will be used only for displaying user suggestions
    });
  }

  ngOnInit() {
    this.filterForm.get('type')?.valueChanges.subscribe(value => this.updateQueryParams());
    this.filterForm.get('location')?.valueChanges.subscribe(value => this.updateQueryParams());

    this.filterForm.get('filter')?.valueChanges.subscribe(filter => {
      // console.log("Filter value:", filter); 
      if (filter) {
        this.userService.searchUsers(filter, 'yourUserID').subscribe(users => {
          // console.log("Received from filter users API:", users); 
          this.filterPeople = users.map((user: { name: any; email: any; }) => ({
            label: user.name,
            value: user.email
          }));
          // console.log("Updated filterPeople:", this.filterPeople);
        }, error => console.error("Error fetching users:", error));
      }
    });
  }


  updateQueryParams(): void {
    const queryParams: { [key: string]: any } = {};
    const type = this.filterForm.get('type')?.value;
    const location = this.filterForm.get('location')?.value;
  
    if (type && typeof type === 'object' && 'value' in type) {
      queryParams['type'] = type.value !== 'any' ? type.value : undefined;
    } else {
      queryParams['type'] = type !== 'any' ? type : undefined;
    }
  
    if (location && typeof location === 'object' && 'value' in location) {
      queryParams['location'] = location.value !== 'any' ? location.value : undefined;
    } else {
      queryParams['location'] = location !== 'any' ? location : undefined;
    }
  
    // console.log("Attempting to navigate from filter tab with:", queryParams);
    this.router.navigate(['/main/search'], {
      queryParams: queryParams
    });
  }
  

  onUserSelect(event: any): void {
    // console.log("User selected:", event);
    const userEmail = event.value.value;
  
    if (userEmail) {
      this.router.navigate(['/main/search'], {
        queryParams: { owner: userEmail }
      });
    }
  }
  


  types = [
    { label: 'Any', value: 'any' },
    {
      label: 'PDF',
      value: 'application/pdf',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="pdf-logo" style="width: 16px; height: 16px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.778 0h12.444C15.2 0 16 .8 16 1.778v12.444C16 15.2 15.2 16 14.222 16H1.778C.8 16 0 15.2 0 14.222V1.778C0 .8.8 0 1.778 0zm2.666 7.556h-.888v-.89h.888v.89zm1.334 0c0 .737-.596 1.333-1.334 1.333h-.888v1.778H2.222V5.333h2.222c.738 0 1.334.596 1.334 1.334v.889zm6.666-.89h2.223V5.334H11.11v5.334h1.333V8.889h1.334V7.556h-1.334v-.89zm-2.222 2.667c0 .738-.595 1.334-1.333 1.334H6.667V5.333h2.222c.738 0 1.333.596 1.333 1.334v2.666zm-1.333 0H8V6.667h.889v2.666z"></path></svg>')
    },
    {
      label: 'Word',
      value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="word-logo" style="width: 16px; height: 16px;"><path d="M14.222 0H1.778C.8 0 0 .8 0 1.778v12.444C0 15.2.8 16 1.778 16h12.444C15.2 16 16 15.2 16 14.222V1.778C16 .8 15.2 0 14.222 0zm-3.11 12.444H9.777L8 5.778l-1.778 6.666H4.89L2.756 3.556h1.51l1.37 6.675 1.742-6.675h1.244l1.751 6.675 1.36-6.675h1.511l-2.133 8.888z"></path></svg>')
    },
    {
      label: 'Excel',
      value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="excel-logo" style="width: 16px; height: 16px;"><path d="M14.222 0H1.778C.796 0 0 .796 0 1.778v12.444C0 15.204.796 16 1.778 16h12.444c.982 0 1.778-.796 1.778-1.778V1.778C16 .796 15.204 0 14.222 0zm-2.489 12.444H9.956L8 9.067l-1.956 3.377H4.267L7.11 8 4.267 3.556h1.777L8 6.933l1.956-3.377h1.777L8.89 8l2.844 4.444z"></path></svg>')
    },
    {
      label: 'Image',
      value: 'image/png' || 'image/jpg',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="image-logo" style="width: 16px; height: 16px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 14.222V1.778C16 .796 15.204 0 14.222 0H1.778C.796 0 0 .796 0 1.778v12.444C0 15.204.796 16 1.778 16h12.444c.982 0 1.778-.796 1.778-1.778zM4.889 9.333l2.222 2.671L10.222 8l4 5.333H1.778l3.11-4z"></path></svg>')
    },
    {
      label: 'Video',
      value: 'video/quicktime' || 'video/mp4',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg" class="video-logo" style="width: 16px; height: 16px;"><path d="M12.8 0l1.6 3.2H12L10.4 0H8.8l1.6 3.2H8L6.4 0H4.8l1.6 3.2H4L2.4 0h-.8C.72 0 .008.72.008 1.6L0 11.2c0 .88.72 1.6 1.6 1.6h12.8c.88 0 1.6-.72 1.6-1.6V0h-3.2z"></path></svg>')
    },
    {
      label: 'Text File',
      value: 'text/plain',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg" class="txt-logo" style="width: 16px; height: 16px;"><path d="M8 0H1.6C.72 0 .008.72.008 1.6L0 14.4c0 .88.712 1.6 1.592 1.6H11.2c.88 0 1.6-.72 1.6-1.6V4.8L8 0zm1.6 12.8H3.2v-1.6h6.4v1.6zm0-3.2H3.2V8h6.4v1.6zm-2.4-4V1.2l4.4 4.4H7.2z"></path></svg>')
    },
    {
      label: 'Archives (zip)',
      value: 'application/zip' || 'application/rar'
    }
  ];

  filterPeople: any[] = [];

  driveLocations = [
    { label: 'Anywhere', value: 'anywhere' },
    { label: 'My Drive', value: 'my drive' },
    { label: 'Shared with me', value: 'shared with me' },
    { label: 'Starred', value: 'anywhere' },
    { label: 'Binned', value: 'binned' },
    { label: 'Starred', value: 'starred' },
  ]


  // filterForm = new FormGroup({
  //   type: new FormControl(''),
  //   filter: new FormControl(''), // Set default value as a string
  //   location: new FormControl(''), // Set default value as a string
  // });
}
