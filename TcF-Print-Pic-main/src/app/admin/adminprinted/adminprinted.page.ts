import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../../services/tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-adminprinted',
  templateUrl: './adminprinted.page.html',
  styleUrls: ['./adminprinted.page.scss'],
})
export class AdminprintedPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  PrintedOrders = [];
  PrintedOrdersNo;

  // orders numbers
  Orders = [];
  OrdersNo;

  // Sent Orders
  SentOrders = [];
  SentOrdersNo;

  constructor(
    public tcfpics: TcfpicsService,
    public Alert: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formGroup: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController,
  ) {
    this.getPrintedOrders();
    this.getOrders();
    this.getSentOrders();
   }

  ngOnInit() {
  }

  getPrintedOrders() {
    this.db.collection('printed').orderBy('date', "desc").onSnapshot(element => {
      this.PrintedOrders = [];
      // console.log(element)

      element.forEach(snap => {
        this.PrintedOrders.push(snap.data());
      })

      this.PrintedOrdersNo = this.PrintedOrders.length;

      // console.log(this.PrintedOrdersNo);
      // console.log(this.PrintedOrders);
    })
  }

  getOrders() {
    this.db.collection('Oderz').orderBy('date', "desc").onSnapshot(element => {
      this.Orders = [];
      // console.log(element)

      element.forEach(snap => {
        this.Orders.push(snap.data());
      })

      this.OrdersNo = this.Orders.length;

      // console.log(this.OrdersNo);
      // console.log(this.Orders);
    })
  }

  getSentOrders() {
    this.db.collection('sentpics').orderBy('date', "desc").onSnapshot(element => {
      this.SentOrders = [];
      // console.log(element)

      element.forEach(snap => {
        this.SentOrders.push(snap.data());
      })

      this.SentOrdersNo = this.SentOrders.length;

      // console.log(this.SentOrdersNo);
      // console.log(this.SentOrders);
    })
  }

}
