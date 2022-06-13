import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const CART_STORAGE_KEY = "MY_CART";

const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  cart = new BehaviorSubject({});
  cartKey = null;

  // storage = firebase.storage().ref();
  db = firebase.firestore();
  userid = firebase.auth().currentUser.uid;

  picCollection: AngularFirestoreCollection;

  resultID;

  // user details data
  name;
  surname;
  contact;
  email;
  image;

  constructor(
    private afs: AngularFirestore,
    public Alert: AlertController,
  ) {
    this.picCollection = this.afs.collection('pics').doc(this.userid).collection('clientpics');
    // this.frameCollection = this.afs.collection('pics').doc(this.userid).collection('clientpics');
    this.loadCart();
    this.getUser();
   }

   getPicccz() {
    return this.picCollection.valueChanges({ idField: 'id' });
  }

  async loadCart() {
    // console.log('dude im trying to work');
    
    const result = await Storage.get({key: CART_STORAGE_KEY});
    if (result.value) {
      // already have a cart
      this.cartKey = result.value;
      console.log(result.value);

      this.afs.collection('carts').doc(this.cartKey).valueChanges().subscribe((result: any) => {
        // console.log('cart change', result);
        delete result['lastUpdate'];
        this.cart.next(result || {});
      })
    } else {
      const fbDocument = await this.afs.collection('carts').add({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
      })
      // console.log('new cart', fbDocument);
      this.cartKey = fbDocument.id;
      await Storage.set({key: CART_STORAGE_KEY, value: this.cartKey});
    }
  }

  addToCart(id) {
    this.afs.collection('carts').doc(this.cartKey).update({
      [id]: INCREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });

    // this.picCollection.doc(id).update({
    //   stock: DECREMENT
    // })
  }

  removeFromCart(id) {
    this.afs.collection('carts').doc(this.cartKey).update({ 
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

  async checkoutCart(Total, placeName) {
    await this.afs.collection('orders').add({
      cart: this.cart.value,
      name: this.name,
      surname: this.surname,
      contact: this.contact,
      email: this.email,
      image: this.image,
      userid: this.userid,
      address: placeName,
      price: Total,
      OrderStatus: 'Order Recieved',
      orderID: Math.floor(Math.random()*899999+100000)
    }).then(result => {
      this.resultID = result.id;
      this.presentLoading();
      this.afs.collection('orders').doc(result.id).update({
        orderID: result.id
      })
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });;

    this.afs.collection('carts').doc(this.cartKey).set({
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  async presentLoading() {
    const alert = await this.Alert.create({
      header: 'Success',
      message: 'Your Order was Placed',
      buttons: ['Ok']
    })
    await alert.present();
  }

}
