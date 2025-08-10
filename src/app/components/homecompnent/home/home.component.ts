import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../../models/iproduct';
import { ProductsService } from '../../../services/products.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ICategory } from '../../../models/ICategory';
import { CategoriesService } from '../../../services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredProducts: Iproduct[] = [];
  isLogged: boolean = false;
  currentUrl: string = '';
  categorys: ICategory[] = []
  features = [
    { icon: '🚚', text: 'Fast Delivery' },
    { icon: '💰', text: 'Best Prices' },
    { icon: '✅', text: 'Original Products' },
  ];



  constructor(private protectservice: ProductsService, private router: Router
    , private auth: AuthService, private category: CategoriesService
  ) {
    this.currentUrl = this.router.url;
  }

  ngOnInit() {

    this.protectservice.GetFeaturedProducts().subscribe({
      next: (res) => {
        this.featuredProducts = res;
      },
      error: (err) => {
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question"
        });
      }
    });

    this.auth.user$.subscribe({

      next: (user) => {
        // console.log(user);

        if (user) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      },
      error: () => {
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question"
        });
      }

    });


  }


}
