import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsFilterComponent } from './reports-filter.component';

describe('ReportsFilterComponent', () => {
  let component: ReportsFilterComponent;
  let fixture: ComponentFixture<ReportsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
