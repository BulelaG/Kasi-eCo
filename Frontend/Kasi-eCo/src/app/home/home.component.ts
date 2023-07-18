import { Component, OnInit } from '@angular/core';
import { Trader } from '../trader';
import { TraderService } from '../services/trader.service';
import { Product } from '../products';
// import { AuthService } from '../_services/auth.service';
// import { TokenStorageService } from '../_services/token-storage.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  traders: Trader[] = [];
  products:any;


  constructor(
    private traderService: TraderService,
    private productService: ProductService
    ) {    
      this.productService = productService;
    }

  ngOnInit(): void {
    this.getTraders();
    this.getAllProducts();

  }

  getTraders(): void {
    this.traderService.getTraders().subscribe((traders: Trader[]) => {
      this.traders = traders.slice(0, 4); // Display only the first 4 traders
    });
  }

  addToCart(trader: Trader): void {
    // Implement the logic to add the trader's products to the cart
    console.log('Adding trader to cart:', trader);
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


