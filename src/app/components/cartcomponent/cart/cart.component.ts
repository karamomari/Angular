declare var bootstrap: any;
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CartItem } from '../../../models/cart-item';
import { CartServiceService } from '../../../services/cart-service.service';
import { AuthService } from '../../../services/auth.service';
import { Iproduct } from '../../../models/iproduct';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  products: CartItem[] = []
  Total: number = 0;

  constructor(private cartService: CartServiceService, private router: Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.products = cart;
    });
  }

  increaseQty(product: Iproduct) {
    this.cartService.addToCart(product);
    this.products = this.cartService.getCart();
    this.calculateTotal()
  }

  decreaseQty(id: number) {
    this.cartService.removeOneFromCart(id);
    this.products = this.cartService.getCart();
    this.calculateTotal()
  }

  calculateTotal() {
    this.Total = 0;
    this.products.forEach((pr) => {
      this.Total += pr.price * (pr.quantity || 1);
    });
  }



  get total(): number {
    return this.products.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0);
  }


Checkout() {
    const modal = document.getElementById('cartModal');
  if (modal) {
    const modalInstance = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
    modalInstance.hide();
  }
  const cart = this.cartService.getCart();
  const user = this.auth.getCurrentUser();

  if (cart.length === 0) {
    Swal.fire('السلة فارغة', 'يرجى إضافة منتجات أولاً', 'warning');
    return;
  }

  if (!user) {
    this.router.navigate(['/Login'], { queryParams: { returnUrl: this.router.url } });
    return;
  }
  this.cartService.setCurrentCart(cart);
  this.router.navigate(['checkout',{cart:cart}]);
}




}
