import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import  firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  uid: string;
  email: string;
}
 
export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  name: string;
  surname: string;
  image: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeedchatService {

  currentUser: User = null;

  name;
  surname;
  image;

  constructor(
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;      
    });

    this.getCurrentUser();
   }
  
   async signup({ email, password }): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
 
    const uid = credential.user.uid;
 
    return this.afs.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email,
    })
  }

  // check if wanted or not
 
  signIn({ email, password }) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
 
  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  // Chat functionality

  addChatMessage(msg, id) {
    return this.afs.collection('feedchats').doc(id).collection('messages').add({
      msg: msg,
      from: this.currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: this.name,
      surname: this.surname,
      image: this.image,
      userid: this.currentUser.uid
    });
  }
  
  getChatMessages(id) {
    let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        return this.afs.collection('feedchats').doc(id).collection('messages', ref => ref.orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),
      map(messages => {
        // Get the real name for each user
        for (let m of messages) {          
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser.uid === m.from;
        }        
        return messages
      })
    )
  }
  
  private getUsers() {
    return this.afs.collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }

  getCurrentUser() {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
      // console.log(snapshot);

      this.name = snapshot.data().username;
      this.surname = snapshot.data().surnamez;
      this.image = snapshot.data().image;

    })
  }
  
  private getUserForMsg(msgFromId, users: User[]): string {    
    for (let usr of users) {
      if (usr.uid == msgFromId) {
        return usr.email;
      }
    }
    return 'Deleted';
  }

}
