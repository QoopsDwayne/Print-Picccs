import { Component, OnInit } from '@angular/core';
import { ArtService } from '../../services/art.service';
import { take } from 'rxjs/operators';
import { AlertController, ModalController } from '@ionic/angular';
import { ArtCheckoutPageModule } from '../art-checkout/art-checkout.module';

@Component({
  selector: 'app-art-cart-modal',
  templateUrl: './art-cart-modal.page.html',
  styleUrls: ['./art-cart-modal.page.scss'],
})
export class ArtCartModalPage implements OnInit {

  product = [];
  TotalPriceProd = [];

  price;
  TotalPrice = 0;
  PayingPrice = 0;

  constructor(
    private artService: ArtService,
    private modalCtrl: ModalController,
    private Alert: AlertController
  ) { }

  ngOnInit() {
    const cartItems = this.artService.cart.value;
    console.log('art-cart', cartItems);

    this.artService.getArt().pipe(take(1))
    .subscribe(allProducts => {
        this.product = allProducts.filter(p => cartItems[p.id]).map(product => {
        // this.price = cartItems[product.id] * 10;
        // this.TotalPriceProd.push({
        //   ...product, count: cartItems[product.id]
        // });
        
        return {...product, count: cartItems[product.id], price: this.price};
      });
      // console.log('products', this.product);
      // console.log('price', this.price);

      // this.getTotal(this.TotalPriceProd)
      // console.log(this.TotalPriceProd);
      
    })
  }

  getTotal(TotalPriceProd) {
    // console.log(TotalPriceProd);
    
    for (let p in TotalPriceProd) {
      this.TotalPrice = +this.TotalPrice + +TotalPriceProd[p].count;
      console.log(this.TotalPriceProd[p].count);
    }
    // console.log(this.TotalPrice);
    this.PayingPrice = +this.TotalPrice * +10;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async checkout() {
    this.modalCtrl.create({
      component: ArtCheckoutPageModule,
      componentProps: {
        TotalPrice: this.PayingPrice
      }
    }).then(modal => modal.present());
    
    this.modalCtrl.dismiss();
  }

}
