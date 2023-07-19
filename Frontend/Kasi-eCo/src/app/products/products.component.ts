// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../services/product.service';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {

//   products: any
//   constructor( private productService: ProductService ){}


//   ngOnInit() {
//     this.getAll()
//   }
  
//   getAll(){
//     this.productService.getAllProducts().subscribe({
//       next: data => {
//         this.products = data;
//         console.log(data)
//       },
//       error: err => {
//         console.error(err.message)
//       }
//     })
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm = '';

  constructor(private productService: ProductService, 
    private router: Router
    ) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        console.log(this.products)
        this.filteredProducts = [...this.products]; // Initialize filteredProducts with all products
      },
      (error) => {
        console.error('Error occurred while retrieving products:', error);
      }
    );
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredProducts = this.products.filter(product => {
        const searchTerm = this.searchTerm.toLowerCase().trim();
        const productName = (product.p_name || '').toLowerCase();
        return productName.includes(searchTerm);
      });
    } else {
      this.filteredProducts = [...this.products]; // Reset filteredProducts to all products
    }
  }

  viewProductDetails(product: any) {
    this.productService.navigate(['/product-detail', product.id]);
  }
}

