import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUsersByRolesComponent } from './get-users-by-roles.component';

describe('GetUsersByRolesComponent', () => {
  let component: GetUsersByRolesComponent;
  let fixture: ComponentFixture<GetUsersByRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetUsersByRolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetUsersByRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
