import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Iproduct } from '../models/iproduct';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();



 cartLength$: Observable<number> = this.cart$.pipe(
    map(cart => cart.reduce((total, item) => total + item.quantity, 0))
  );


  constructor(private auth: AuthService, private router: Router,
    private http: HttpClient, private toastr: ToastrService) { }


  addToCart(product: Iproduct, quantity: number = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    this.saveCart(cart);
  }



  removeFromCart(productId: number) {
    let cart = this.getCart();
    cart = cart.filter(p => p.id !== productId);
    this.saveCart(cart);
  }

  removeOneFromCart(productId: number) {
    let cart = this.getCart();
    const index = cart.findIndex(p => p.id === productId);

    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
    }

    this.saveCart(cart);
  }

  private loadCart(): CartItem[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  getCart(): CartItem[] {
    return this.cartSubject.value;
  }


  private saveCart(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  checkout(): Observable<'unauthenticated' | 'empty' | 'success'> {
  const cart = this.getCart();

  if (cart.length === 0) {
    return of('empty');
  }


  const token = this.auth.GetToken();

  if (!token) {
    return of('unauthenticated');
  }

  const products = cart.map(item => ({
    id: item.id,
    quantity: item.minimumOrderQuantity || 1
  }));

  const userId = 1; 

  return this.http.post(`${environment.baseurl}/carts/add`, { userId, products }).pipe(
    map(() => 'success')
  );
}





}
