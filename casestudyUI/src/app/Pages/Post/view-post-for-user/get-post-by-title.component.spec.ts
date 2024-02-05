import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPostByTitleComponent } from './get-post-by-title.component';

describe('GetPostByTitleComponent', () => {
  let component: GetPostByTitleComponent;
  let fixture: ComponentFixture<GetPostByTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetPostByTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetPostByTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
