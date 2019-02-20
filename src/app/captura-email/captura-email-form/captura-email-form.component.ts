import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { HttpClient } from "@angular/common/http";
import { AlertService } from '../../services/alert.service';


@Component({
  selector: "app-captura-email-form",
  templateUrl: "./captura-email-form.component.html",
  styleUrls: ["./captura-email-form.component.scss"]
})
export class CapturaEmailFormComponent implements OnInit {
  tipo: string;
  // ip do usuário
  userIp = '';

  setUserIp(data) {
    this.userIp = data.ip;
  }

  constructor(
    public afs: AngularFirestore,
    private http: HttpClient,
    private alertService: AlertService) {

    this.http.get('https://jsonip.com/').subscribe(data => {
      this.setUserIp(data);
    });
  }

  ngOnInit() {
    this.tipo = 'B2C';
  }

  // formatar data
  addZeroBefore(n) {
    return (n < 10 ? '0' : '') + n;
  }

  getFullTime(time) {
    // tslint:disable-next-line:max-line-length
    return time.getFullYear() + '-' + this.addZeroBefore(time.getMonth() + 1) + '-' + this. addZeroBefore(time.getDate()) + ' ' + this.addZeroBefore(time.getHours()) + ':' + this.addZeroBefore(time.getMinutes()) + ':' + this.addZeroBefore(time.getSeconds());
  }

  // retorna a hora BRT (converte pra utc e converte de novo pra GMT-3, já que não é summertime)
  getBrtTime(data) {
    var novaDataUtc = new Date(data.getTime() + data.getTimezoneOffset() * 60000);
    return new Date(novaDataUtc.getTime() - 180 * 60000);
  }

  form_submit(f: NgForm) {
    // tslint:disable-next-line:prefer-const
    let userData = {
      nome: f.controls.nome.value,
      email: f.controls.email.value,
      tipo: f.controls.tipo.value,
      data_hora: this.getFullTime(this.getBrtTime(new Date())),
      ip: this.userIp
    };
    if (userData.nome !== '' && userData.email !== '') {
      this.afs
      .collection("leads")
      .add( userData )
      .then(() =>  {
        this.alertService.success('Sucesso', 'E-mail cadastrado com sucesso.');
      });

    f.controls.nome.setValue("");
    f.controls.email.setValue("");
    } else {
      this.alertService.error('Erro', 'Favor preencher os campos de nome e e-mail para se cadastrar');
    }
  }
}
