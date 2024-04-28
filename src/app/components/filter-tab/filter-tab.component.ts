import { Component } from '@angular/core';
import { SearchAndFilterService } from '../../services/search-and-filter.service';
import { SearchParams } from '../../../assets/Models/DTO/SearchParams';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-tab',
  standalone: true,
  imports: [],
  templateUrl: './filter-tab.component.html',
  styleUrl: './filter-tab.component.css',
  providers: [SearchAndFilterService]
})
export class FilterTabComponent {

  // constructor(private searchService: SearchAndFilterService){}

}
