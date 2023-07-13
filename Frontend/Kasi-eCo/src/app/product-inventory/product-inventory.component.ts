
import { Component, OnInit } from '@angular/core';
import { ProductInventoryService } from '../services/product-inventory.service';
import { Product } from '../products';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.css']
})


export class ProductInventoryComponent implements OnInit {
  products: any;

  constructor(private productInventoryService: ProductInventoryService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productInventoryService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
      },
      (error: any) => {
        console.error('Error occurred while retrieving products:', error);
      }
    );
  }


  getProducts(): void {
    this.productInventoryService.getProducts()
    .subscribe((products: any[]) => this.products = products);
  }


//   /** GET hero by id. Will 404 if id not found */
// getProduct(id: number): Observable<Product> {
//   const url = `${this.heroesUrl}/${id}`;
//   return this.http.get<Hero>(url).pipe(
//     tap(_ => this.log(`fetched hero id=${id}`)),
//     catchError(this.handleError<Hero>(`getHero id=${id}`))
//   );
// }




  add(p_name: string, description: string, category: any, price: string, image:string ): void {
    const ProductData = {
      p_name,
      description,
      price,
      category,
      image
     

    }   
    
    p_name = `{{ p_name.trim() }}`;
    if (!p_name) { return; }
    if (p_name.length < 3) {
      alert('Product name must be at least 3 characters long.');
      return;
    }
    this.productInventoryService.addProduct(ProductData)
      .subscribe( (product: any) => {
        this.products.push(product);
        console.log(product)
      });


     
  }

  delete(product: Product): void {
    this.productInventoryService.deleteProduct(product.id).subscribe(() => {
      this.products = this.products.filter((p: Product) => p !== product);
      console.log(`Deleted product with ID: ${product.id}`);
    });
  }
}