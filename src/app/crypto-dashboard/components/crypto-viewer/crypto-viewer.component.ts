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
                <button (click)="goBack()"><i-feather name="arrow-left-circle"></i-feather></button>
            </div>
            <div *ngIf="coin" class="coin-profile">
                <div class="coin-profile-header">
                    <div class="coin-name">{{ coin?.name }}</div> 
                    <div class="coin-symbol">({{ coin?.symbol }})</div>
                    <div class="coin-price"> 
                        <div *ngIf="coinPrice > 1; else lessThanOne">
                            {{ coinPrice | currency }}
                        </div>
                        <ng-template #lessThanOne>
                            {{ coinPrice | currency:'USD':'symbol':'1.2-5' }}
                        </ng-template>
                    </div>
                </div>
                <br />
                    <div>Max Supply: {{ profile?.profile?.economics?.consensus_and_emission?.supply?.max_supply | currency }}</div>
                <br />
                <div [innerHTML]="profile?.profile?.general?.overview?.project_details"></div>
                <br />
                <div class="info-card">

                </div>
                <div class="offical-links-secion">
                    <div *ngFor="let link of profile?.profile?.general?.overview?.official_links">
                        <a [href]="link?.link" target="_blank">{{ link?.name}}</a>
                    </div>
                </div>
                <br />
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
            'profile/general/overview',
            'profile/economics/consensus_and_emission/supply/max_supply'
        ]  
    };
    private get updatedPriceFields() {
        return [
            'id',
            'market_data/price_usd'
        ]
    };

    get coinPrice() {
        return this.coin?.market_data?.price_usd ?? 0;
    }

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

    getPercision() {

    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}