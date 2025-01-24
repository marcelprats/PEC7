import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleNewReactiveComponent } from './article-new-reactive/article-new-reactive.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { ImageArticlePipe } from './pipes/image-article.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArticleListComponent,
    ArticleNewReactiveComponent,
    ArticleItemComponent,
    ImageArticlePipe,
    LoginComponent,
    RegisterComponent,
    ArticleDetailComponent,
    CreateArticleComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
