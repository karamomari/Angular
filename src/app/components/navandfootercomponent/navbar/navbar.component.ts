import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../models/cart-item';
import { CartServiceService } from '../../../services/cart-service.service';
import { CartComponent } from '../../cartcomponent/cart/cart.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, CartComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  cartProducts: CartItem[] = [];
  cartLength: number = 0
  constructor(private Auth: AuthService,
    private router: Router, private cart: CartServiceService) { }

  ngOnInit() {

    this.cart.cartLength$.subscribe(length => {
      this.cartLength = length;
    });

    this.Auth.user$.subscribe({
      next: (user) => {
        if(user){
        this.isLogged = true;
        }
        else{
          this.isLogged=false
        }
      },
      error: () => {
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question"
        });
      }
    }

    );

  }

  loginORlogout() {
    if (this.isLogged) {
      this.Auth.logout()



    } else {
        this.router.navigate(['/Login'], {
          queryParams: { returnUrl: "/" }
        });
    }
  }



}
