import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { IconsModule } from '../icons/icons.module';
import { MarkdownModule } from 'ngx-markdown';

// containers
import { CryptoDashboardComponent } from './containers/crypto-dashboard/crypto-dashboard.component';

// components
import { CryptoViewerComponent } from './components/crypto-viewer/crypto-viewer.component';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';
import { CryptoNewsComponent } from './components/crypto-news/crypto-news.component';

// services
import { MessariApiService } from './messari-api.service';

const routes: Routes = [
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        component: CryptoListComponent
    },
    {
        path: 'dashboard/:id',
        component: CryptoViewerComponent
    }, 
    {
        path: 'news',
        component: CryptoNewsComponent
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
        RouterModule.forRoot(routes),
        MarkdownModule.forRoot(),
        IconsModule
    ],
    providers: [
        MessariApiService
    ],
    exports: [
        CryptoDashboardComponent
    ]
})
export class CryptoDashboardModule { }