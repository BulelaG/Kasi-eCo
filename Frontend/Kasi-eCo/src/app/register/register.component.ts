import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    // Example initialization task
    this.username = '';
    this.email = '';
    this.password = '';
  }

  register() {
    // Perform registration logic
    // Assuming userService.registerUser() returns a Promise or Observable
    this.userService.registerUser(this.username, this.email, this.password)
      .subscribe(
        () => {
          // Registration success, navigate to login page
          this.router.navigate(['/login']);
        },
        (error: any) => {
          // Registration failed, handle error
          console.error('Registration error:', error);
        }
      );
  }
}

