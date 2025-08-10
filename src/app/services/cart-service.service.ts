import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Iproduct } from '../models/iproduct';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { IOrder } from '../models/IOrder';


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
  
  getUserOrders(userId: number): Observable<IOrder[]> {
    return this.http.get<{ carts: IOrder[] }>(`${environment.baseurl}/carts/user/${userId}`)
      .pipe(
        map(response => {
          if (!response.carts || response.carts.length === 0) {
            return this.getMockOrders(userId);
          }
          return response.carts;
        }),
        catchError(() => {
          return of(this.getMockOrders(userId));
        })
      );
  }

  private getMockOrders(userId: number): IOrder[] {
    return [
      {
        id: 24,
        userId: userId,
        date: '2023-08-10',
        total: 1749.9,
        discountedTotal: 1594.33,
        totalProducts: 3,
        totalQuantity: 10,
        status: 'Delivered',
        products: [
          {
            id: 108,
            title: "iPhone 12 Silicone Case with MagSafe Plum",
            price: 29.99,
            quantity: 5,
            total: 149.95,
            discountPercentage: 14.68,
            discountedTotal: 127.94,
            thumbnail: "https://cdn.dummyjson.com/products/images/mobile-accessories/iPhone%2012%20Silicone%20Case%20with%20MagSafe%20Plum/thumbnail.png"
          },
          {
            id: 134,
            title: "Vivo S1",
            price: 249.99,
            quantity: 4,
            total: 999.96,
            discountPercentage: 5.64,
            discountedTotal: 943.56,
            thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/Vivo%20S1/thumbnail.png"
          },
          {
            id: 174,
            title: "Prada Women Bag",
            price: 599.99,
            quantity: 1,
            total: 599.99,
            discountPercentage: 12.86,
            discountedTotal: 522.83,
            thumbnail: "https://cdn.dummyjson.com/products/images/womens-bags/Prada%20Women%20Bag/thumbnail.png"
          }
        ]
      }
    ];
  }




}
