import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { MainPage } from './main-page/main-page';
import { firstNameGuard } from './guard/first-name-guard';

export const routes: Routes = [
    { path: '', redirectTo: '/personalise', pathMatch: 'full' },
    { path: 'personalise', component: LandingPage },
    { path: 'main', component: MainPage, canActivate: [firstNameGuard]}
];
