import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Shared } from '../shared';

@Component({
  selector: 'app-landing-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {

  nameForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private _shared: Shared) {
    this.nameForm = this.fb.group({
      name: ['']
    });
  }

  onSubmit() {
    const firstName = this.nameForm.value.name;
    if (firstName && firstName.length >= 3) {
      localStorage.setItem('firstName', firstName);
      this.route.navigateByUrl('main');
    } else if (firstName === '') {
      alert('Please enter your first name.');
      console.error('First name is required.');
    }
  }

  setName(){
    const firstName = this.nameForm.value.name;
    this._shared.setFirstName(firstName);
  }

}
