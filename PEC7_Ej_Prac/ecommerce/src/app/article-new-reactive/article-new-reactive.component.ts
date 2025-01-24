import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Article } from "src/app/models/article";
import { NameArticleValidator } from 'src/app/validators/name-article-validator';
import { ArticleService } from 'src/app/services/article.service';


@Component({
  selector: 'app-article-new-reactive',
  templateUrl: './article-new-reactive.component.html',
  styleUrls: ['./article-new-reactive.component.css']
})
export class ArticleNewReactiveComponent {

  @Output() private articleNew: EventEmitter<void> = new EventEmitter();

  public message = "";

  public article : FormGroup;
  
  constructor(private fb: FormBuilder,
    private articleService: ArticleService) {
    this.createForm();
  }


  createForm() {
    this.article = this.fb.group({
      name: ["", [Validators.required, NameArticleValidator.nameArticleValidator]],
      price: [0, [Validators.required, Validators.min(1)]],
      imageUrl: [
        "",
        [
          Validators.required,
          Validators.pattern("^http(s?)://[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(/S*)?$")
        ]
      ],
      isOnSale: false
    });
  }

  createWine() {
    if (this.article.valid) {
      console.log("Se han recogido los datos del formulario correctamente");
      let wine = {
        id: null,
        name: this.article.value.name,
        imageUrl: this.article.value.imageUrl,
        price: this.article.value.price,
        foodPairing: [],
        isOnSale: this.article.value.isOnSale,
        quantityInCart: 0
      }
      this.articleService.create(wine)
        .subscribe((msg) => {
          console.log(msg);
          this.articleNew.next();
        }, (err) => console.error(err));
    } else {
      console.error("Formulario inválido");
    }
  }
}
