import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDataTableComponent } from './filter-data-table.component';

describe('FilterDataTableComponent', () => {
  let component: FilterDataTableComponent;
  let fixture: ComponentFixture<FilterDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
