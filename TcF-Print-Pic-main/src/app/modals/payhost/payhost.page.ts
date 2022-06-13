import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import firebase from 'firebase';

import { ActivatedRoute } from '@angular/router';

import { NavParams, ModalController, LoadingController, MenuController } from '@ionic/angular';
import { countries } from './../../../assets/countries';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { locale } from './../../../assets/locale';
import { environment } from '../../../environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-payhost',
  templateUrl: './payhost.page.html',
  styleUrls: ['./payhost.page.scss'],
})
export class PayhostPage implements OnInit {

  id: any;
  resId: any;
  amount: any;

  userId;
  results = [];

  // Paygate return
  ok;
  status;
  statusText;
  name;
  message;

  clientimage;
  clientname : any;;
  clientsurname: any;;
  clientemail: any;;
  clientid: any;
  client = [];

  CardNumber;
  CardExpiryDate;
  CardIssueDate;
  CVV;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder, 
    private http: HttpClient,
    private router: Router,
    private navParams: NavParams,
    private modalController: ModalController,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  // Toolz

  close() {
    this.modalController.dismiss();
  }

}
