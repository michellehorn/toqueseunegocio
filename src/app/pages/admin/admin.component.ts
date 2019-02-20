import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Lead } from '../../core/models/lead';
import { Observable } from 'rxjs/observable';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  leadsCol: AngularFirestoreCollection<Lead>;
  listaDeLeads: Observable<Lead[]>;
  numberOfLeads: any;

  constructor(private afs: AngularFirestore,
  private appComp: AppComponent) { }

  ngOnInit() {
    this.appComp.ngOnInit();
    this.getLeadsNumber();
  }

  getLeadsNumber() {
    // mapear quantidade de leads
    this.leadsCol = this.afs.collection('leads');
    this.listaDeLeads = this.leadsCol.valueChanges();
    this.listaDeLeads.subscribe(result => {
      this.numberOfLeads = result.length;
    });
  }

}
