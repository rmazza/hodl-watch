import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { throwError, Subscription, interval, forkJoin } from 'rxjs'; 
import { switchMap } from 'rxjs/operators';

// interfaces
import { AssetMarketData, Data } from '../../models/messari-api.market-data.interface';
import { ProfileData } from '../../models/messari-api.profile.interface';

// services
import { MessariApiService } from '../../messari-api.service';

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
                    <span class="coin-symbol">({{ coin?.symbol }})</span>
                    <span class="coin-price"> {{ coin?.market_data?.price_usd | currency }}</span>
                </div>
                <div [innerHTML]="profile?.profile?.general?.overview?.project_details"></div>
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
    private get profileFields() {
        return [
            'id',
            'profile/general/overview'
        ]  
    };
    private get updatedPriceFields() {
        return [
            'id',
            'market_data/price_usd'
        ]
    };

    coin: Data | undefined;
    profile: ProfileData | undefined;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: MessariApiService) { }
    
    ngOnInit() {
        const httpParamsMarketData: HttpParams = new HttpParams();
        httpParamsMarketData.set('fields', this.initialFields.join(','));

        const httpParamsProfile: HttpParams = new HttpParams();
        httpParamsProfile.set('fields', this.profileFields.join(','));

        this.subscriptions.add(this.route.params
            .pipe(
                switchMap((params: Params) => {
                    if (params) {
                        return forkJoin({
                            marketData: this.apiService.getAssetMarketData(params.id, httpParamsMarketData),
                            profileData: this.apiService.getAssetProfileV2(params.id, httpParamsProfile)
                        })
                    }
                    return throwError('No id present');
                })
            )
            .subscribe( ({marketData, profileData}) => {
                this.coin = marketData.data;
                this.profile = profileData.data;
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