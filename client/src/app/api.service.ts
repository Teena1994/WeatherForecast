import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/weather';

  constructor(private http: HttpClient) {}

  getDataByCoordinates(stateName: string) {
    return this.http.get(`${this.apiUrl}/location/${stateName}`);
  }
  
  getWeatherData(latitude: any, longitude: any) {
    return this.http.get(`${this.apiUrl}/${latitude}/${longitude}`);
  }

  insertSearchHistory(searchData:any){

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl}/insert/searchHistory`, searchData, { headers })
  }

  getSearchHistory(){
    return this.http.get(`${this.apiUrl}/searchHistory`);
  }

}
