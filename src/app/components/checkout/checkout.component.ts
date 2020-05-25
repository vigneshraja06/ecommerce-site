import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {OrderService} from "../../services/order.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {CartModelServer} from "../../models/cart.model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartTotal: Number;
  cartData: CartModelServer;

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private toast: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }
  onCheckout() {
    this.spinner.show().then(p =>{
      this.cartService.CheckoutFromCart(1)
    })
  }
}
