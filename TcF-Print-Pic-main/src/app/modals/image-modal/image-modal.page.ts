import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  pic: any;

  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.pic = this.navParams.get('pic')
    console.log(this.pic);
  }

  zoom(zoomIn: boolean) {
    // let zoom = this.slider.nativeElement.swiper.zoom;
    // if (zoomIn) {
    //   zoom.in();
    // } else {
    //   zoom.out();
    // }
  }

  close() {
    this.modalController.dismiss();
  }

}
