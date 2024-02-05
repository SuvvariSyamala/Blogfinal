import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetuserbyidComponent } from './getuserbyid.component';

describe('GetuserbyidComponent', () => {
  let component: GetuserbyidComponent;
  let fixture: ComponentFixture<GetuserbyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetuserbyidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetuserbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
