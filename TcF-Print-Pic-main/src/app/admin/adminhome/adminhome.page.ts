import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../../services/tcfpics.service';
import firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.page.html',
  styleUrls: ['./adminhome.page.scss'],
})
export class AdminhomePage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  Orders = [];
  OrdersNo;

  // Sent Orders Numbers
  SentOrders = [];
  SentOrdersNo;

  // printed numbers
  PrintedOrders = [];
  PrintedOrdersNo;

  // Frame printed numbers
  FramePrintedOrders = [];
  FramePrintedOrdersNo;

  // Art numbers
  ArtPrintedOrders = [];
  ArtPrintedOrdersNo;

  // Finished numbers
  FinPrintedOrders = [];
  FinPrintedOrdersNo;

  constructor(
    public tcfpics: TcfpicsService,
    public Alert: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formGroup: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController,
  ) {
    this.getOrders();
    this.getPrintedOrders();
    this.getSentOrders();
    this.getframeOrders();
    this.getartOrders();
    this.getFinishedOrders();
   }

  ngOnInit() {
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

  getframeOrders() {
    this.db.collection('frameOderz').orderBy('date', "desc").onSnapshot(element => {
      this.FramePrintedOrders = [];
      // console.log(element)

      element.forEach(snap => {
        this.FramePrintedOrders.push(snap.data());
      })

      this.FramePrintedOrdersNo = this.FramePrintedOrders.length;

      // console.log(this.FramePrintedOrdersNo);
      // console.log(this.FramePrintedOrders);
    })
  }

  getartOrders() {
    this.db.collection('artOderz').orderBy('date', "desc").onSnapshot(element => {
      this.ArtPrintedOrders = [];
      // console.log(element)

      element.forEach(snap => {
        this.ArtPrintedOrders.push(snap.data());
      })

      this.ArtPrintedOrdersNo = this.ArtPrintedOrders.length;

      // console.log(this.ArtPrintedOrdersNo);
      // console.log(this.ArtPrintedOrders);
    })
  }

  getFinishedOrders() {
    this.db.collection('finished').orderBy('date', "desc").onSnapshot(element => {
      this.FinPrintedOrders = [];
      // console.log(element)

      element.forEach(snap => {
        this.FinPrintedOrders.push(snap.data());
      })

      this.FinPrintedOrdersNo = this.FinPrintedOrders.length;

      // console.log(this.FinPrintedOrdersNo);
      // console.log(this.FinPrintedOrders);
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
