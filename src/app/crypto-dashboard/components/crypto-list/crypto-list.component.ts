import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessariApiService } from '../../messari-api.service';
import { Datum } from '../../models/messari-api.interface';

@Component({
    selector: 'crypto-list',
    styleUrls: ['crypto-list.component.css'],
    template: `
        <div *ngIf="coins" class="coins-container">
            <div class='coin-headers'>
                <div class='coin-header flex-basis-10'>Symbol</div>
                <div class='coin-header'>Name</div>
                <div class='coin-header coin-price-usd'>Price</div>
                <div class='coin-header coin-percent'>1hr change</div>
                <div class='coin-header coin-percent'>24hr change</div>
            </div>
        <div *ngFor="let coin of coins" class='coin-row' (click)='handleView(coin.id)'>
            <div class="coin-symbol flex-basis-10">
                <div class="coin-image">
                    <img src="https://messari.io/asset-images/{{coin.id}}/32.png?v=2" alt="">
                </div>
                <div>{{ coin.symbol }}</div>
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
    </div>`
})
export class CryptoListComponent implements OnInit {

    // coins: Observable<Datum[]> | undefined;
    coins: Datum[] | undefined;
    currentPage: number = 1;

    private get fields() {
        return [ 
            'id',
            'symbol', 
            'name', 
            'metrics/market_data/price_usd',
            'metrics/market_data/percent_change_usd_last_1_hour',
            'metrics/market_data/percent_change_usd_last_24_hours'

        ]
    }

    constructor(
        private apiService: MessariApiService,
        private router: Router
    ) { }

    ngOnInit() {
        // this.coins = interval(3000)
        // .pipe(
        //     switchMap(() => this.callAPI())
        // )
        // interval(3000)
        //     .pipe(
        //         switchMap(() => this.callAPI())
        //     )
        //     .subscribe( (data) => {
        //         this.coins = data;
        //     })

            this.callAPI()
            .subscribe( (data) => {
                this.coins = data;
            })
     }

     nextPage() {
        this.callAPI()
        .subscribe( (data) => {
            this.coins = data;
            this.currentPage++;
        })
     }

     previousPage() {
        this.callAPI()
        .subscribe( (data) => {
            this.coins = data;
            this.currentPage--;
        })
     }

     callAPI(): Observable<Datum[]> {
        return this.apiService
            .getAssetsV2({
                page: this.currentPage,
                fields: this.fields.join(',')
            });
     }

     handleView(id: string) {
        this.router.navigate(['/dashboard', id])
     }
}