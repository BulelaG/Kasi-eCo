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
  @Input() traderId?: any;

  constructor(
    private route: ActivatedRoute,
    private traderService: TraderService
  ) { }

  ngOnInit(){
    this.getOne();
  }

  getOne(){
    const id = this.traderId || this.route.snapshot.paramMap.get("id");
    if (id) {
      this.traderService.getTrader(id).subscribe({
        next: data => {
          this.trader = data;
        },
        error: err => {
          console.log(err.message);
        }
      });
    }
  }

  getWhatsAppUrl(): string {
    if (!this.trader || !this.trader.cell) return '';
    let cleanNumber = ('' + this.trader.cell).replace(/\D/g, '');
    if (cleanNumber.startsWith('0')) {
      cleanNumber = '27' + cleanNumber.substring(1);
    }
    const message = `Hi ${this.trader.fname || ''}! I found your store "${this.trader.businessName || ''}" on Kasi-eCo.`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  }
}