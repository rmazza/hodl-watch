import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers
import { CryptoDashboardComponent } from './containers/crypto-dashboard/crypto-dashboard.component';
import { CryptoViewerComponent } from './containers/crypto-viewer/crypto-viewer.component';

// components

// services
import { MessariApiService } from './messari-api.service';

const routes: Routes = [
    {
        path: 'dashboard',
        children: [
            {
                path: '',
                component: CryptoDashboardComponent
            }, 
            {
                path: ':id',
                component: CryptoViewerComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        CryptoDashboardComponent,
        CryptoViewerComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        MessariApiService
    ]
})
export class CryptoDashboardModule { }