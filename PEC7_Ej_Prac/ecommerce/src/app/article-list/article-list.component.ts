import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap,
  distinctUntilChanged, startWith, merge,
  share } from 'rxjs/operators';

import { Article } from "src/app/models/article";
import { ArticleQuantityChange } from "src/app/models/article-quantity-change";
import { ArticleService } from 'src/app/services/article.service';


@Component({
  selector: "app-article-list",
  template: `
   <div class="search">
      <input
        type="text" 
        name="searchBox"
        [(ngModel)]="searchString"
        placeholder="Search Here"
        (keyup)="search()">
    </div>
    <div class="list">
      <div *ngFor="let article of articles$ | async">
          <app-article-item (quantityChange) = "onQuantityChange($event)" [article]="article"></app-article-item>
      </div>
    </div>`,
  styles: [`.list {
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
  }
  .search {
    margin-top: 20px;
    display: flex;
    justify-content:center;
    align-items: center;
  }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent implements OnInit {
  public articles$: Observable<Article[]>;

  public searchString: string = '';
  private searchTerms: Subject<string> = new Subject();
  private reloadArticleList : Subject <void> = new Subject();

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articles$ = this.searchTerms.pipe(
      startWith(this.searchString),
      debounceTime(500),
      distinctUntilChanged(),
      merge(this.reloadArticleList),
      switchMap((q) => this.articleService.getArticles(this.searchString)));
  }

    
  onQuantityChange(change: ArticleQuantityChange) {
    this.articleService.changeQuantity(change.article.id, change.changeInQuantity)
      .subscribe((res) => {
        console.log(res.msg);
        this.reloadArticleList.next();
      });
  }

  search() {
    this.searchTerms.next(this.searchString);
  }

  onNew() {
    this.reloadArticleList.next();
  }
}

