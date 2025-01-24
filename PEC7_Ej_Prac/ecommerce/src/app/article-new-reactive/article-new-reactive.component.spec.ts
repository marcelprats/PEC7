import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleNewReactiveComponent } from './article-new-reactive.component';

describe('ArticleNewReactiveComponent', () => {
  let component: ArticleNewReactiveComponent;
  let fixture: ComponentFixture<ArticleNewReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleNewReactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleNewReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
