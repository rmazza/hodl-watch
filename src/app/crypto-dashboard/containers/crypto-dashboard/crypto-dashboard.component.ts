import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'crypto-dashboard',
    styleUrls: ['crypto-dashboard.component.css'],
    template: `
        <div class="app">
            <div class="coin-header">
                <h1>Trakr</h1>
            </div>
            <div class="coin-main">
                <router-outlet></router-outlet>
            </div>
            <div class="coin-news">
                <crypto-news></crypto-news>
            </div>
        </div>
    `
})
export class CryptoDashboardComponent implements OnInit {
  
    // coins: Observable<Datum[]> | undefined

    constructor(

    ) { }

    ngOnInit() {
     }
}