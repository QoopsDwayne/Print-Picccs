import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import firebase from 'firebase';
import { TcfpicsService, FrameProduct } from '../tcfpics.service';
import * as moment from 'moment';

import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
declare const google;

@Component({
  selector: 'app-cartmodalart',
  templateUrl: './cartmodalart.page.html',
  styleUrls: ['./cartmodalart.page.scss'],
})
export class CartmodalartPage implements OnInit, AfterViewInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();
  userID = firebase.auth().currentUser.uid;

  // google map code
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  @ViewChild('autoCompleteInput') inputNativeElement: any;
  directionForm: FormGroup;

  // user
  name;
  surname;

  // cart
  TotalPrice: any;
  DiliveryPrice = 20;

  Total = 0;

  // zaka check
  RegisterForm: FormGroup;
  tcfcoinid;
  tcfcoin;
  ErrorMessage;
  myCoin;

  placeName;

  // old code var
  artid;
  price;

  isLoading = false;

  data: any = [];
  picNumber;

  DiliveyNote;

  cart: FrameProduct[] = [];

  constructor(
    private tcfpics: TcfpicsService,
    private modalCtrl: ModalController,
    private Alert: AlertController,
    private navParams: NavParams,
    public formGroup: FormBuilder,
    private router: Router,

    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.RegisterForm = formGroup.group({
      placeName : ['', [Validators.required]],
      DiliveyNote : ['', [Validators.required]],
    });

    this.createDirectionForm();
    this.getUser();

    // old code
    this.isLoading = true;

    this.activatedRoute.queryParams.subscribe(params => {
      // console.log(params);
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;

        // console.log(this.data);
      }
    });
    this.picNumber = this.data.length;
    this.TotalPrice = 10 + (this.picNumber * 10);

    for (let frm in this.data) {
        this.price = +this.data[frm].artprice + +50;
        this.artid = this.data[frm].artid;

        // console.log(this.price);
    }
   }

  ngOnInit() {
    // this.TotalPrice = this.navParams.get('TotalPrice')
    // // console.log(this.TotalPrice);
    
    // this.getTotal(this.TotalPrice);

  }

  getTotal(TotalPrice) {
    this.Total = +TotalPrice + +this.DiliveryPrice;
    // console.log(this.Total);
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      placeName: [''],
    });
  }

  ngAfterViewInit(): void {
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      center: {lat: -26.031921, lng: 28.185995 },
      zoom: 13
    });
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });
    const autocomplete = new google.maps.places.Autocomplete(this.inputNativeElement.nativeElement as HTMLInputElement);
    autocomplete.addListener('place_changed', () => {
      infowindow.close();
      marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No details available for input: ' + place.name );
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      let address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
    });
  }

  // collecting user infor
  getUser() {
    this.db.collection('users').doc(this.userID).onSnapshot(snap => {
      this.name = snap.data().username;
      this.surname = snap.data().surnamez
    })
  }

  // check funds

  Checkfunds() {
    console.log('paying price', this.Total);
    console.log('my blanance', this.tcfcoin);
    if (this.Total > this.tcfcoin) {
      this.ErrorMessage = 'You dont have enough funds. Please reload.';
      this.presentAlert(this.ErrorMessage);
      console.log('nihhuh error fun');
    } else if (this.Total <= this.tcfcoin) {
      this.CalculateCoin();
      console.log('nihhuh erro shazi its working');
    }
  }

  CalculateCoin() {
    this.myCoin = +this.tcfcoin - +this.Total;
    console.log(this.myCoin);

    this.updateMyCoin();
  }

  updateMyCoin() {
    this.db.collection('tcfwallet').doc(this.userID)
    .update({
      tcfcoin: this.myCoin
    })
    console.log('tcf wallet updated');
    this.checkout();
  }

  myUserWallet() {
    this.db.collection('tcfwallet').doc(this.userID)
    .onSnapshot(snapshot => {
      this.tcfcoinid = snapshot.data().tcfid;
      this.tcfcoin = snapshot.data().tcfcoin;

      // console.log(this.tcfcoin);
      
    })
  }

  async presentAlert(data) {
    const alert = await this.Alert.create({
      header: 'Eish',
      message: data,
      buttons: ['OK']
    });
    await alert.present();
  }

  /////////////////////////////////////////////////////////

async checkout() {
    // Perfom PayPal or Stripe checkout process
    let alert = await this.Alert.create({
      header: 'Thanks for your Order!',
      message: 'Your Framed Pic order was received please check pic tracking for progress',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
      this.router.navigate(['/streetar']);
    });

    // firebase order
    firebase.firestore().collection('artOderz/').add({
      date: moment(new Date()).format('llll'),
      Piccs: this.data,
      price: this.price,
      userid: firebase.auth().currentUser.uid,
      OrderStatus: 'Order Recieved',
      picNumber: this.picNumber,
      address: this.placeName,
      orderID: Math.floor(Math.random()*899999+100000),
      diliveryNote: this.DiliveyNote
    }).then(result => {
      firebase.firestore().collection('artOderz/').doc(result.id).update({
        clientID: result.id,
      })
      this.deleteArt();
      this.router.navigate(['streetar']);
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
    });

    // this.saveOrder();
  }

  deleteArt() {
    firebase.firestore().collection('artOderz/').doc(this.artid).delete();
  }

  deletePic(i) {
    let selected = i;
    console.log(selected);
  
    this.data.splice(i);
    console.log(this.data);
    this.picNumber = this.data.length;
    this.TotalPrice = 10 + (this.picNumber * 10);
  }

  // Toolz

  close() {
    this.modalCtrl.dismiss();
  }

}
