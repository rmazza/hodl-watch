import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessariApiService } from '../../messari-api.service';
import { News, NewsData as NewsArticles } from '../../models/messari-api.news.interface';

@Component({
    selector: 'crypto-news',
    styleUrls: ['crypto-news.component.css'],
    template: `
        <div class="news-container">
            <div *ngIf="showNewsBar">
                <h3>News</h3>
                <div *ngFor="let newsArticle of news"  class="news-card">
                    <div class="news-card-title">
                        <a [href]="newsArticle.url" target="_blank">{{ newsArticle.title }}</a>
                    </div>
                    <div class="new-card-author">
                        {{ newsArticle.author.name }}
                    </div>
                </div>
            </div>
        </div>
    `
})
export class CryptoNewsComponent implements OnInit {
    news: NewsArticles[] | undefined;

    private subscription: Subscription = new Subscription();

    get hasNews(): boolean {
        return !this.news;
    }

    @Input()
    showNewsBar: boolean = true;

    constructor(
        private messariApi: MessariApiService
    ) { }

    ngOnInit() {
        const newsSub$ = this.messariApi.getNews()
            .subscribe( (news: News) => this.news = news.data );

        this.subscription.add(newsSub$);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
  