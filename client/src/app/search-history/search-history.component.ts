import { Component } from '@angular/core';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})

export class SearchHistoryComponent {
  dataSource: any[] = [];
  displayedColumns: string[] = [ 'Latitude', 'Longitude', 'State', 'Temperature', 'Wind Speed', 'Wind Direction', 'Date']; 

  constructor(private apiService: ApiService) {

    this.getSearchDetails(); 

  }
  getSearchDetails(){

    this.apiService.getSearchHistory().subscribe({
      next: (searchData: any) => {
        this.dataSource = searchData.data;
      },
      error: (error: any) => {
        console.log(error);
        console.error('Error while fetching search data:', error);
      }
    });

  }
}

