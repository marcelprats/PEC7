import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Article } from "../models/article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(query?: string): Observable<Article[]> {
    return this.http.get<Article[]>(`http://localhost:3000/api/articles`, { params: { q: query } });
  }

  changeQuantity(articleID: number, changeInQuantity: number): Observable<any> {
    return this.http.patch('http://localhost:3000/api/articles/' + articleID, {changeInQuantity: changeInQuantity});
  }

  create(article: Article): Observable<Article> {
    return this.http.post<Article>('http://localhost:3000/api/articles', article);
  }
}

