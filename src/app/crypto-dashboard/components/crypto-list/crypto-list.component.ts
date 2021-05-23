import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessariApiService } from '../../messari-api.service';
import { AssetData } from '../../models/messari-api.interface';

@Component({
    selector: 'crypto-list',
    styleUrls: ['crypto-list.component.css'],
    template: `
        <div *ngIf="coins" class="coins-container">
            <div class='coin-headers'>
                <div class='coin-header coin-symbol-col'>Symbol</div>
                <div class='coin-header coin-name-col'>Name</div>
                <div class='coin-header coin-price-col'>Price</div>
                <div class='coin-header coin-market-cap-col mobile-hide'>Mkt Cap</div>
                <div class='coin-header coin-24hr-col mobile-hide'>24hr</div>
            </div>
        <div *ngFor="let coin of coins" class='coin-row' (click)='handleView(coin.id)'>
            <div class="coin-symbol-div coin-symbol-col">
                <div>
                    <img src="https://messari.io/asset-images/{{coin.id}}/32.png?v=2" alt="">
                </div>
                <div class="coin-symbol">{{ coin.symbol }}</div>
            </div> 
            <div class="coin-name coin-name-col">
                {{ coin.name }}
            </div>
            <div class="coin-price coin-price-col">
                <div class="coin-price-div">{{ coin.metrics.market_data.price_usd | currency}}</div>
            </div>
            <div 
                class="coin-market-cap-col mobile-hide"
            >
                {{ coin.metrics.marketcap.current_marketcap_usd | currency }}
            </div>
            <div 
                class="coin-percent coin-price-24-hour coin-24hr-col mobile-hide"
                [ngClass]="{ 
                    'positive': coin.metrics.market_data.percent_change_usd_last_24_hours > 0,
                    'negative': coin.metrics.market_data.percent_change_usd_last_24_hours < 0
                }"
            >
                {{ coin.metrics.market_data.percent_change_usd_last_24_hours | number }}%
            </div>
        </div>
        <div class='coin-footer'>
            <button (click)="previousPage()" [disabled]="currentPage === 1"><i-feather name="arrow-left-circle"></i-feather></button>
            Current Page: {{ currentPage }}
            <button (click)="nextPage()"><i-feather name="arrow-right-circle"></i-feather></button>
        </div>
    </div>`
})
export class CryptoListComponent implements OnInit {

    // coins: Observable<Datum[]> | undefined;
    coins: AssetData[] | undefined;
    currentPage: number = 1;

    private get fields() {
        return [ 
            'id',
            'symbol', 
            'name', 
            'metrics/market_data/price_usd',
            'metrics/market_data/percent_change_usd_last_1_hour',
            'metrics/market_data/percent_change_usd_last_24_hours',
            'metrics/marketcap/current_marketcap_usd'
        ]
    }

    constructor(
        private apiService: MessariApiService,
        private router: Router
    ) { }

    ngOnInit() {
            this.callAPI(1)
            .subscribe( (data) => {
                this.coins = data;
            })
     }

     nextPage() {
        this.callAPI( this.currentPage + 1)
        .subscribe( (data) => {
            this.coins = data;
            this.currentPage++;
        })
     }

     previousPage() {
        this.callAPI( this.currentPage - 1)
        .subscribe( (data) => {
            this.coins = data;
            this.currentPage--;
        })
     }

     callAPI(page: number): Observable<AssetData[]> {
        return this.apiService
            .getAssetsV2({
                page: page,
                fields: this.fields.join(',')
            });
     }

     handleView(id: string) {
        this.router.navigate(['/dashboard', id])
     }
}