
import { Component, OnInit } from '@angular/core';
import { ProductInventoryService } from '../services/product-inventory.service';
import { Product } from '../products';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';



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
  selectedImage: any;

  constructor(private productInventoryService: ProductInventoryService, authService: AuthService,  private tokenStorage: TokenStorageService) {
    this.productInventoryService = productInventoryService;
    this.authService = authService;
    this.tokenStorage = tokenStorage;

  }

  // ngOnInit() {

  //   this.getAllProducts();
  // }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.getAllProducts();
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


  getAllProducts(){
    this.productInventoryService.getProducts().subscribe(
      (data: any) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
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

  this.authService.addProduct(p_name, category, description, price, image ).subscribe({
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



  add(p_name: string, description: string, category: any, price: string, image: any ): void {
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

  handleImageInput(event: any): void {
    const file: File = event.target.files[0];
    this.convertToBase64(file);
  }

  getSelectedImageURL(): string | undefined {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = () => {
        // The 'result' property contains the base64 data URL
        return reader.result as string;
      };
    }
    return undefined;
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.form.image = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
