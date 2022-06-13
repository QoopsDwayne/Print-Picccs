import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../../services/tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { ModalController } from '@ionic/angular';
import { ImageModalPage } from './../../modals/image-modal/image-modal.page';

@Component({
  selector: 'app-feedwall',
  templateUrl: './feedwall.page.html',
  styleUrls: ['./feedwall.page.scss'],
})
export class FeedwallPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();
  userID = firebase.auth().currentUser.uid;

  feedwall = [];

  page = 0;

  dummy: any = [ "dummy1", "dummy2", "dummy3", "dummy4", "dummy5"];

  constructor(
    public tcfpics: TcfpicsService,
    public Alert: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formGroup: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController,
    private modalController: ModalController
  ) {
    this.db.collection('feedwall').onSnapshot(snapshot => {
      this.feedwall = [];
      snapshot.forEach(element => {
        this.feedwall.push(element.data())
      });
      console.log(this.feedwall);
    })
   }

  ngOnInit() {
  }

  loadMore(event) {
    setTimeout(() => {
      // console.log('Timeout Done');
      event.target.complete();

      if (this.feedwall.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  openPreview(pic) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        pic: pic
      }
    }).then(modal => modal.present());
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
   }

  //  ionViewDidLeave() {
  //   // enable the root left menu when leaving the tutorial page
  //   this.menuCtrl.enable(false);
  // }

}
