import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcommentsforadminComponent } from './getcommentsforadmin.component';

describe('GetcommentsforadminComponent', () => {
  let component: GetcommentsforadminComponent;
  let fixture: ComponentFixture<GetcommentsforadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetcommentsforadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetcommentsforadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
