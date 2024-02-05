import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostsComponentComponent } from './my-posts-component.component';

describe('MyPostsComponentComponent', () => {
  let component: MyPostsComponentComponent;
  let fixture: ComponentFixture<MyPostsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPostsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyPostsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
