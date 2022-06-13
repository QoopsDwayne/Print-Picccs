import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { resolve } from 'url';
import * as moment from 'moment';
import { Route } from '@angular/compiler/src/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: string;
  pidid: number;
  comment: string;
  price: number;
  amount: number;
  pic: string;
  date: string;
}

export interface FrameProduct {
  id: string;
  pidid: number;
  comment: string;
  price: number;
  amount: number;
  pic: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TcfpicsService {

  db = firebase.firestore();

  myProducts = [];

  myPiccs = [];

  id;
  pic;
  comment;
  pidid;
  date;
  price = 10;
  amount = 1;

  private cart = [];
  private CartPics = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(private router: Router) { }

}
