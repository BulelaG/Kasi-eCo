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
  delete(trader: Trader): void {
    this.traderService.deleteTrader(this.currentUser.id).subscribe(() => {
      this.currentUser = this.currentUser.filter((t: Trader) => t !== trader);
      console.log(`Deleted trader with ID: ${this.currentUser.id}`);
    });
  }


  // trader: any
  // constructor( 
  //   private traderService: TraderService,
  //   private route: ActivatedRoute
  //   ){}

  // ngOnInit(){
  //   this.getOne()
  // }

  // getOne(){
  //   let id = this.route.snapshot.paramMap.get("id");
  //   this.traderService.getTrader(id).subscribe({
  //     next: data => {
  //       this.trader = data
  //       console.log(this.trader)
  //     },
  //     error: err => {
  //       console.log(err.message)
  //     }
  //   })
  // }
}



