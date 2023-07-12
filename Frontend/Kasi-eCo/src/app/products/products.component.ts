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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: any[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (data: any[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error occurred while retrieving products:', error);
      }
    );
  }
}
