import { Component, OnInit } from '@angular/core';
import { TcfpicsService } from './../../services/tcfpics.service';
import firebase from 'firebase';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute  } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-printhistory',
  templateUrl: './printhistory.page.html',
  styleUrls: ['./printhistory.page.scss'],
})
export class PrinthistoryPage implements OnInit {

  db = firebase.database();

  data: any = [];
  picNumber;

  userPics = [];

  id;
  comment;
  pic;
  pidid;
  date;  
  userid;

  emptyCard;

  constructor(
    public tcfpics: TcfpicsService,
    private modalCTRL: ModalController,
    private alertCtrl: AlertController,
    public activatedRoute: ActivatedRoute,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private router: Router
  ) {
    this.userid = firebase.auth().currentUser.uid;
    
    this.getHistory(this.userid);
   }

  ngOnInit() {
  }

  getHistory(userid) {
    firebase.firestore().collection('finished').where('userid', '==', userid).onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.userPics = [];
        // console.log(element.data());

        snapshot.forEach(element => {
          // this.userPics = [];
          this.userPics.push(element.data());
          console.log(this.userPics);

          // this.id = element.data().id;
          // this.comment = element.data().comment;
          // this.pic = element.data().pic;
          // this.pidid = element.data().pidid;
          // this.date = element.data().date;
          // console.log(this.date);

        })
      })
    })
  }

}
