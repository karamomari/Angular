import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../models/iuser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CartServiceService } from '../../../services/cart-service.service';
import { IOrder } from '../../../models/IOrder';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  user!: IUser | null
  userInfoCards: any[] = []
  isLoggedIn: boolean = false
  orders: IOrder[] = [];

  constructor(private authService: AuthService, private router: Router, private cartserices: CartServiceService) { }
ngOnInit() {
  this.authService.user$.subscribe({
    next: (user) => {
      if (user && user.id) {
        this.isLoggedIn = true;
        this.user = user;
        this.buildUserCards(user);

        console.log('Fetching orders for userId:', user.id);
        this.cartserices.getUserOrders(user.id).subscribe({
          next: (orders) => {
            this.orders = orders;
            console.log('Received orders:', orders);
          },
          error: (err) => {
            console.error('Error fetching orders:', err);
          }
        });
      } else {
        this.isLoggedIn = false;
        this.showUnauthorizedAlert();
      }
    },
    error: (err) => {
      console.error('Error in auth subscription:', err);
    }
  });
}



  private showUnauthorizedAlert() {
    Swal.fire({
      title: '🚫 Unauthorized!',
      html: `
      <strong>Hacking attempt detected!</strong><br>
      This action has been logged and further steps will be taken.
    `,
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Return to safety',
      confirmButtonColor: '#e74c3c',
      backdrop: `rgba(0,0,0,0.9)`,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(() => {
      this.router.navigateByUrl('/');
    });
  }


private buildUserCards(user: IUser) {
  this.userInfoCards = [
    { label: 'Username', value: user.username },
    { 
      label: 'Phone',
       value: user.phone ? user.phone : "+962779638998"
      },
    { 
      label: 'Address', 
      value: user.address ? `${user.address.city}, ${user.address.state}` : 'Amman ' 
    }
  ];
}

  viewOrderDetails(id: number) {

  }

  LogOut() {

    this.authService.logout()
  }


}
