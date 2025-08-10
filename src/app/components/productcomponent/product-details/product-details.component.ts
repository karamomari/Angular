import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Iproduct } from '../../../models/iproduct';
import { ProductsService } from '../../../services/products.service';
import { CartServiceService } from '../../../services/cart-service.service';
import { CartComponent } from '../../cartcomponent/cart/cart.component';
import { CartItem } from '../../../models/cart-item';
import { ToastrModule } from 'ngx-toastr';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule, CartComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit,OnDestroy {
  product!: Iproduct
  id: number = 0;
  IdOfAllProduct: number[] = []
  cartProducts: CartItem[] = [];
  selectedImage: string | null = null;

  constructor(private _activatedRoute: ActivatedRoute,
    private protectservices: ProductsService, private _location: Location
    , private router: Router, private cart: CartServiceService) {

  }
  ngOnInit() {


    this._activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = Number(paramMap.get("id"));

      this.protectservices.GetProdectById(this.id).subscribe({
        next: (value) => {
          this.product = value;
          this.selectedImage=value.images[0]
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
    this.protectservices.GetAllIdOfProdect().subscribe({
      next: (Ids) => {
        this.IdOfAllProduct = Ids
      }
    })
  }
  GoBack() {
    this.router.navigateByUrl('products')
  }

  Next() {
    let currentindexid = this.IdOfAllProduct.findIndex((id: number) => id == this.id);
    if (currentindexid < this.IdOfAllProduct.length - 1) {
      let nextId = this.IdOfAllProduct[currentindexid + 1];
      this.router.navigateByUrl(`/product-details/${nextId}`);
    }
    else {
      this.router.navigateByUrl(`/product-details/1`);

    }
  }
  Pre() {

    const currentIndex = this.IdOfAllProduct.findIndex(id => id === this.id);

    if (currentIndex > 0) {
      const prevId = this.IdOfAllProduct[currentIndex - 1];
      this.router.navigateByUrl(`/product-details/${prevId}`);
    } else {
      console.log("أنت في أول منتج");
    }
  }

  AddToCart(product: Iproduct) {
    this.cart.addToCart(product)
  }


  ngOnDestroy(){
    
  }
}
