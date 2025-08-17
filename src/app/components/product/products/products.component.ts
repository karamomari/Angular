import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Iproduct } from '../../../models/iproduct';
import { CategoryService } from '../../../services/category.service';
import { ProductsService } from '../../../services/products.service';
import { ICategory } from '../../../models/ICategory';
import { NiceNumberPipePipe } from '../../../pipe/nice-number-pipe.pipe';
import Swal from 'sweetalert2';
import { CartComponent } from '../../cartcomponent/cart/cart.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, CartComponent, NiceNumberPipePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  @ViewChild('Nextbtn') Nextbtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('Prebtn') Prevbtn!: ElementRef<HTMLButtonElement>;
  allProducts: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  categorys: ICategory[] = []

  currentPage = 0;
  pageSize: number = 12;
  totalProducts = 100;


  constructor(private productService: ProductsService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (cats) => {
        this.categorys = cats;
      },
      error: (err) => {
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question"
        });
      }
    });

    this.loadProducts();
  }



  loadProducts() {
    const skip = this.currentPage * this.pageSize;
    this.productService.GetAllProdectWithNext(skip, this.pageSize).subscribe({
      next: (res) => {
        this.allProducts = res;
        this.filteredProducts = [...this.allProducts];
        this.filterProducts()
      },
      error: (err) => {
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question"
        });
      }
    });
  }

  filterProductsByTitle() {
    this.filteredProducts = this.allProducts.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  filterProducts(): void {
    if (this.selectedCategory == '') {
      this.filteredProducts = this.allProducts
    }
    else {
      this.categoryService.getProductsByCategory(this.selectedCategory).subscribe({
        next: (res) => {
          this.filteredProducts = res.products;
          this.CheakNextAndPre()
        },
        error: (err) => {
          alert('Error loading category products: ' + err)
          Swal.fire({
            title: "The Internet?",
            text: "That thing is still around?",
            icon: "question"
          });
        }
      });
    }
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 0;
    this.filterProducts();
  }


  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.totalProducts) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts();
    }
  }


  private CheakNextAndPre() {
    this.Prevbtn.nativeElement.disabled = (this.currentPage === 0);
    this.Nextbtn.nativeElement.disabled = (this.filteredProducts.length < this.pageSize);

  }

}