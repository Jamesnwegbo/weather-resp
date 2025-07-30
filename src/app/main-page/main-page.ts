import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Shared } from '../shared';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage implements OnInit, OnDestroy {
  time: Date = new Date();
  private timer: any;
  firstName: string = '';
  searchForm: FormGroup;
  weatherData: any;
  flags: any;
  cityName: string = '';
  probData: any;

  constructor(
    private _shared: Shared,
    private _route: Router,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      city: [''],
    });
  }

  getWeatherByCity() {
    const city = this.searchForm.value.city;
    if (city) {
      this._shared.getWeather(city).subscribe({
        next: (data: any) => {
          this.weatherData = data;
          this.searchForm.patchValue({ city: '' });
          this.getFlags();
          console.log(this.weatherData);
          this.cityName = city;
          this.probData = this.weatherData?.forecast?.forecastday[0]?.day;
        },
        error: (err: any) => {
          alert(err.error?.error?.message || 'An error occurred');
          console.error(err);
          this.searchForm.patchValue({ city: '' });
        },
      });
    }
  }

  getFlags() {
    const country = this.weatherData?.location?.country;
    if (country) {
      this._shared.getCountryFlag(country).subscribe((data: any) => {
        this.flags = data[0]?.flags?.png;
      });
    }
  }

  ngOnInit() {

  //   if (window.innerWidth <= 480) {
  //   const link = document.createElement('link');
  //   link.rel = 'stylesheet';
  //   link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css';
  //   document.head.appendChild(link);
  // }

    const storedName = localStorage.getItem('firstName');
    if (storedName) {
      this._shared.setFirstName(storedName);
    }

    this._shared.firstName$.subscribe((name) => {
      this.firstName = name;
    });

    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.searchForm.patchValue({
      city: 'Abakaliki',
    });

    this.getWeatherByCity()

    // this.getGeoLocation()
    //   .then(({ lat, log }) => {
    //     this.searchForm.patchValue({
    //       city: `${lat},${log}`,
    //     });
    //     this.getWeatherByCity();
    //   })
    //   .catch(() => {
    //     this.getWeatherByCity();
    //   });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  exitApp() {
    localStorage.removeItem('firstName');
    this._shared.setFirstName('');
    this._route.navigateByUrl('/personalise');
  }

  greeting() {
    if (this.time.getHours() < 12) {
      return 'Good morning!';
    } else if (this.time.getHours() < 16) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  }

  // getGeoLocation() {
  //   return new Promise<{ lat: number; log: number }>((resolve, reject) => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           resolve({
  //             lat: position.coords.latitude,
  //             log: position.coords.longitude,
  //           });
  //         },
  //         () => {
  //           reject(null);
  //         }
  //       );
  //     }
  //   });
  // }
}
