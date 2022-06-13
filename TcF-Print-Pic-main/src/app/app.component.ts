import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import firebase from 'firebase';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ThemeService } from './services/theme.service';
import { Platform, MenuController, LoadingController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { DarkMode } from 'capacitor-dark-mode';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  db = firebase.firestore();

  UserClient = [];
  userdata = [];

  position;

  // darkMode: boolean;

  // user infor
  name;
  surname;
  contact;
  email;
  image;

  hasVerifiedEmail = true;

  userProfile = [];

  public selectedIndex = 0;
  public appPages = [];

  // public appPages = [
  //   { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
  //   { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
  //   { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
  //   { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
  //   { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //   { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  // ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private themeservice: ThemeService,
    private ref: ChangeDetectorRef
  ) {
    this.getAuth();
  }

  ngOnInit() {
    this.callSideMenuSettings();
  }

  toggleDarkTheme() {
    this.themeservice.toggleAppTheme();

    // Plugins.DarkMode.addListener('darkModeStateChanged', (state: any) => {
    //   if(state.isDarkModeOn)
    //   {
    //   // Dark mode is on. Apply dark theme to your app
    //   this.darkMode = true
    //   this.ref.detectChanges()
    //   }
    //   else
    //   {
    //   // Dark mode is off. Apply light theme to your app
    //   this.darkMode = false
    //   this.ref.detectChanges()
      
    //   }
    //   if(state.supported == false)
    //   {
    //   // Dark mode is not supported by the platform
    //   console.log('dark mode is not supported')
    //   }
    //   });
  }

  callSideMenuSettings() {
    console.log('triggerd');

    firebase.auth().onAuthStateChanged(user => {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {

        this.position = snapshot.data().position;

        if (this.position == "admin") {
          this.appPages = [];
          this.appPages.push(
            {
              title: 'Orders',
              url: '/adminhome',
              icon: 'mail-unread-outline'
            },
            {
              title: 'Frame Orders',
              url: '/adminhomeframe',
              icon: 'images-outline'
            },
            {
              title: 'Art Orders',
              url: '/adminhomeart',
              icon: 'paper-plane'
            },
            {
              title: 'Printed Orders',
              url: '/adminprinted',
              icon: 'mail-open-outline'
            },
            {
              title: 'Sent Orders',
              url: '/adminsentpics',
              icon: 'mail-outline'
            },
            {
              title: 'Finished Orders',
              url: '/adminfinishedorders',
              icon: 'library-outline'
            },
            // {
            //   title: 'cart',
            //   url: '/cart',
            //   icon: 'paper-plane'
            // },
            {
              title: 'Profile',
              url: '/profile2',
              icon: 'person-outline'
            },
            {
              title: 'Userz',
              url: '/adminusers',
              icon: 'people-outline'
            },
            {
              title: 'Street Art',
              url: '/adminstreetart',
              icon: 'paper-plane'
            },
            { 
              title: 'Frames Designs',
              url: '/adminsframes',
              icon: 'paper-plane'
            },
            {
              title: 'Msg',
              url: '/printhistory',
              icon: 'paper-plane'
            },
          ) 
        } else if (this.position == "client") {
          this.appPages = [];
          this.appPages.push(
            // {
            //   title: 'Profile',
            //   url: '/profile',
            //   icon: 'paper-plane'
            // },
            // {
            //   title: 'Order Progress',
            //   url: '/cart',
            //   icon: 'paper-plane'
            // },
            // {
            //   title: 'Street Art',
            //   url: '/streetart',
            //   icon: 'paper-plane'
            // },
            // {
            //   title: 'Print Frames Designs',
            //   url: '/printchooseframe',
            //   icon: 'paper-plane'
            // },
            // {
            //   title: 'Order History',
            //   url: '/printhistory',
            //   icon: 'paper-plane'
            // },
            {
              title: 'Settings',
              url: '/settings',
              icon: 'cog-outline'
            },
            // {
            //   title: 'Account Ecoins',
            //   url: '/printhistory',
            //   icon: 'paper-plane'
            // },
            // {
            //   title: 'Chart with Team',
            //   url: '/printhistory',
            //   icon: 'paper-plane'
            // },
            // {
            //   title: 'How to Use App',
            //   url: '/printhistory',
            //   icon: 'paper-plane'
            // },
            // {
            //   title: 'T and C',
            //   url: '/tandc',
            //   icon: 'paper-plane'
            // },
          ) 
        }
      })
    })
  }

  getAuth() {
    firebase.auth().onAuthStateChanged((user) => {
        console.log('Component authstate triggerd');

        if (user) {
            this.db.collection('users').onSnapshot(snapshot => {
                snapshot.forEach(Element => {
                    this.UserClient.push(Element.data());
                    //  this.Newadmin =[]
                    // console.log(Element.data());
                });
                this.UserClient.forEach(item => {
                    if (item.userid === firebase.auth().currentUser.uid) {
                        this.userdata = []
                        // console.log('Newadmins', this.userdata);
                        this.userdata.push(item);
                        this.userdata.splice(1, 1);
                        // this.image = item.image;
                        // console.log(this.image);
                        // console.log(this.userdata);
                    }
                });
            });
            this.db.collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(Snapshop => {
              this.userProfile = [];
              this.name = Snapshop.data().username;
              this.surname = Snapshop.data().surnamez;
              this.contact = Snapshop.data().contact;
              this.email = Snapshop.data().email;
              this.image = Snapshop.data().image;

             
              this.userProfile.push(Snapshop.data())
              // console.log(this.userProfile);
           });
           this.hasVerifiedEmail = firebase.auth().currentUser.emailVerified
          //  this.router.navigateByUrl('/home');

          // if (this.hasVerifiedEmail == true) {
          //   this.goToClientHome();
          //   console.log(this.hasVerifiedEmail);
          // } else if (this.hasVerifiedEmail == false) {
          //   this.goToVerify();
          //   console.log(this.hasVerifiedEmail);
          // }
        } else {
          this.goToLogout();
        }
       
    });
  }

  checkPosition() {
    if (this.position == 'client') {
      this.goToClientHome();
    } else if (this.position == 'admin') {
      this.goToAdminHome();
    }
  }

  async goToVerify() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/verify').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  async goToClientHome() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/home').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  async goToAdminHome() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('./admin/adminhome').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  Logout() {
    firebase.auth().signOut().then((res) => {
        console.log(res);
        this.goToLogout();
    });
  }

  async goToLogout() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('login').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  /**
  * Navigate to settings page
  */
 async goToSettings() {
  const loading = await this.loadingController.create();
  await loading.present().then(() => {
    this.menuCtrt.close().then(() => {
      this.router.navigateByUrl('./pages/settings').then(async () => {
        await loading.dismiss();
      });
    });
  });
  }

}
