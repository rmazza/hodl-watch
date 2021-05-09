import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'crypto-dashboard',
    styleUrls: ['crypto-dashboard.component.css'],
    template: `
        <div class="app">
<<<<<<< HEAD
            <h1>Trakr</h1>
            <div *ngIf="coins" class="coins-container">
                <div class='coin-headers'>
                    <div></div>
                    <div class='coin-header'>Symbol</div>
                    <div class='coin-header'>Name</div>
                    <div class='coin-header coin-price-usd'>Price</div>
                    <div class='coin-header coin-percent'>1hr change</div>
                    <div class='coin-header coin-percent'>24hr change</div>
                </div>
                <div *ngFor="let coin of coins" class='coin-row' (click)='handleView(coin.id)'>
                    <div class="coin-image">
                        <img src="https://messari.io/asset-images/{{coin.id}}/32.png?v=2" alt="">
                    </div>
                    <div class="coin-symbol">
                        {{ coin.symbol }}
                    </div> 
                    <div class="coin-name">
                        {{ coin.name }}
                    </div>
                    <div class="coin-price-usd">
                        {{ coin.metrics.market_data.price_usd | currency}}
                    </div>
                    <div 
                        class="coin-percent coin-price-1-hour"
                        [ngClass]="{ 
                            'positive': coin.metrics.market_data.percent_change_usd_last_1_hour > 0,
                            'negative': coin.metrics.market_data.percent_change_usd_last_1_hour < 0
                        }"
                    >
                        {{ coin.metrics.market_data.percent_change_usd_last_1_hour | number }}%
                    </div>
                    <div 
                        class="coin-percent coin-price-24-hour"
                        [ngClass]="{ 
                            'positive': coin.metrics.market_data.percent_change_usd_last_24_hours > 0,
                            'negative': coin.metrics.market_data.percent_change_usd_last_24_hours < 0
                        }"
                    >
                        {{ coin.metrics.market_data.percent_change_usd_last_24_hours | number }}%
                    </div>
                </div>
                <div class='coin-footer'>
                    <button (click)="previousPage()" [disabled]="currentPage === 1">Back</button>
                    Current Page: {{ currentPage }}
                    <button (click)="nextPage()">Next</button>
                </div>
=======
            <div class="coin-header">
                <h3>Trakr</h3>
            </div>
            <div class="coin-main">
                <router-outlet></router-outlet>
            </div>
            <div class="coin-news">
<<<<<<< HEAD
>>>>>>> f9b6c03... save
=======
                <crypto-news></crypto-news>
>>>>>>> a61ff6c... added news component
            </div>
        </div>
    `
})
export class CryptoDashboardComponent implements OnInit {
  
    // coins: Observable<Datum[]> | undefined

    constructor(

    ) { }

    ngOnInit() {
     }
}