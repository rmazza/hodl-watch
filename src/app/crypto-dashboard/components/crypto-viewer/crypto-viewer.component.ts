import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { throwError, Subscription, interval } from 'rxjs'; 
import { switchMap } from 'rxjs/operators';

// interfaces
import { MessariApiService } from '../../messari-api.service';
import { AssetMarketData, Data } from '../../models/messari-api.market-data.interface';

@Component({
    selector: 'crypto-viewer',
    styleUrls: ['crypto-viewer.component.css'],
    template: `
        <div class="coin-profile-container">
            <div>
                <button (click)="goBack()">Back</button>
            </div>
            <div *ngIf="coin" class="coin-profile">
                <div>
                    <span class="coin-name">{{ coin?.name }}</span> 
                    <span class="coin-symbol">{{ coin?.symbol }}</span>
                    <span class="coin-price"> {{ coin?.market_data?.price_usd | currency }}</span>
                </div>
            </div>
        </div>
    `
})
export class CryptoViewerComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();
    private get initialFields() {
        return [ 
            'id',
            'symbol', 
            'name',
            'market_data/price_usd'
        ]
    };
    private get updatedPriceFields() {
        return [
            'id',
            'market_data/price_usd'
        ]
    }
    coin: Data | undefined;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: MessariApiService) { }
    
    ngOnInit() {
        const httpParams: HttpParams = new HttpParams();
        httpParams.set('fields', this.initialFields.join(','));

        this.subscriptions.add(this.route.params
            .pipe(
                switchMap((params: Params) => {
                    if (params) {
                        return this.apiService.getAssetMarketData(params.id, httpParams);
                    }
                    return throwError('No id present');
                })
            )
            .subscribe( (data: AssetMarketData) => {
                this.coin = data.data;
            }));
    }

    ngAfterViewInit() {
        const httpParams: HttpParams = new HttpParams();
        httpParams.set('fields', this.updatedPriceFields.join(','));

        const updatedPriceSub$ = interval(3000).pipe(
            switchMap(() => this.apiService.getAssetMarketData(this.coin?.id, httpParams))
        )
        .subscribe((data: AssetMarketData) => {
            this.coin = Object.assign({}, this.coin, data.data);
        });

        this.subscriptions.add(updatedPriceSub$);
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}