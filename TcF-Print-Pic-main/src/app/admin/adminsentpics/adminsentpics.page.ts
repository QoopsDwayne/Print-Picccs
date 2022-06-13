import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../../services/tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-adminsentpics',
  templateUrl: './adminsentpics.page.html',
  styleUrls: ['./adminsentpics.page.scss'],
})
export class AdminsentpicsPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  SentOrders = [];
  SentOrdersNo;

  // Printed Order Numbers
  PrintedOrders = [];
  PrintedOrdersNo;

  // Orders Numbers
  Orders = [];
  OrdersNo;

  constructor(
    public tcfpics: TcfpicsService,
    public Alert: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formGroup: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController,
  ) {
    this.getSentOrders();
    this.getPrintedOrders();
    this.getOrders();
   }

  ngOnInit() {
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

}
