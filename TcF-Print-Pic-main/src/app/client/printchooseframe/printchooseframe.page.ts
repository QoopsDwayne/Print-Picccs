import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-printchooseframe',
  templateUrl: './printchooseframe.page.html',
  styleUrls: ['./printchooseframe.page.scss'],
})
export class PrintchooseframePage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  frameArray = [];
  frameArrayNo;

  id;

  frameImage;
  frameName;
  frameSize;
  framePrice;
  frameid;

  page = 0;

  constructor(
    public tcfpics: TcfpicsService,
    public Alert: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formGroup: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController,
    private modalCTRL: ModalController
  ) {
    this.db.collection('frames').onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.frameArray = [];
        // console.log(element.data());

        snapshot.forEach(element => {
          this.frameArray.push(element.data());
          this.frameArrayNo = this.frameArray.length;
          // console.log(this.frameArray);

          this.frameImage = element.data().frameimage;
          this.frameName = element.data().framename;
          this.frameSize = element.data().framesize;
          this.framePrice = element.data().frameprice;
          this.frameid = element.data().frameid;
        })
      })
    })
   }

  ngOnInit() {
  }

  loadMore(event?) {
    setTimeout(() => {
      // console.log('Timeout Done');
      event.target.complete();

      if (this.frameArray.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
