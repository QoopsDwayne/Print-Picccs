import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { take } from 'rxjs/operators';
import { AlertController, ModalController } from '@ionic/angular';
import { CheckoutPage } from '../checkout/checkout.page';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  product = [];
  TotalPriceProd = [];

  price;
  TotalPrice = 0;
  PayingPrice = 0;

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private Alert: AlertController
  ) { }

  ngOnInit() {
    this.getPicsCart();
  }

  getPicsCart() {
    const cartItems = this.productService.cart.value;
    // console.log('cart', cartItems);

    this.productService.getPicccz().pipe(take(1))
    .subscribe(allProducts => {
      if(!allProducts.length) return false;
        this.product = allProducts.filter(p => cartItems[p.id]).map(product => {
        this.price = cartItems[product.id] * 20;
        this.TotalPriceProd.push({
          ...product, count: cartItems[product.id]
        });
        
        return {...product, count: cartItems[product.id], price: this.price};
      });
      // console.log('products', this.product);
      // console.log('price', this.price);

      this.getTotal(this.TotalPriceProd)
      // console.log(this.TotalPriceProd);
      
    })
  }

  getTotal(TotalPriceProd) {
    // console.log(TotalPriceProd);
    
    for (let p in TotalPriceProd) {
      this.TotalPrice = +this.TotalPrice + +TotalPriceProd[p].count;
      // console.log(this.TotalPriceProd[p].count);
    }
    // console.log(this.TotalPrice);
    this.PayingPrice = +this.TotalPrice * 20;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async checkout() {
    this.modalCtrl.create({
      component: CheckoutPage,
      componentProps: {
        TotalPrice: this.PayingPrice
      }
    }).then(modal => modal.present());
    
    this.modalCtrl.dismiss();
  }

}
