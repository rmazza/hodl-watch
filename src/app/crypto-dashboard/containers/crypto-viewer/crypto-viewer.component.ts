import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { throwError } from 'rxjs'; 
import { switchMap } from 'rxjs/operators';

// interfaces
import { AssetProfileV2, Data } from '../../messari-api.profile.interface';
import { MessariApiService } from '../../messari-api.service';

@Component({
    selector: 'crypto-viewer',
    styleUrls: ['crypto-viewer.component.css'],
    template: `
        <button (click)="goBack()">Back</button>
        <div *ngIf="coin" class="coin-profile">
            <div>
                <span class="coin-name">{{ coin?.name }}</span> 
                <span class="coin-symbol">{{ coin?.symbol }}</span>
            </div>
        </div>
    `
})
export class CryptoViewerComponent implements OnInit {
    coin: Data | undefined;

    private get initialFields() {
        return [ 
            'id',
            'symbol', 
            'name'
        ]
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: MessariApiService) { }
    
    ngOnInit() {
        const httpParams: HttpParams = new HttpParams();
        httpParams.set('fields', this.initialFields.join(','));

        this.route.params
            .pipe(
                switchMap((params: Params) => {
                    if (params) {
                        return this.apiService.getAssetProfileV2(params.id, httpParams);
                    }
                    return throwError('No id present');
                })
            )
            .subscribe( (data: AssetProfileV2) => {
                this.coin = data.data;
            })
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }
}