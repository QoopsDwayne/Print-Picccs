import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../../services/tcfpics.service';
import firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController, AlertController, MenuController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  storage = firebase.storage().ref();
  userprofile = [];
  newuserprofile = [];
  db = firebase.firestore();
  profiles;

  profile = {
  image: '',
  name: null,
  address: null,
  surname: null,
  number:null,

  userid: firebase.auth().currentUser.uid,
  email: firebase.auth().currentUser.email
  };

  uploadingprogress = 0;

  // progress bar
  progressbar: number;

  constructor(
    public tcfpics: TcfpicsService,
    private router: Router,
    public loadingController: LoadingController,
    private toastController: ToastController,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
  ) {
    this.db.collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
      this.profile.email = snapshot.data().email;
      email: firebase.auth().currentUser.email,
      this.profile.name = snapshot.data().username;
      this.profile.surname = snapshot.data().surnamez;
      this.profile.image = snapshot.data().image;
      this.profile.number = snapshot.data().contact;
      this.profile.address = snapshot.data().address;
      // console.log('users', this.profile.name);
      // console.log('users', this.profile.surname);
      // console.log('users', this.profile.number);
    });
   }

  ngOnInit() {
  }

  async users() {
    // console.log('profile',this.profile )
      if (this.profile.name == "" || this.profile.name == undefined) {
        const toast = await this.toastController.create({
          message: 'Enter the name.',
          duration: 2000
        });
        toast.present();
      } else if (this.profile.surname == "" || this.profile.surname == undefined) {
        const toast = await this.toastController.create({
          message: 'Enter the surname',
          duration: 2000
        });
        toast.present();
      } else if(this.profile.number == "" || this.profile.number == undefined || this.profile.number.length <10){
  const toast = await this.toastController.create({
    message:'Enter a cellphone number with 10 digits',
    duration: 2000
  });
  toast.present();
      }
       else {
      this.db.collection('users').doc(firebase.auth().currentUser.uid).update({
        name: this.profile.name,
        surname: this.profile.surname,
        // email: this.profile.email,
        number:this.profile.number,
        image: this.profile.image,
        userid: this.profile.userid,
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
      this.router.navigateByUrl('/home');
    }
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
          this.profile.image = dwnURL;
          setTimeout(() => {
            this.uploadingprogress = 100;
          }, 1000)
        });
      });
    }
  
    getPhoneInput(ev: any) {
      this.profile.number = ev.target.value;
  
      // calling firebase
      // this.contact[0] == '0'
      if (this.profile.number[0] !== '0') {
        this.presentAlertPhoneValidation();
      } else {
        // this.showInputs()
        console.log('im working');
        this.profile.number = this.profile.number;
      }
        // console.log(this.phoneVal);
        console.log(this.profile.number);
    }
  
    async presentAlertPhoneValidation() {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Phone Numbers must start with a number: 0.</strong>!!!',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.erasedToContact();
              console.log('Confirm Cancel: blah');
            }
          }
        ]
      });
      await alert.present();
    }
  
    async presentAlertPhoneMaxLenght() {
      const alert = await this.alertController.create({
        header: 'Confirm!',
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
        header: 'Confirm!',
        message: '<strong>Phone Numbers has less than 10 numbers.</strong>!!!',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.erasedToContact();
              console.log('Confirm Cancel: blah');
            }
          }
        ]
      });
      await alert.present();
    }
  
    erasedToContact() {
      this.profile.number = '';
    }

}
