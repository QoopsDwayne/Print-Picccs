import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { resolve } from 'url';
import * as moment from 'moment';
import { Route } from '@angular/compiler/src/core';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

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

  userUID;
  userId;
  userDocumentNo;
  email;

  userzArray;
  userNamez;
  userSurname;
  userEmail;

  // home pulling data to cart [home page]


  // uploading pic [upload pic page]
  resultID;
  myPiccs = [];

  id;
  pic;
  comment;
  pidid;
  date;
  price = 10;
  amount = 1;

  myProducts = [];

  private cart = [];
  private CartPics = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(
    private router: Router,
    public Alert: AlertController,
  ) { }

  // log in, sign up and register code
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then((results) => {
      if (results) {
        this.userUID = results['user'].uid;
        // this.userDocumentNo = results['user'].uid;
      }
      return results;
    }).catch((error) => {
      var errorCode = error.code;
      var errorCode = error.message;
      return errorCode;
    });
  }

  loginUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signup(email, password, name, surname, image, contact) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      if (user) {
        this.userId = user['user'].uid;
        this.userDocumentNo = user['user'].uid;
        this.email = user['user'].email;
        // console.log(this.userDocumentNo);

      // inserting into database
        firebase.firestore().collection('users/').doc(this.userId).set({
        username: name,
        surnamez: surname,
        emails: email,
        image: image,
        contact: contact,
        userid: this.userId,
        position: 'client'
        })
      }
      // this.router.navigate(['home']);
      this.addWallet(this.userId)
      this.sendVerification();
      return user;
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
      // ...resetepassword
    });
  }

  addWallet(userId) {
    this.db.collection('tcfwallet').doc(userId)
    .set({
      tcfcoin: 0,
      tcfid: Math.floor(Math.random()*899999+100000),
      id: userId
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
      // ...resetepassword
    });
  }

  sendVerification() {
    firebase.auth().currentUser.sendEmailVerification();
  }

  logout() {
    firebase.auth().signOut().then(() => {
      console.log('Sign-out successful.');

      // Sign-out successful.
    }).catch((error) => {
      console.log('An error happened.');
      // An error happened.
    });
  }

  resetepassword(email) {
    const auth = firebase.auth();

    auth.sendPasswordResetEmail(email.Email).then(() => {
    // Email sent.
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  uploadpic(pic, name) {
    this.db.collection('pics').doc(firebase.auth().currentUser.uid).collection('clientpics').add({
      comment: name,
      pic: pic,
      date: moment(new Date()).format('llll'),
      pidid: Math.floor(Math.random()*899999+100000),
    }).then(result => {
      // console.log(result);
      // console.log(result.id);
      this.resultID = result.id
      this.presentLoading();
      // console.log(resultID);
      this.db.collection('pics').doc(firebase.auth().currentUser.uid).collection('clientpics').doc(result.id).update({
        id: this.resultID,
      })
      // this.router.navigate(['home']);
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  async presentLoading() {
    const alert = await this.Alert.create({
      header: 'Success',
      message: 'Your Picture was Uploaded',
      buttons: ['Ok']
    })
    await alert.present();
  }

  deletePics(id) {
    this.db.collection('pics').doc(firebase.auth().currentUser.uid).collection('clientpics').doc(id).delete();
    // console.log('delete pic done');
  }

  UserInfor() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userUID = user.uid;
      } else {
        // No user is signed in.
      }
    });
    return this.userUID;
  }

  getUserProfile(userId) {
    return firebase.database().ref("users/" + userId).once('value').then(snapshot => {
      let profile = snapshot.val();
      console.log(profile.hasProfilePic);
      if (profile.hasProfilePic) {
        console.log("has a profile pic");

        return firebase.storage().ref('usersProfilePic/' + userId).getDownloadURL().then( url => {
          profile['profilePicUrl'] = url;
          return profile;
        });
      } else {
        console.log("do not haves a profile pic");
        profile['profilePicUrl'] = 'assets/images/cool-avatar.png';
        return profile;
      }
    });
  }

  //////////////////////////////////////////////////////////////////////////////// 

  saveOrder(TotalPrice, data) {
    console.log(TotalPrice);
    console.log(data);
    
   
  }

  saveOrderhistory(price, amount, cart) {
    return firebase.firestore().collection('historyOderz/').doc(firebase.auth().currentUser.uid).collection('Order').doc().set({
      Date: moment(new Date()).format('MMMM DD YYYY, h:mm'),
      // Price: price,
      // Amount: amount,
      food: cart,
      customer: firebase.auth().currentUser.uid,
      // OrderStatus: 'Order Recieved',
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

}
