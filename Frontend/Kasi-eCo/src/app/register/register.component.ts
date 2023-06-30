import { Component, OnInit } from '@angular/core';
// import { UserService } from './user.service';
// import { tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fname: string = '';
  email: string = '';
  password: string = '';
  businessName: string = '';
  cell: string = '';
  image: string = '';
  address: string = '';


  constructor(
    //  private userService: UserService
    ) {}

  ngOnInit() {
    // Example initialization task
    this.fname = '';
    this.email = '';
    this.password = '';
    this.businessName = '';
    this.cell = '';
    this.address = '';
    this.image = '';
  }

  register() {
    // Perform registration logic
    // Assuming userService.registerUser() returns a Promise or Observable
  //   this.userService.registerUser( this.email, this.password, this.fname, this.businessName, this.cell, this.address, this.image, )
  //     .pipe(
  //       tap(
  //       () => {
  //         // Registration success, navigate to login page
  //         this.router.navigate(['/login']);
  //       },
  //       (error: any) => {
  //         // Registration failed, handle error
  //         console.error('Registration error:', error);
  //       }
  //     )
  //     )
  //     .subscribe
  }
}

