import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallPostsForAdminComponent } from './getall-posts-for-admin.component';

describe('GetallPostsForAdminComponent', () => {
  let component: GetallPostsForAdminComponent;
  let fixture: ComponentFixture<GetallPostsForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetallPostsForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetallPostsForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
