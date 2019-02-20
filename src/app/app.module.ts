import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './base/header/header.component';
import { FooterComponent } from './base/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PostsComponent } from './pages/posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailPostComponent } from './pages/posts/detail-post/detail-post.component';
import { Data } from './core/models/data';
import { CarroselAtrativosComponent } from './components/carrosel-atrativos/carrosel-atrativos.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertService } from './services/alert.service';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { FirebaseConfig } from './../environments/firebase.config';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CapturaEmailModule } from '../app/core/modules/captura-email.module';
import { PostsService } from './services/posts.service';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthService } from './services/auth.service';
import { EventsComponent } from './pages/events/events.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PostsComponent,
    DetailPostComponent,
    CarroselAtrativosComponent,
    AdminComponent,
    EventsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CapturaEmailModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NoopAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    PostsService,
    Data,
    AlertService,
    AuthGuard,
    AuthService,
    AngularFirestoreModule
  ],
  entryComponents: [HomeComponent, EventsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
