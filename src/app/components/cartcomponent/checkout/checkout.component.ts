import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../models/cart-item';
import { CartServiceService } from '../../../services/cart-service.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent implements OnInit {
  paymentForm: FormGroup;
  cart: CartItem[] = []
  cartlength: number = 0
selectedItem: any = null;



  constructor(
    private fb: FormBuilder,
    private cartService: CartServiceService,
    private router: Router,
    private prodect: ProductsService
  ) {
   this.paymentForm = this.fb.group({
    cardNumber: ['', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.pattern('^[0-9]{16}$')
    ]],
    expiry: ['', [
      Validators.required,
      Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')
    ]],
    cvv: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.pattern('^[0-9]{3}$')
    ]]
  });
  }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.cartlength = cart.reduce((sum, item) => sum + item.quantity, 0);
    });
  }


  
  pay() {
    if (!this.cartService.getCart().length) {
      Swal.fire('السلة فارغة', 'يرجى إضافة منتجات أولاً', 'warning');
      return;
    }

    if (!this.paymentForm.valid) {
      Swal.fire('خطأ', 'يرجى إدخال بيانات البطاقة كاملة', 'error');
      return;
    }

    const paymentData = this.paymentForm.value;

    this.cartService.checkout2(paymentData).subscribe(status => {
      if (status === 'success') {
        Swal.fire('تم الدفع!', 'تمت معالجة سلتك بنجاح', 'success');
        this.cartService.clearCart();
        this.router.navigate(['/thank-you']);
      } else {
        Swal.fire('فشل الدفع', 'حاول لاحقاً أو تحقق من بياناتك', 'error');
      }
    });
  }


  get cartTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }



  openDetails(item: any) {
    console.log(item);
    
  this.selectedItem = item;
  const modal = new (window as any).bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
}



}
