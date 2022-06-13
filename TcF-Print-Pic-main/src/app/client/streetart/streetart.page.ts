import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TcfpicsService } from './../tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartmodalartPage } from './../cartmodalart/cartmodalart.page';

@Component({
  selector: 'app-streetart',
  templateUrl: './streetart.page.html',
  styleUrls: ['./streetart.page.scss'],
})
export class StreetartPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  cart = [];
  product = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  artid;
  artimage;
  artname;
  artprice;
  artsize;

  artid2;
  artimage2;
  artname2;
  artprice2;
  artsize2;

  // userPics = [];
  ArtArray = [];

  price = 10;
  amount = 1;

  page = 0;

  image;

  printPics = [];
  piccsNo;

  checkedItems:any;

  indeterminateState: boolean;
  checkParent: boolean;
  Checkboxes: any;

  dummy: any = [ "dummy1", "dummy2", "dummy3", "dummy4", "dummy5"];

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
    this.db.collection('art').onSnapshot(snapshot => {
      this.ArtArray = [];
      // console.log(element.data());

      snapshot.forEach(element => {
        // // this.ArtArray = [];
        this.ArtArray.push(element.data());
        // console.log(this.ArtArray);

        this.artid = element.data().artid;
        this.artimage = element.data().artimage;
        this.artname = element.data().artname;
        this.artprice = element.data().artprice;
        this.artsize = element.data().artsize;
      })
  })
   }

  ngOnInit() {
    this.product = this.ArtArray;
    // this.cart = this.tcfpics.getCart();
    this.cartItemCount = this.piccsNo;
    // console.log(this.product);
  }

  addToPrintPicArray(userPics) {
    // push pic o print

    this.db.collection('art').doc(userPics).onSnapshot(element => {
        // console.log(element.data());

        this.artid2 = element.data().artid;
        this.artimage2 = element.data().artimage;
        this.artname2 = element.data().artname;
        this.artprice2 = element.data().artprice;
        this.artsize2 = element.data().artsize;

          this.printPics.push({
            artid: this.artid2,
            artimage: this.artimage2,
            artname: this.artname2,
            artprice: this.artprice2,
            artsize: this.artsize2,
          })

          this.piccsNo = this.printPics.length;
          this.openCart();

          // console.log(this.printPics);
          // console.log(this.piccsNo);

        })
  
  }

  loadMore(event?) {
    setTimeout(() => {
      // console.log('Timeout Done');
      event.target.complete();

      if (this.ArtArray.length === 1000) {
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
      component: CartmodalartPage,
      cssClass: 'cartmodalart'
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
