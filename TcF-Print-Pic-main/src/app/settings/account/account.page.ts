import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  userprofile = [];

  id = firebase.auth().currentUser.uid;

  profile = {
    image: '',
    username: null,
    surnamez: null,
    position: null,
    contact: null,
    gender: null,
    location: null,
    startsign: null,
    year: null,
    tcfID: null,
    tcfCoin: null,
    userid: firebase.auth().currentUser.uid,
    email: firebase.auth().currentUser.email
      };

      tcfID;
      tcfCoin;
  
  // progress bar
  progressbar: number;
  uploadingprogress = 0;

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private toastController: ToastController,
    public alertController: AlertController,
  ) {
    this.getuser();
    this.getWallete();
   }

  ngOnInit() {
  }

  getuser() {
    this.db.collection('users').doc(this.profile.userid).onSnapshot(snapshot => {
      // console.log(snapshot)

      this.profile.username = snapshot.data().username;
      this.profile.surnamez = snapshot.data().surnamez;
      this.profile.contact = snapshot.data().contact;
      this.profile.email = snapshot.data().emails;
      this.profile.image = snapshot.data().image;
      this.profile.position = snapshot.data().position;

      // console.log(this.profile.username);
      // console.log(this.profile.surnamez);
      // console.log(this.profile.contact);
      // console.log(this.profile.email);
      // console.log(this.profile.image);
      // console.log(this.profile.position);
      
    })
  }

  getWallete() {
    this.db.collection('tcfwallet').doc(this.profile.userid).onSnapshot(snapshot => {
      this.tcfID = snapshot.data().tcfid;
      this.tcfCoin = snapshot.data().tcfcoin;

      // console.log(this.profile.tcfID);
      // console.log(this.profile.tcfCoin);
    })
  }

  async users() {
    // console.log('profile',this.profile )
  
      if (this.profile.username == "" || this.profile.username == undefined) {
        const toast = await this.toastController.create({
          message: 'Enter the Name.',
          duration: 2000
        });
        toast.present();
      } else if (this.profile.surnamez == "" || this.profile.surnamez == undefined) {
        const toast = await this.toastController.create({
          message: 'Enter the Surname',
          duration: 2000
        });
        toast.present();
      } else if(this.profile.contact == "" || this.profile.contact == undefined || this.profile.contact.length <10){
        const toast = await this.toastController.create({
          message:'Enter a cellphone number with 10 digits',
          duration: 2000
        });
        toast.present();
      } else {
      this.db.collection('users').doc(firebase.auth().currentUser.uid).update({
        name: this.profile.username,
        surname: this.profile.surnamez,
        contact:this.profile.contact,
        image: this.profile.image,
      })
      .then(function() {
        // console.log("Document successfully written!");
      })
      .catch(function(error) {
        // console.error("Error writing document: ", error);
      });
    }
    }
  
    changeListener2(userprofiles): void {
      const i = userprofiles.target.files[0];
      // console.log(i);
      const upload = this.storage.child(i.name).put(i);
      upload.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('upload is: ', progress , '% done.');
        // progress bar count
        // console.log( progress );
        
        if (progress <= 90) {
          this.uploadingprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        } else {
          this.uploadingprogress = 90
        }
      }, err => {
      }, () => {
        upload.snapshot.ref.getDownloadURL().then(dwnURL => {
          // console.log('File avail at: ', dwnURL);
          this.profile.image = dwnURL;
          setTimeout(() => {
            this.uploadingprogress = 100;
          }, 1000)
        });
      });
    }
  
    getPhoneInput(ev: any) {
      this.profile.contact = ev.target.value;
  
      if (this.profile.contact[0] !== '0') {
        this.presentAlertPhoneValidation();
      } else {
        // console.log('im working');
        this.profile.contact = this.profile.contact;
      }
        // console.log(this.phoneVal);
        // console.log(this.profile.contact);
    }
  
    async presentAlertPhoneValidation() {
      const alert = await this.alertController.create({
        header: 'Eish!',
        message: '<strong>Phone Numbers must start with a number: 0.</strong>!!!',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.erasedToContact();
              // console.log('Confirm Cancel: blah');
            }
          }
        ]
      });
      await alert.present();
    }
  
    async presentAlertPhoneMaxLenght() {
      const alert = await this.alertController.create({
        header: 'Eish!',
        message: '<strong>Phone Numbers must have 10 numbers.</strong>!!!',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.erasedToContact();
              // console.log('im working');
            }
          }
        ]
      });
      await alert.present();
    }
  
    async presentAlertPhoneMinLenght() {
      const alert = await this.alertController.create({
        header: 'Eish!',
        message: '<strong>Phone Numbers has less than 10 numbers.</strong>!!!',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.erasedToContact();
              // console.log('Confirm Cancel: blah');
            }
          }
        ]
      });
      await alert.present();
    }
  
    erasedToContact() {
      this.profile.contact = '';
    }

  async goToSettings() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/settings').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

}
