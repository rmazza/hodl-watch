import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { throwError } from 'rxjs'; 
import { switchMap } from 'rxjs/operators';

// interfaces
import { AssetProfileV2 } from '../../messari-api.profile.interface';
import { MessariApiService } from '../../messari-api.service';

@Component({
    selector: 'crypto-viewer',
    styleUrls: ['crypto-viewer.component.css'],
    template: ''
})
export class CryptoViewerComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: MessariApiService) { }
    
    ngOnInit() {
        this.route.params
            .pipe(
                switchMap((data: AssetProfileV2) => {
                    if (data.data?.id) {
                        return this.apiService.getAssetProfileV2(data.data?.id);
                    }
                    return throwError('No id present');
                })
            );
    }
}