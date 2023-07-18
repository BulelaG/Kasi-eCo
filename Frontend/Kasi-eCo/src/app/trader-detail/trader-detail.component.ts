import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TraderService } from '../services/trader.service';

@Component({
  selector: 'app-trader-detail',
  templateUrl: './trader-detail.component.html',
  styleUrls: ['./trader-detail.component.css']
})
export class TraderDetailComponent implements OnInit {
  trader: any;

  constructor(
    private route: ActivatedRoute,
    private traderService: TraderService
  ) { }

  
  ngOnInit(){
    this.getOne()
  }

  getOne(){
    let id = this.route.snapshot.paramMap.get("id");
    this.traderService.getTrader(id).subscribe(
      (data: any) => {
        this.trader = data; // Assign the data directly to the trader property
        console.log("Trader Data:", this.trader); // Log the trader data to the console
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  

  // ngOnInit(): void {
  //   this.getAll()
  // }

  getAll(){
    let id = this.route.snapshot.paramMap.get("id")
    console.log(id)
    this.traderService.getAll(id).subscribe({
      next: (data: any) => {
        this.trader = data
        console.log(this.trader)
      }
    })
  }
}