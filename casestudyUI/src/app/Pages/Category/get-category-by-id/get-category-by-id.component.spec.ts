import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCategoryByIdComponent } from './get-category-by-id.component';

describe('GetCategoryByIdComponent', () => {
  let component: GetCategoryByIdComponent;
  let fixture: ComponentFixture<GetCategoryByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetCategoryByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetCategoryByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
