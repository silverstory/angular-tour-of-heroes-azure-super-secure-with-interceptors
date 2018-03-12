import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { User } from './../auth/user';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscriber } from 'rxjs';
// import { Observable } from 'rxjs/Rx'; // will import the whle rxjs library. not recommended for small components

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // public user$ = new BehaviorSubject<User>({userName: '', password: ''}); // {1}
  public user$: Observable<User>;

  // return an observable example
  // get isLoggedIn() {
  //   this.loggedIn.next(tokenNotExpired('id_token'));
  //   return this.loggedIn.asObservable(); // {2}
  // }  

  constructor(
    public http: HttpClient,
    private authService: AuthService, // {4}
    private router: Router            // { NILAGAY NA DITO }    
  ) { }

  async ngOnInit() {
    try {
      this.user$ = await this.authService.getProfile();      
    } catch (error) {
      this.authService.log(error);
    }
  }

  async back() {
    await this.router.navigate(['/']);
  }

}