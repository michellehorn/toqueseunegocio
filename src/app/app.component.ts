import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  loggedIn: boolean;

  ngOnInit() {
    this.loggedIn = JSON.parse(localStorage.getItem('currentUser')) ? true : false;
  }

}
