import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../../services/tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-adminfinishedorders',
  templateUrl: './adminfinishedorders.page.html',
  styleUrls: ['./adminfinishedorders.page.scss'],
})
export class AdminfinishedordersPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  FinishedOrders = [];
  FinishedOrdersNo;

  // Orders
  Orders = [];
  OrdersNo;

  // Sent Orders Numbers
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
    this.getFinishedOrders();
    this.getOrders();
    this.getSentOrders();
   }

  ngOnInit() {
  }

  getFinishedOrders() {
    this.db.collection('finished').orderBy('date', "asc").onSnapshot(element => {
      this.FinishedOrders = [];
      // console.log(element)

      element.forEach(snap => {
        this.FinishedOrders.push(snap.data());
      })

      this.FinishedOrdersNo = this.FinishedOrders.length;

      // console.log(this.FinishedOrdersNo);
      // console.log(this.FinishedOrders);
    })
  }

  getOrders() {
    this.db.collection('Oderz').orderBy('date', "asc").onSnapshot(element => {
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
    this.db.collection('sentpics').orderBy('date', "asc").onSnapshot(element => {
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
