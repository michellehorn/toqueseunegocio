import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../core/models/user';

@Injectable()
export class AuthService {
  loggedIn: boolean = JSON.parse(localStorage.getItem('currentUser')) ? true : false;
    constructor(private http: HttpClient, private router: Router) { }
    user = new User();
    login(username: string, password: string) {
                // login successful if there's a jwt token in the response
                if (username === 'kaizenistas' && password === 'k41z3n1st4s!@') {
                    this.loggedIn = true;
                    this.user.username = username;
                    this.user.password = password;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(this.user));
                }
                return this.user;
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedIn = false;
        this.router.navigate(['home']);
    }
}
