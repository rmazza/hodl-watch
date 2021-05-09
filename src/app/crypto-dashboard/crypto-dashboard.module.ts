import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers
import { CryptoDashboardComponent } from './containers/crypto-dashboard/crypto-dashboard.component';

// components
import { CryptoViewerComponent } from './components/crypto-viewer/crypto-viewer.component';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';
import { CryptoNewsComponent } from './components/crypto-news/crypto-news.component';

// services
import { MessariApiService } from './messari-api.service';

const routes: Routes = [
    {
        path: 'dashboard',
        component: CryptoDashboardComponent,
        children: [
            {
                path: '',
                component: CryptoListComponent
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
        CryptoViewerComponent,
        CryptoListComponent,
        CryptoNewsComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        MessariApiService
    ],
    exports: [

    ]
})
export class CryptoDashboardModule { }