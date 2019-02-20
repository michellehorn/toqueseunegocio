import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapturaEmailFormComponent } from '../../captura-email/captura-email-form/captura-email-form.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';


@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  providers: [AngularFirestoreModule],
  exports: [CapturaEmailFormComponent],
  declarations: [CapturaEmailFormComponent]
})
export class CapturaEmailModule { }
