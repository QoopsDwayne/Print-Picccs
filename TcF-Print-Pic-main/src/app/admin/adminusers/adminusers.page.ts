import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../../services/tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';

import { ModalController } from '@ionic/angular';
import { ImageModalPage } from './../../modals/image-modal/image-modal.page';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.page.html',
  styleUrls: ['./adminusers.page.scss'],
})
export class AdminusersPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  user = [];
  user2 = [];
  id2;

  // user
  username2;
  surnamez2;
  contact2;
  emails2;
  tcfcoin2;
  address2;
  userImage2;

  username;
  surnamez;
  contact;
  emails;
  tcfcoin;
  address;
  userImage;
  id;

  buttonDisabled: boolean;
  registerForm = false;
  yourBoolean = true; /*viewable by default*/
  ishidden = false;
  ActiveAcounts: boolean = false;

  constructor(
    public tcfpics: TcfpicsService,
    public Alert: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formGroup: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController,
    private modalController: ModalController,
  ) {
    this.getUser();
   }

  ngOnInit() {
  }

  getUser() {
    this.db.collection('users').onSnapshot(snapshot => {
      this.user = [];
      // console.log(snapshot)

      snapshot.forEach(snapshot => {
        this.username = snapshot.data().username;
        this.surnamez = snapshot.data().surnamez;
        this.contact = snapshot.data().contact;
        this.emails = snapshot.data().emails;
        this.tcfcoin = snapshot.data().tcfcoin;
        this.address = snapshot.data().address;
        this.userImage = snapshot.data().image;
        this.id = snapshot.id;

      // console.log(this.username);
      // console.log(this.surnamez);
      // console.log(this.contact);
      // console.log(this.emails);
      // console.log(this.tcfcoin);
      // console.log(this.address);

      this.user.push(snapshot.data());

      // console.log(this.user);
      })
      
    })
  }

  AddUser(id) {
    this.db.collection('users').doc(id).onSnapshot(snapshot => {
      this.user2 = [];
      // console.log(snapshot)

        this.username2 = snapshot.data().username;
        this.surnamez2 = snapshot.data().surnamez;
        this.contact2 = snapshot.data().contact;
        this.emails2 = snapshot.data().emails;
        this.tcfcoin2 = snapshot.data().tcfcoin;
        this.address2 = snapshot.data().address;
        this.userImage2 = snapshot.data().image;
        this.id2 = snapshot.id;

      console.log(this.username2);
      console.log(this.surnamez2);
      console.log(this.contact2);
      console.log(this.emails2);
      console.log(this.tcfcoin2);
      console.log(this.address2);

      this.user2.push(snapshot.data());

      // console.log(this.user);
      
    })
  }

  deleteuser(id) {
    this.db.collection('users').doc(id).delete().then(function(){
      console.log("Document successfully deleted")
    }).catch(function(error){
      console.error("Error removing document: ", error); 
    });
    console.log('user  deleted');
  }

  isUser: boolean = false;
  isProfile: boolean;

  showUser() {
    this.isUser = true;
    this.isProfile = true;
  }

  hideUser() {
    this.isUser = false
    this.isProfile = false;
  }

  showRegisterForm(){
    this.registerForm = !this.registerForm;
    this.isUser = true;
    this.isProfile = false;
  }

  openPreview(pic) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        pic: pic
      }
    }).then(modal => modal.present());
  }

}
