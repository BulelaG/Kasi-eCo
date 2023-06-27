import { Component, OnInit } from '@angular/core';
import { Trader } from '../trader';
import { TraderService } from '../trader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  traders: Trader[] = [];

  constructor(private traderService: TraderService) { }

  ngOnInit(): void {
    this.getTraders();
  }

  getTraders(): void {
    this.traderService.getTraders()
      .subscribe(traders => this.traders = traders.slice(1, 5));
  }
}