import { Component, OnInit } from '@angular/core';


import { Trader } from '../trader';
import { TraderService } from '../services/trader.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.css']
})


export class TradersComponent implements OnInit {
  traders: Trader[] = [];
  
  constructor(private traderService: TraderService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTraders();
  }

  getTraders(): void {
    this.traderService.getTraders()
    .subscribe(traders => this.traders = traders);
  }

  add(trader_name: string, businessName: string, department: string ): void {
    const TraderData = {
      trader_name,
      businessName,
      department
     
    }   
    
    trader_name = trader_name.trim();
    if (!trader_name) { return; }
    this.traderService.addTrader(TraderData)
      .subscribe(trader => {
        this.traders.push(trader);
        console.log(trader)
      });

     
  }

  delete(trader: Trader): void {
    this.traderService.deleteTrader(trader.id).subscribe(() => {
      this.traders = this.traders.filter(h => h !== trader);
      console.log(`Deleted trader with ID: ${trader.id}`);
    });
  }

//   delete(_id:number ): void {
//     const id = this.route.snapshot.paramMap.get('id')
//     this.traderService.deleteTrader(id).subscribe(trader => {
//       console.log(trader);
//   });
//  }
} 
