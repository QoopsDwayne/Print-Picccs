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
import { UploadpicPage } from './../../modals/uploadpic/uploadpic.page';

@Component({
  selector: 'app-profilez',
  templateUrl: './profilez.page.html',
  styleUrls: ['./profilez.page.scss'],
})
export class ProfilezPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();
  userID = firebase.auth().currentUser.uid;

  userPics = [];

  id;
  pic;
  comment;
  pidid;
  date;

  name;
  surname;

  feedncomment;
  feeddate;
  feedpic;
  feedid;

  page = 0;

  image;

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
    this.presentLoadingWithOptions();
    this.getUser();

    this.db.collection('pics').doc(firebase.auth().currentUser.uid).collection('clientpics').orderBy('date', "asc").onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.userPics = [];
        // console.log(element.data());

        snapshot.forEach(element => {
          // this.userPics = [];
          this.userPics.push(element.data());
          // console.log(this.userPics);

          this.id = element.data().id;
          this.comment = element.data().comment;
          this.pic = element.data().pic;
          this.pidid = element.data().pidid;
          this.date = element.data().date;
          // console.log(this.date);

        })
      })
    })
   }

  ngOnInit() {
  }

  getUser() {
    this.db.collection('users').doc(this.userID).onSnapshot(snap => {
      this.name = snap.data().username;
      this.surname = snap.data().surnamez;
      this.image = snap.data().image;
    })
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 5000,
      message: 'Loading Your Picccccs. Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed with role:', role);
  }

  async presentAlertSharePic(id) {
    const alert = await this.Alert.create({
      header: 'Note!',
      message: '<strong>Are you sure you want to Share this Pic to Feedwall</strong> ???',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yep',
          handler: () => {
            this.sharePic(id);
          }
        }
      ]
    });
    await alert.present();
  }

  async sharePic(id) {
    // console.log(id);
    // console.log('dude i can share'); 

    this.db.collection('pics').doc(this.userID).collection('clientpics').where("id", "==", id)
    .onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.feedncomment = element.data().comment;
        this.feeddate = element.data().date;
        this.feedpic = element.data().pic;
        this.feedid = element.data().pidid;

        // console.log(this.feedncomment);
        // console.log(this.feeddate);
        // console.log(this.feedpic);
        // console.log(this.feedid);

        this.addToFeed(id);
        // console.log('dude ive updated the Feedwall');
      });
    });
  }

  addToFeed(id) {
    this.db.collection('feedwall').add({
      pic: this.feedpic,
      id: id,
      comment: this.feedncomment,
      date: this.feeddate,
      pidid: this.feedid,
      name: this.name,
      surname: this.surname,
      image: this.image
    }).then(result => {
      this.presentPicUploadSuccess();
      this.db.collection('feedwall').doc(result.id).update({
        feedid: result.id
      })
    })
  }

  async presentPicUploadSuccess() {
    const alert = await this.Alert.create({
      header: 'Success',
      message: 'Your Pic was Shared to Feedwall',
      buttons: ['Ok']
    })
    await alert.present();
  }

  loadUsers(infiniteScroll?) {
    this.userPics = this.userPics.concat(this.userPics);
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
  }

  async presentAlertDeletePics(id) {
    const alert = await this.Alert.create({
      header: 'Warning!',
      message: '<strong>Are you sure you want to Delete this Pic</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.tcfpics.deletePics(id);
            this.ReloadPage();
          }
        }
      ]
    });
    await alert.present();
  }

  async ReloadPage() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrl.close().then(() => {
        this.router.navigateByUrl('/tabs/profilez').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }
 
  loadMore(event) {
    setTimeout(() => {
      // console.log('Timeout Done');
      event.target.complete();

      if (this.userPics.length === 1000) {
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

  uploadpic() {
    this.modalController.create({
      component: UploadpicPage,
      cssClass: 'my-custom-class'
    }).then(modal => modal.present());
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
   }

   ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(false);
  }

}
