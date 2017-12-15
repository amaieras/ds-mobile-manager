import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneDetailedComponent } from './phone-detailed.component';

describe('PhoneDetailedComponent', () => {
  let component: PhoneDetailedComponent;
  let fixture: ComponentFixture<PhoneDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
