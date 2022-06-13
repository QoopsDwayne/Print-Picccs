import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const CART_STORAGE_KEY = "MY_CART";

const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);

@Injectable({
  providedIn: 'root'
})
export class ArtService {

  cart = new BehaviorSubject({});
  cartKey = null;

  // storage = firebase.storage().ref();
  db = firebase.firestore();
  userid = firebase.auth().currentUser.uid;

  picCollection: AngularFirestoreCollection;
  test = [];

  // user details data
  name;
  surname;
  contact;
  email;
  image;

  constructor(private afs: AngularFirestore) {
    console.log('dude da fuck');

    this.db.collection('art').onSnapshot(snap => {
      console.log(snap);
      
      snap.forEach(element => {
        this.test.push(element.data());
        console.log('element data', element.data());
        console.log('ithini 1', this.test);
      });
      console.log('ithini 2', this.test);
    })
    
    this.picCollection = this.afs.collection('art');
    console.log(this.picCollection);
    this.loadCart();
    this.getUser();
   }

   getArt() {
     console.log('dude da fuck get art');
     
    return this.picCollection.valueChanges({ idField: 'id' });
  }

  async loadCart() {
    console.log('dude im trying to work');
    
    const result = await Storage.get({key: CART_STORAGE_KEY});
    if (result.value) {
      // already have a cart
      this.cartKey = result.value;
      console.log(result.value);

      this.afs.collection('artcart').doc(this.cartKey).valueChanges().subscribe((result: any) => {
        console.log('cart change', result);
        delete result['lastUpdate'];
        this.cart.next(result || {});
      })
    } else {
      const fbDocument = await this.afs.collection('artcart').add({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
      })
      console.log('new cart', fbDocument);
      this.cartKey = fbDocument.id;
      await Storage.set({key: CART_STORAGE_KEY, value: this.cartKey});
    }
  }

  addToCart(id) {
    this.afs.collection('artcart').doc(this.cartKey).update({
      [id]: INCREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });

    // this.picCollection.doc(id).update({
    //   stock: DECREMENT
    // })
  }

  removeFromCart(id) {
    this.afs.collection('artcart').doc(this.cartKey).update({ 
      [id]: DECREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });

    // this.picCollection.doc(id).update({
    //   stock: INCREMENT
    // })
  }

  getUser() {
    this.db.collection('users').doc(this.userid).onSnapshot(snapshot => {
      this.image = snapshot.data().image;
      this.name = snapshot.data().username;
      this.surname = snapshot.data().surnamez;
      this.contact = snapshot.data().contact;
      this.email = snapshot.data().emails;
    })
  }

  async checkoutCart() {
    await this.afs.collection('orders').add({
      cart: this.cart.value,
      name: this.name,
      surname: this.surname,
      contact: this.contact,
      email: this.email,
      image: this.image,
    });

    this.afs.collection('artcart').doc(this.cartKey).set({
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

   
}
