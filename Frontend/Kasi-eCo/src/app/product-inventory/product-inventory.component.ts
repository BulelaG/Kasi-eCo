
import { Component, OnInit } from '@angular/core';
import { ProductInventoryService } from '../services/product-inventory.service';
import { Product } from '../products';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProductService } from '../services/product.service';



@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.css']
})


export class ProductInventoryComponent implements OnInit {
  products: any;
  form: any = {
    p_name:null,
    description:null,
    price:null,
    category:null,
    image:null
  };
  authService: any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private productInventoryService: ProductInventoryService, 
    authService: AuthService,  
    private productService: ProductService
    ) {
    this.productInventoryService = productInventoryService;
    this.authService = authService;

  }

  // ngOnInit() {

  //   this.getAllProducts();
  // }

  ngOnInit(): void {
    
  }





  getProducts(): void {
    this.productInventoryService.getProducts()
    .subscribe((products: any[]) => this.products = products);
  }


//   /** GET product by id. Will 404 if id not found */
// getProduct(id: number): Observable<Product> {
//   const url = `${this.heroesUrl}/${id}`;
//   return this.http.get<Hero>(url).pipe(
//     tap(_ => this.log(`fetched hero id=${id}`)),
//     catchError(this.handleError<Hero>(`getHero id=${id}`))
//   );
// }

onSubmit(): void {
  const { p_name, category, description, price, image } = this.form;
  console.log(this.form)
  this.productService.addProduct(p_name, category, description, price, image ).subscribe({
    next: (data: any) => {
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      // this.reloadPage();
    },
    error: (err: { error: { message: string; }; }) => {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    }
  });
}


  delete(product: Product): void {
    this.productInventoryService.deleteProduct(product.id).subscribe(() => {
      this.products = this.products.filter((p: Product) => p !== product);
      console.log(`Deleted product with ID: ${product.id}`);
    });
  }

  handleImageInput(event: any): void {
    const file: File = event.target.files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.form.image = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
