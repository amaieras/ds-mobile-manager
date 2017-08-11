import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairPageComponent } from './repair-page.component';

describe('RepairPageComponent', () => {
  let component: RepairPageComponent;
  let fixture: ComponentFixture<RepairPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
