import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TcfpicsService } from './../tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartmodalframePage } from './../cartmodalframe/cartmodalframe.page';

@Component({
  selector: 'app-printframe',
  templateUrl: './printframe.page.html',
  styleUrls: ['./printframe.page.scss'],
})
export class PrintframePage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  cart = [];
  product = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  userPics = [];
  frameArray = [];

  id;
  pic;
  comment;
  pidid;
  date;

  id2;
  pic2;
  comment2;
  pidid2;
  date2;
  price = 10;
  amount = 1;

  page = 0;

  image;

  printPics = [];
  piccsNo;

  frameImage;
  frameName;
  frameSize;
  framePrice;
  frameid;

  checkedItems:any;

  indeterminateState: boolean;
  checkParent: boolean;
  Checkboxes: any;

  constructor(
    public tcfpics: TcfpicsService,
    public Alert: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formGroup: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController,
    private modalCTRL: ModalController,
    public activatedRoute: ActivatedRoute,
  ) {
    this.frameid = this.activatedRoute.snapshot.paramMap.get('id');
      // console.log('frame id' , this.frameid);

      this.presentLoadingWithOptions();

    this.db.collection('pics').doc(firebase.auth().currentUser.uid).collection('clientpics').orderBy('date', "asc").onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.userPics = [];
        // console.log(element.data());

        snapshot.forEach(element => {
          // // this.userPics = [];
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

    this.getFrames(this.frameid);
   }

  ngOnInit() {
    this.product = this.userPics;
    // this.cart = this.tcfpics.getCart();
    this.cartItemCount = this.piccsNo;
    // console.log(this.product);
  }

  getFrames(frameid) {
    this.db.collection('frames').doc(frameid).onSnapshot(element => {
        this.frameArray = [];
        // console.log(element.data());

          this.frameArray.push(element.data());
          // console.log(this.frameArray);

          this.frameImage = element.data().frameimage;
          this.frameName = element.data().framename;
          this.frameSize = element.data().framesize;
          this.framePrice = element.data().frameprice;
          this.frameid = element.data().frameid;
        })
  }

  addToPrintPicArray(userPics) {
    // push pic o print

    this.db.collection('pics').doc(firebase.auth().currentUser.uid).collection('clientpics').where('pidid', '==', userPics).onSnapshot(snapshot => {
      snapshot.forEach(element => {
        // console.log(element.data());

        snapshot.forEach(element => {

          this.id2 = element.data().id;
          this.comment2 = element.data().comment;
          this.pic2 = element.data().pic;
          this.pidid2 = element.data().pidid;
          this.date2 = element.data().date;

          this.printPics.push({
            id: this.id2,
            comment: this.comment2,
            pic: this.pic2,
            pidid: this.pidid2,
            date: this.date2,
            price: this.price,
            amount: this.amount,
            frameid: this.frameid,
            frameimage: this.frameImage,
            framename: this.frameName,
            framesize: this.frameSize,
            frameprice: this.framePrice
          })

          this.piccsNo = this.printPics.length;
          this.openCart();

          // console.log(this.printPics);
          // console.log(this.piccsNo);

        })
      })
    })
  
  }

  loadMore(event?) {
    setTimeout(() => {
      // console.log('Timeout Done');
      event.target.complete();

      if (this.frameArray.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
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

  ///////////////////////////////////////////////////////
  // cart code
  addToCart(product) {
    console.log(product);
    
    this.animateCSS('tada');
  }

  async openCart() {
    // this.animateCSS('bounceOutLeft', true);
    let modal =  await this.modalCTRL.create({
      component: CartmodalframePage,
      cssClass: 'cartmodalframe'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();

     // send to cart
     let navigationExtras: NavigationExtras = {
      state: {
        user: this.printPics
      }
    };
    this.router.navigate(['cartmodalframe'], navigationExtras);
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    
    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }

}
