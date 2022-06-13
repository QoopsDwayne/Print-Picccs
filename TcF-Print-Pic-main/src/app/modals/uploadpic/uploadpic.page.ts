import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TcfpicsService } from 'src/app/services/tcfpics.service';

@Component({
  selector: 'app-uploadpic',
  templateUrl: './uploadpic.page.html',
  styleUrls: ['./uploadpic.page.scss'],
})
export class UploadpicPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  progress = 0;

  pidid;
  name;
  comment;
  pic;
  date = moment().format('llll');
  likes;

  uploadingprogress = 0;

  RegisterForm: FormGroup;

  dummy: any = [ "dummy1", "dummy2", "dummy3", "dummy4", "dummy5"];

  // progress bar
  progressbar: number;

  constructor(
    public tcfpics: TcfpicsService,
    private modalController: ModalController,
    public formGroup: FormBuilder,

    public Alert: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    public menuCtrl: MenuController,
  ) {
    this.RegisterForm = formGroup.group({
      name : ['', [Validators.required]],
    });
   }

  ngOnInit() {
  }

  upload() {
    this.tcfpics.uploadpic(
      this.pic,
      this.name,
      )
      this.dismiss();
  }

  changeListener2(userprofiles): void {
    const i = userprofiles.target.files[0];
      console.log(i);
      const upload = this.storage.child(i.name).put(i);
      upload.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload is: ', progress , '% done.');
        // progress bar count
        console.log( progress );
        
        if (progress <= 90) {
          this.uploadingprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        } else {
          this.uploadingprogress = 90
        }
      }, err => {
      }, () => {
        upload.snapshot.ref.getDownloadURL().then(dwnURL => {
          console.log('File avail at: ', dwnURL);
          this.pic = dwnURL;
          setTimeout(() => {
            this.uploadingprogress = 100;
          }, 1000)
        });
      });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

}
