import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../home/home.component';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertService } from '../../services/alert.service';


class User {
  nome: string;
  email: string;
  tipo: string;
  data_hora: string;
  ip: string;
}
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  user = new User();
  userIp: string;

  screenWd: number;
  mobile: boolean;

  setUserIp(data) {
    this.screenWd = window.screen.width;
    this.userIp = data.ip;
    if (this.screenWd < 500) {
      this.mobile = true;
    }
  }

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<EventsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.http.get('https://jsonip.com/').subscribe(data => {
      this.setUserIp(data);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


// formatar data
addZeroBefore(n) {
  return (n < 10 ? '0' : '') + n;
}

getFullTime(time) {
  // tslint:disable-next-line:max-line-length
  return time.getFullYear() + '-' + this.addZeroBefore(time.getMonth() + 1) + '-' + this. addZeroBefore(time.getDate()) + ' ' + this.addZeroBefore(time.getHours()) + ':' + this.addZeroBefore(time.getMinutes()) + ':' + this.addZeroBefore(time.getSeconds());
}

  sendData(data) {
    const userData = {
      nome: data.nome,
      email: data.email,
      tipo: 'B2C',
      data_hora: this.getFullTime(new Date()),
      ip: this.userIp
    };

    if (userData.nome !== '' && userData.email !== '') {
      this.afs
        .collection("leads")
        .add(userData)
        .then(() => {
          this.alertService.success('Sucesso', 'E-mail cadastrado com sucesso.');
        });
    }
  }
}
