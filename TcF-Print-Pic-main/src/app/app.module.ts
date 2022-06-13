import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import firebase from 'firebase';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { Storage } from '@ionic/storage';

// Page Modules
import { ImageModalPageModule } from './modals/image-modal/image-modal.module';
import { UploadpicPageModule } from './modals/uploadpic/uploadpic.module';
import { CheckoutPageModule } from './modals/checkout/checkout.module';
// import { SendcoinPageModule } from './modals/sendcoin/sendcoin.module';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCUxlPmmZ55tkLERSoTBhp9lPO5fSRDUgg",
    authDomain: "printpics-61db4.firebaseapp.com",
    projectId: "printpics-61db4",
    storageBucket: "printpics-61db4.appspot.com",
    messagingSenderId: "120821185292",
    appId: "1:120821185292:web:4881833839581911d2a729",
    measurementId: "G-8120SHWSTF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ImageModalPageModule,
    UploadpicPageModule,
    CheckoutPageModule,
    // SendcoinPageModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    // ArtCartModalPageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [
    Storage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
