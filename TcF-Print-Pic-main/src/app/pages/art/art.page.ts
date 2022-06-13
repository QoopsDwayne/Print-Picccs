import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TcfpicsService } from './../../services/tcfpics.service';
import firebase from 'firebase';
import { AlertController, Animation, AnimationController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

import { ModalController } from '@ionic/angular';
import { ImageModalPage } from './../../modals/image-modal/image-modal.page';
import { ArtService } from './../../services/art.service';
import { ArtCartModalPageModule } from './../../modals/art-cart-modal/art-cart-modal.module';

@Component({
  selector: 'app-art',
  templateUrl: './art.page.html',
  styleUrls: ['./art.page.scss'],
})
export class ArtPage implements OnInit, AfterViewInit {

  @ViewChild('myfab', { read: ElementRef }) cartBtn: ElementRef;
  cartAnimation: Animation;
  cart = {}; 

  storage = firebase.storage().ref();
  db = firebase.firestore();

  products: Observable<any[]>;

  userPics = [];

  id;
  pic;
  comment;
  pidid;
  date;

  page = 0;

  image;

  constructor(
    public tcfpics: TcfpicsService,
    public Alert: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formGroup: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController,

    private artServices: ArtService,
    private animationCtrl: AnimationController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.products = this.artServices.getArt();
    console.log(this.products);

    this.artServices.getArt().subscribe(res => {
      console.log('my piccs', res);
    })

    this.artServices.cart.subscribe(value => {
      console.log('My Cart Items:', value);
      this.cart = value;
    });
  }

  ngAfterViewInit() {
    this.cartAnimation = this.animationCtrl.create('cart-animation');
    this.cartAnimation
    .addElement(this.cartBtn.nativeElement)
    .keyframes([
      { offset: 0, transorm: 'scale(1)' },
      { offset: 0.5, transorm: 'scale(1.2)' },
      { offset: 0.8, transorm: 'scale(0.9)' },
      { offset: 1, transorm: 'scale(1)' },
    ])
    .duration(300)
    .easing('easy-out');
  }

  addToCart(event, product) {
    // event.stopPropagating();
    this.artServices.addToCart(product.id);
    this.cartAnimation.play();
    // console.log('adding is working');
  }

  removeFromCart(event, product) {
    // event.stopPropagating();
    this.artServices.removeFromCart(product.id);
    this.cartAnimation.play();
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: ArtCartModalPageModule
    });
    await modal.present();
  }

  openPreview(pic) {
    this.modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        pic: pic
      }
    }).then(modal => modal.present());
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  //  ionViewDidLeave() {
  //   // enable the root left menu when leaving the tutorial page
  //   this.menuCtrl.enable(true);
  // }


}
