import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TraderService } from '../services/trader.service';

@Component({
  selector: 'app-trader-detail',
  templateUrl: './trader-detail.component.html',
  styleUrls: ['./trader-detail.component.css']
})
export class TraderDetailComponent implements OnInit {
  trader: any;
  @Input() traderId? : any
  constructor(
    private route: ActivatedRoute,
    private traderService: TraderService
  ) { }

  
  ngOnInit(){
    this.getOne()
  }

  getOne(){
    console.log(!this.traderId)
    if(!this.traderId){
      let id = this.route.snapshot.paramMap.get("id");
    this.traderService.getTrader(id).subscribe({
      next: data => {
        this.trader = data
        console.log(this.trader)
      },
      error: err => {
        console.log(err.message);
      }
  });
    } else {
      
    this.traderService.getTrader(this.traderId).subscribe({
      next: data => {
        this.trader = data
        console.log(this.trader)
      },
      error: err => {
        console.log(err.message);
      }
  });
    }
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