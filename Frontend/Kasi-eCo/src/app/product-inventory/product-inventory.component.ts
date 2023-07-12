import { Component } from '@angular/core';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.css']
})


import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductInventoryComponent implements OnInit {
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