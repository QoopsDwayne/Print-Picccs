import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import firebase from 'firebase';
import { FeedchatService } from './../../../services/feedchat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, LoadingController, MenuController } from '@ionic/angular';
import { ImageModalPage } from './../../../modals/image-modal/image-modal.page';

@Component({
  selector: 'app-feedchat',
  templateUrl: './feedchat.page.html',
  styleUrls: ['./feedchat.page.scss'],
})
export class FeedchatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  id;

  messages: Observable<any[]>;
  newMsg = '';

  post = [];

  name;
  surname;

  comments;
  commentsNumber = [];
  commentsNo;

  senttcfid;
  senttcfcoin;

  TotalSentCoin;
  TotalReducedCoin;
  msgCost: number = 1;
  myCoin;

  ErrorMessage;

  constructor(
    private chatService: FeedchatService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    public Alert: AlertController,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);

    this.getFeedPost(this.id)
    this.myUserWallet();
   }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages(this.id);
    // console.log(this.messages)
  }

  sendMsg() {
    if (this.senttcfcoin < 1) {
      this.ErrorMessage = 'You dont have any coins left. Please reload.';
      this.presentAlert(this.ErrorMessage);
    } else if (this.senttcfcoin > 1) {
      this.CalculateCoin();
    }
  }

  CalculateCoin() {
    this.myCoin = this.senttcfcoin - 1;
    // console.log(this.myCoin);

    this.updateMyCoin();
  }

  updateMyCoin() {
    this.db.collection('tcfwallet').doc(this.userID)
    .update({
      tcfcoin: this.myCoin
    })
    // console.log('updated');
    this.sendMessage();
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg, this.id).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });

    // this.goToFeedWall();
  }

  myUserWallet() {
    this.db.collection('tcfwallet').doc(this.userID)
    .onSnapshot(snapshot => {
      this.senttcfid = snapshot.data().tcfid;
      this.senttcfcoin = snapshot.data().tcfcoin;

      // console.log(this.senttcfcoin);
      
    })
  }

  getFeedPost(id) {
    this.db.collection('feedwall').doc(id)
    .onSnapshot(snapshot => {
      // console.log(snapshot);
      this.post = [];
      
      this.post.push(snapshot.data())
      console.log(this.post);

      this.comments = snapshot.data().comments;
      // console.log(this.comments);

      this.getFeedCommentNumber(id);
      
    })
  }

  getFeedCommentNumber(id) {
    this.commentsNumber = [];
    this.db.collection('feedchats').doc(id).collection('messages')
    .onSnapshot(snapshot => {
      // console.log(snapshot);
      
      snapshot.forEach(element => {
        this.commentsNumber.push(element.data())
        // console.log(this.commentsNumber);
        // console.log(this.commentsNumber.length);
        this.commentsNo = this.commentsNumber.length;
        setTimeout(() => {
          // this.uploadingprogress = 100;
          this.updateCommentNo(id);
        }, 1)
      })
      // this.updateCommentNo(id);
    })
  }

  updateCommentNo(id) {
    this.db.collection('feedwall').doc(id).update({ commentNo: this.commentsNo })
  }
 
  signOut() {
    this.chatService.signOut().then(() => {
      // this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }

  getUser() {
    this.db.collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(Snapshot => {
      this.name = Snapshot.data().username;
      this.surname = Snapshot.data().surnamez;
    })
  }

  openPreview(image) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        image: image
      }
    }).then(modal => modal.present());
  }

  async presentAlert(data) {
    const alert = await this.Alert.create({
      header: 'Eish',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  async goToFeedWall() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/feedwall').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

}
