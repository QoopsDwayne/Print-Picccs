import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../services/tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ProfilePage } from './../pages/profile/profile.page';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  db = firebase.firestore();

  email;
  password;

  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    public tcfpics: TcfpicsService,
    public Alert: AlertController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    private router: Router,
    public menuCtrl: MenuController,
    // private authService: AuthService,
    public modalController: ModalController,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
   }

  ngOnInit() {
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: ResetPasswordPage
  //   });
  //   return await modal.present();
  // }

  resetPassword() {
    this.router.navigate(['reset-password']);
  }
  
 //modal for profile page
 async presentProfileModal() {
  const modal = await this.modalController.create({
    component: ProfilePage,
    cssClass: 'profileModal'
  });
  return await modal.present();
}

async loginUser(loginForm: FormGroup): Promise<void> {
  if (!loginForm.valid) {
    console.log('Form is not valid yet, current value:', loginForm.value);
  } else {
    let loading = await this.loadingCtrl.create();
    await loading.present();
    setTimeout(() => {
      loading.dismiss();
    },
  4000);

    const email = loginForm.value.email;
    const password = loginForm.value.password;
    this.tcfpics.login(email, password).then(
      (user) => {
        firebase.auth().onAuthStateChanged(user => {
          if (user.uid) {
            this.db.collection('users').where('userid', '==', user.uid).get().then(res => {
              if (res.empty) {
                // this.loading.dismiss();
                // this.router.navigate(['home']);
              } else {
                this.db.collection('users').doc(user.uid).onSnapshot(element => {
                  if (element.data().position == "client") {
                    this.router.navigate(['tabs/home']);
                    console.log('client selected');
                  } else if (element.data().position == "admin") {
                    this.router.navigate(['/adminhome']);
                    console.log('admin selected');
                  }
                })
              }
            });
          }
        });
      },
          async (error) => {
            const alert = await this.Alert.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
          }
        );

      }
      this.loginForm.reset()
    }

    async resetepassword() {
      let alert = await this.Alert.create({
        header: 'Reset Password!',
        inputs: [{
          name: 'Email',
          type: 'email',
          placeholder: 'Please enter Your Email'
        }],
        buttons: [{
          text: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'send',
          handler: (email) => {
            console.log('email sent');
            this.tcfpics.resetepassword(email);
            this.ReseteMSG();
          }
        }]
      });
      await alert.present();
    }

    async ReseteMSG() {
      const alert = await this.Alert.create({
        header: 'Alert',
        subHeader: 'Resete Successful',
        message: 'Resete Link setup has been sent to your Email Account. Please check your Email inbox .',
        buttons: ['OK']
      });
      await alert.present();
    }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
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
