import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCommentsComponent } from './get-all-comments.component';

describe('GetAllCommentsComponent', () => {
  let component: GetAllCommentsComponent;
  let fixture: ComponentFixture<GetAllCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
