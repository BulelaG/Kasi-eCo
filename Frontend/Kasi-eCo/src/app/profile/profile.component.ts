import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { TraderService } from '../services/trader.service';
import { Trader } from '../trader';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  currentUser: any;
  traders: any;
  
  constructor(
    private token: TokenStorageService,
    private traderService: TraderService) { }
  ngOnInit(): void {
    if(!window.sessionStorage.getItem('auth-token')) {
      // alert("Please sign in or Login or Register")
      return window.location.replace('/home');
    }
    this.currentUser = this.token.getUser();

  }

  logout(): void {
    this.token.signOut();
    window.location.replace('/home')
    
  }

  delete() {
    this.traderService.deleteTrader(this.currentUser.id).subscribe({
      next: data => {
        console.log(data)
        this.logout()
      },
      error: e => {
        console.error(e.error)
      }
    })
  }

  
}



