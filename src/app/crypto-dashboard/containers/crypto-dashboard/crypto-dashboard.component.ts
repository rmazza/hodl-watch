import { Component, OnInit } from '@angular/core';
import { NavLinks } from '../../models/nav-link.interface';

@Component({
    selector: 'crypto-dashboard',
    styleUrls: ['crypto-dashboard.component.css'],
    template: `
        <div class="app">
            <div class="coin-header">
                <div class="logo">Trakr</div>
                <div class="powered-by">Powered by Messari</div>
            </div>
            <nav  class="main-menu">
                <div *ngFor="let link of navLinks"
                    class="menu-link"
                    [routerLink]="link.url" 
                    routerLinkActive="active"
                    [routerLinkActiveOptions]="{ exact: link.exact }">
                    {{ link.title }}
                </div>
            </nav>
            <div class="main-content">
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})
export class CryptoDashboardComponent implements OnInit {
  
    navLinks: NavLinks[];

    constructor() {
        this.navLinks = [
            {
                title: 'Market Data',
                url: 'dashboard',
                exact: true
            },
            {
                title: 'News',
                url: 'news',
                exact: true
            }
        ];
     }

    ngOnInit() {
     }
}