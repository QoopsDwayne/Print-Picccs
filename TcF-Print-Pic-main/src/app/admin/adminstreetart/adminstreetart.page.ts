import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../../services/tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';

import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../../modals/image-modal/image-modal.page';

@Component({
  selector: 'app-adminstreetart',
  templateUrl: './adminstreetart.page.html',
  styleUrls: ['./adminstreetart.page.scss'],
})
export class AdminstreetartPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  artArray = [];

  artImage;
  artName;
  artSize;
  artPrice;
  artid;

  artImage2;
  artName2;
  artSize2;
  artPrice2;
  artid2;

  // inputs
  image;
  name;
  size;
  price;

  resultID;

  // progress bar
  progressbar: number;
  uploadingprogress = 0;

  buttonDisabled: boolean;
  registerForm = false;
  yourBoolean = true; /*viewable by default*/
  ishidden = false;
  ActiveAcounts: boolean = false;

  public signupForm: FormGroup;

  constructor(
    public tcfpics: TcfpicsService,
    public Alert: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController,
    private modalController: ModalController,
  ) {
    this.getArt();
   }

  ngOnInit() {
  }

  saveNewArt() {
    this.db.collection('art').add({
      artname: this.name,
      artsize: this.size,
      artprice: this.price,
      artimage: this.image
    }).then(result => {
      this.resultID = result.id
      // console.log(resultID);
      this.db.collection('art').doc(result.id).update({
        artid: this.resultID,
      })
      this.router.navigateByUrl('/adminstreetart');
      console.log('New Art Added');
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
      // ...resetepassword
    });
  }

  getArt() {
    this.db.collection('art').onSnapshot(snapshot => {
      this.artArray = [];
      // console.log(snapshot)

      snapshot.forEach(snapshot => {
        this.artImage = snapshot.data().artimage;
        this.artName = snapshot.data().artname;
        this.artSize = snapshot.data().artsize;
        this.artPrice = snapshot.data().artprice;
        this.artid = snapshot.data().artprice;

      console.log(this.artImage);
      console.log(this.artName);
      console.log(this.artSize);
      console.log(this.artPrice);
      console.log(this.artid);

      // {data: snapshot.data(), artid : snapshot.id}

      this.artArray.push(snapshot.data());

      console.log(this.artArray);
      })
      
    })
  }

  AddUser(id) {
    this.db.collection('art').doc(id).onSnapshot(snapshot => {
      // console.log(snapshot)

        this.artImage2 = snapshot.data().artimage;
        this.artName2 = snapshot.data().artname;
        this.artSize2 = snapshot.data().artsize;
        this.artPrice2 = snapshot.data().artprice;
        this.artid2 = snapshot.id;

      console.log(this.artImage2);
      console.log(this.artName2);
      console.log(this.artSize2);
      console.log(this.artPrice2);
      console.log(this.artid2);
      
    })
  }

  async presentAlertDelete(id) {
    const alert = await this.Alert.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to Delete this record, Data will not be saved.</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteuser(id);
            this.router.navigateByUrl('/adminstreetart');
          }
        }
      ]
    });
    await alert.present();
  }

  deleteuser(id) {
    this.db.collection('art').doc(id).delete().then(function(){
      console.log("Document successfully deleted")
    }).catch(function(error){
      console.error("Error removing document: ", error); 
    });
    console.log('Art deleted');
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
        this.image = dwnURL;
        setTimeout(() => {
          this.uploadingprogress = 100;
        }, 1000)
      });
    });
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
