import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dropdownOpen = false;
  username: string;
  password: string;
  loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loggedIn = JSON.parse(localStorage.getItem('currentUser')) ? true : false;
  }

  goToMail() {
    $('html, body').animate({
      scrollTop: $('#form-lead-container').offset().top
    });
  }

  login() {
    const aux = this.authService.login(this.username, this.password);
    if (aux.username !== '') {
      this.router.navigate(['admin']);
      this.loggedIn = true;
      window.location.reload(true);
    } else {
      this.alertService.error('Erro', 'Usuário e/ou senha incorreto(s).');
      this.loggedIn = false;
      window.location.reload(true);
    }
  }
  logoff() {
    this.authService.logout();
    this.loggedIn = false;
    this.router.navigate(['home']);
    window.location.reload(true);
  }
}
