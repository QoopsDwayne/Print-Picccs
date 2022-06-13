import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import firebase from 'firebase';

import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
declare const google;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit, AfterViewInit {

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
  placeName;

  Total = 0;

  // zaka check
  RegisterForm: FormGroup;
  tcfcoinid;
  tcfcoin;
  ErrorMessage;
  myCoin;

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private Alert: AlertController,
    private navParams: NavParams,
    public formGroup: FormBuilder,

    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.RegisterForm = formGroup.group({
      placeName : ['', [Validators.required]],
    });

    this.createDirectionForm();
    this.getUser();

    this.myUserWallet();
   }

  ngOnInit() {
    this.TotalPrice = this.navParams.get('TotalPrice')
    console.log(this.TotalPrice);
    
    this.getTotal(this.TotalPrice);
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

  async checkout() {
    this.productService.checkoutCart(this.Total, this.placeName)
    .then(() => {
      this.modalCtrl.dismiss();
      // console.log('im working dude');
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });;
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

  // Toolz

  close() {
    this.modalCtrl.dismiss();
  }

}
