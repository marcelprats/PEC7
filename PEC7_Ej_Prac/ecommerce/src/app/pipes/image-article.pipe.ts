import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageArticle'
})
export class ImageArticlePipe implements PipeTransform {
  private defaultImageUrl:string ='assets/images/article2.jpg'
  transform(imageUrl: string): string {
    if (imageUrl === '') {
      return this.defaultImageUrl;
    }
    return imageUrl;
  }
}



