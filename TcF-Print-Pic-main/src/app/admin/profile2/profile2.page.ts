import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../../services/tcfpics.service';
import firebase from 'firebase';
import { LoadingController, AlertController, MenuController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.page.html',
  styleUrls: ['./profile2.page.scss'],
})
export class Profile2Page implements OnInit {

  buttonDisabled: boolean;

  userIDInfor;

  storage = firebase.storage().ref();
  userprofile = [];
  newuserprofile = [];
  db = firebase.firestore();
  profiles;

  ActiveAcount: boolean = false;
  profile = {
  image: '',
  username: null,
  surnamez: null,
  idNo: null,
  position: null,
  contact:null,
  cardNo: null,
  userid: firebase.auth().currentUser.uid,
  email: firebase.auth().currentUser.email
  };

  constructor(
    public tcfpics: TcfpicsService,
    private router: Router,
    private toastController: ToastController,
    private menuCtrl: MenuController,
    public alertController: AlertController,
  ) {
    this.menuCtrl.enable(false);
  
      this.getuser();
   }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {

      if (user) {
        firebase
           .firestore()
           .doc(`/users/${user.uid}`)
            .get()
            .then(userProfileSnapshot => {
              // this.isAdmin = userProfileSnapshot.data().isAdmin;
              this.userIDInfor = user.uid;
              console.log(this.userIDInfor);
            });
       }
       this.buttonDisabled = false;
     });

    this.menuCtrl.enable(true);
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

  async users() {
    console.log('profile',this.profile )
  
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
      } else if (this.profile.position == "" || this.profile.position == undefined) {
        const toast = await this.toastController.create({
          message: 'Enter the position',
          duration: 2000
        });
        toast.present();
      } else if(this.profile.contact == "" || this.profile.contact == undefined || this.profile.contact.length <10){
  const toast = await this.toastController.create({
    message:'Enter a cellphone number with 10 digits',
    duration: 2000
  });
  toast.present();
      }
       else {
      // this.db.collection('userprofiles').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot =>
      this.db.collection('users').doc(firebase.auth().currentUser.uid).update({
        username: this.profile.username,
        surnamez: this.profile.surnamez,
        email: this.profile.email,
        contact:this.profile.contact,
        position: this.profile.position,
        image: this.profile.image,
      })
      .then(function() {
        console.log("Document successfully written!");
        
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
      // this.router.navigate('/profile2');
      this.router.navigateByUrl('/profile2');
      this.closePopUp();
    }

    }
  
    changeListener(userprofiles): void {
      const i = userprofiles.target.files[0];
      console.log(i);
      const upload = this.storage.child(i.name).put(i);
      upload.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload is: ', progress , '% done.');
      }, err => {
      }, () => {
        upload.snapshot.ref.getDownloadURL().then(dwnURL => {
          console.log('File avail at: ', dwnURL);
          this.profile.image = dwnURL;
        });
      });
    }
  
    getPhoneInput(ev: any) {
      this.profile.contact = ev.target.value;
  
      // calling firebase
      // this.contact[0] == '0'
      if (this.profile.contact[0] !== '0') {
        this.presentAlertPhoneValidation();
      } else {
        // this.showInputs()
        console.log('im working');
        this.profile.contact = this.profile.contact;
      }
        // console.log(this.phoneVal);
        console.log(this.profile.contact);
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
      this.profile.contact = '';
    }
  

    // myBackButton(){
    //   this.location.back();
    //   // this.menuCtrl.enable(true);
    // }

    Logout() {
      firebase.auth().signOut().then((res) => {
        console.log(res);
        this.router.navigateByUrl('/login');
       });
      
      }

      formOpen: boolean = false;

      openPopUp(){
        this.formOpen = true
      }

      closePopUp(){
        this.formOpen = false
      }

}
