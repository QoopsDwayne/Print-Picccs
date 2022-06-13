import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../services/tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  uid;
  image;
  name;
  surname;
  email;
  contact;
  address;
  // userid = firebase.auth().currentUser.uid;
  // email = firebase.auth().currentUser.email;

  RegisterForm: FormGroup;
  password;
  confirmpassword;
  ErrorMessage;

  uploadingprogress = 0;

  // Password eye off
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    public tcfpics: TcfpicsService,
    public Alert: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formGroup: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController,
  ) {
    this.RegisterForm = formGroup.group({
      name : ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      surname : ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      email : ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-zA-Z-.]+\.[a-zA-Z]+$')]],
      contact : ['', [Validators.required]],
      // address : ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmpassword : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
   }

  ngOnInit() {
  }

  signup() {
    if (this.confirmpassword !== this.password) {
      this.ErrorMessage = 'The passwords you entered do not match.';
      this.presentAlert(this.ErrorMessage);
    } else if (this.image == '') {
      this.ErrorMessage = 'Please Upload Your Profile Pic.';
      this.presentAlert(this.ErrorMessage);
    } else {
      this.tcfpics.signup(
        this.email,
        this.password,
        this.name,
        this.surname,
        this.image,
        this.contact,
        // this.address,
        ).then(data => {
          if (data.operationType === 'signIn') { 
            this.router.navigate(['/tabs/home']);
            this.presentToast();
          } else {
            this.presentAlert(data);
          }
        });
      this.presentLoading();
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  changeListener(userprofiles): void {
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
          console.log(this.image);
          setTimeout(() => {
            this.uploadingprogress = 100;
          }, 1000)
        });
      });
  }

  getPhoneInput(ev: any) {
    this.contact = ev.target.value;

    // calling firebase
    // this.contact[0] == '0'
    if (this.contact[0] !== '0') {
      this.presentAlertPhoneValidation();
    } else {
      // this.showInputs()
      // console.log('im working');
      this.contact = this.contact;
    }
      // console.log(this.phoneVal);
      // console.log(this.contact);
  }

  async presentAlertPhoneValidation() {
    const alert = await this.Alert.create({
      header: 'Eish!',
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

  erasedToContact() {
    this.contact = '';
  }

  async presentAlert(data) {
    const alert = await this.Alert.create({
      header: 'Alert',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'New Account Created.',
      duration: 9000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
    });
    await loading.present();
    loading.dismiss();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  //  ionViewDidLeave() {
  //   // enable the root left menu when leaving the tutorial page
  //   this.menuCtrl.enable(true);
  // }

}
