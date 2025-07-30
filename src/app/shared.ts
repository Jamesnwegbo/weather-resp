import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Shared {
  baseUrlForecast = 'https://api.weatherapi.com/v1/forecast.json?key=';
  apiKeyForecast = '1df8ce96ab104b33913144051252407';
  flagsApiUrl = 'https://restcountries.com/v3.1/name/';
  firstName: any = localStorage.getItem('firstName');

  constructor(private http: HttpClient){}

  private firstNameOrigin = new BehaviorSubject<string>('');
  firstName$ = this.firstNameOrigin.asObservable();

  setFirstName(name: string) {
    this.firstNameOrigin.next(name);
    localStorage.setItem('firstName', name);
  }

  hasFirstName(): boolean{
    return !!this.firstName;
  }

  getWeather(city: string) {
    return this.http.get(`${this.baseUrlForecast}${this.apiKeyForecast}&q=${city}&days=7`);
  }

  getCountryFlag(country: string) {
    return this.http.get(`${this.flagsApiUrl}${country}`);
  }
  
}
