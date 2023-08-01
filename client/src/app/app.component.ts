import { NgModule, Component, OnInit} from '@angular/core';
import { ApiService } from './api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class WeatherComponent implements OnInit {
  stateNameArray: any = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
    "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];
  showTable:boolean =  false;
  defaultSearch:boolean = true;
  stateName!: string;
  weatherData: any;
  stateDetails: any;
  latitude:any;
  longitude: any;
  displayCoordinateData: boolean = false;
  checkoutForm = this.formBuilder.group({
    longitude: '32.361538',
    latitude: '86.279118'
  });
  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.displayCoordinateData = true;
    this.getWeatherDetails(this.checkoutForm.value.latitude, this.checkoutForm.value.longitude ); 
  }
  onSubmit() {
    this.defaultSearch = false;
    this.stateName = '';
    this.latitude = this.checkoutForm.value.latitude;
    this.longitude = this.checkoutForm.value.longitude;
    this.getWeatherDetails(this.latitude, this.longitude ); 
    this.displayCoordinateData = true;
  }    
  getWeatherDetails(latitude: any, longitude: any) {
    console.log(`latitude, longitude: ${latitude}, ${longitude}`)
    this.apiService.getWeatherData(latitude, longitude).subscribe({
      next: (data: any) => {
        this.weatherData = data.current_weather;
        console.log(data);
        if(!this.defaultSearch){
          this.searchHistory();
        }
      },
      error: (error: any) => {
        console.log(error);
        console.error('Error fetching weather data:', error);
      }
    });
  }
  getDataBystateName() {
    console.log('Selected option:', this.stateName);
    this.displayCoordinateData = false;
    this.defaultSearch = false;
    this.apiService.getDataByCoordinates(this.stateName).subscribe({
      next: (stateData: any) => {
        console.log(stateData);
        this.stateDetails = stateData.data;
        this.getWeatherDetails(this.stateDetails.latitude, this.stateDetails.longitude ); 
      },
      error: (error: any) => {
        console.log(error);
        console.error('Error fetching location data:', error);
      }
    });
  }
  searchHistory(){
    var searchData = {
      state: this.stateName || '',
      current_weather: this.weatherData,
      latitude: this.stateDetails ? this.stateDetails.longitude : this.checkoutForm.value.longitude,
      longitude: this.stateDetails ? this.stateDetails.latitude : this.checkoutForm.value.latitude
    };
    this.apiService.insertSearchHistory(searchData).subscribe({
      next: (data: any) => {
        console.log('successfully inserted search data');
      },
      error: (error: any) => {
        console.log(error);
        console.error('Error while inserting search data:', error);
      }
    });
  }
  }