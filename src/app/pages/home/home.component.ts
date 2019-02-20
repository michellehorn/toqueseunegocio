import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventsComponent } from '../events/events.component';


export interface DialogData {
  email: string;
  nome: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;
  loggedIn: boolean;
  nome: string;
  email: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.loading = true;
    this.getUser();
  }


  getUser() {
    this.loggedIn = JSON.parse(localStorage.getItem('currentUser')) ? true : false;
    this.loading = false;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(EventsComponent, {
      height: '600px',
      data: {nome: this.nome, email: this.email}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
