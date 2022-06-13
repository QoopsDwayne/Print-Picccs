import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../../services/tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';

import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../../modals/image-modal/image-modal.page';

@Component({
  selector: 'app-adminsframes',
  templateUrl: './adminsframes.page.html',
  styleUrls: ['./adminsframes.page.scss'],
})
export class AdminsframesPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  frameArray = [];

  id;

  frameImage;
  frameName;
  frameSize;
  framePrice;
  frameid;

  frameImage2;
  frameName2;
  frameSize2;
  framePrice2;
  frameid2;

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
    public activatedRoute: ActivatedRoute,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    // this.signupForm = this.formBuilder.group({
    //   name: ['', [Validators.required]],
    //   size: ['', [Validators.required]],
    //   price: ['', [Validators.required, ]],
    // });

    this.getFrames();
   }

  ngOnInit() {
  }

  saveNewArt() {
    this.db.collection('frames').add({
      framename: this.name,
      framesize: this.size,
      frameprice: this.price,
      frameimage: this.image
    }).then(result => {
      this.resultID = result.id
      // console.log(resultID);
      this.db.collection('frames').doc(result.id).update({
        frameid: this.resultID,
      })
      this.router.navigateByUrl('/adminsframes');
      console.log('New Art Added');
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
      // ...resetepassword
    });
  }

  getFrames() {
    this.db.collection('frames').onSnapshot(snapshot => {
      this.frameArray = [];
      // console.log(snapshot)

      snapshot.forEach(snapshot => {
        this.frameImage = snapshot.data().frameimage;
        this.frameName = snapshot.data().framename;
        this.frameSize = snapshot.data().framesize;
        this.framePrice = snapshot.data().frameprice;
        this.frameid = snapshot.data().frameid;

      // console.log(this.frameImage);
      // console.log(this.frameName);
      // console.log(this.frameSize);
      // console.log(this.framePrice);
      // console.log(this.frameid);

      this.frameArray.push(snapshot.data());

      console.log(this.frameArray);
      })
      
    })
  }

  AddUser(id) {
    this.db.collection('frames').doc(id).onSnapshot(snapshot => {
      // console.log(snapshot)

        this.frameImage2 = snapshot.data().frameimage;
        this.frameName2 = snapshot.data().framename;
        this.frameSize2 = snapshot.data().framesize;
        this.framePrice2 = snapshot.data().frameprice;
        this.frameid2 = snapshot.data().frameid;

      // console.log(this.frameImage2);
      // console.log(this.frameName2);
      // console.log(this.frameSize2);
      // console.log(this.framePrice2);
      // console.log(this.frameid2);
      
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
