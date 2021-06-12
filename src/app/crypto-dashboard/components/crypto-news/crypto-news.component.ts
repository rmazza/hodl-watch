import { HttpParams } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { QueryList } from '@angular/core';
import { Component, Input, OnInit, Renderer2, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessariApiService } from '../../messari-api.service';
import { News, NewsData as NewsArticles } from '../../models/messari-api.news.interface';

@Component({
    selector: 'crypto-news',
    styleUrls: ['crypto-news.component.css'],
    template: `
        <div class="news-container">
                <article #newsCard *ngFor="let newsArticle of news" [id]="newsArticle.id"  class="news-card">
                    <div class="news-card-header" title="click to expand" (click)="onClick(newsArticle.id)">
                        <div>{{ newsArticle.title }}</div>
                        <div class="news-card-footer">
                            <span class="news-card-footer-author">By {{ newsArticle.author?.name }}</span>
                            <span class="news-card-footer-published-date">{{ newsArticle.published_at | date }}</span>
                        </div>
                    </div>
                    <markdown [data]="newsArticle.content"></markdown>
                </article>
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

    @ViewChildren("newsCard", { read: ElementRef }) 
    newsCards: QueryList<ElementRef> | undefined;

    constructor(
        private messariApi: MessariApiService,
        private renderer2: Renderer2
    ) { }

    ngOnInit() {
        const newsSub$ = this.messariApi.getNews()
            .subscribe( (news: News) => this.news = news.data );

        this.subscription.add(newsSub$);
    }

    onClick(event: any) {
        const ele: HTMLElement = this.newsCards?.find(x => x.nativeElement.id === event)?.nativeElement;
        if (ele) {
            ele.classList.toggle('expand');
        } else {
            console.error("unable to query news-card element.")
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
  