declare var bootstrap: any;
import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../../models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartServiceService } from '../../../services/cart-service.service';
import { CartItem } from '../../../models/cart-item';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  constructor(private cartService: CartServiceService, private router: Router) { }

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
    this.cartService.checkout().subscribe(status => {
      if (status === 'empty') {
        Swal.fire({
          icon: 'warning',
          title: 'السلة فارغة',
          text: 'يرجى إضافة منتجات أولاً'
        });
      }

      else if (status === 'unauthenticated') {
        const modal = document.getElementById('cartModal');
        if (modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
          modalInstance.hide();
        }


        this.router.navigate(['/Login'], {
          queryParams: { returnUrl: this.router.url }
        });
      }


      else if (status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'تم إرسال الطلب!',
          text: 'جاري معالجة سلتك الآن'
        });
      }
    });
  }






}
