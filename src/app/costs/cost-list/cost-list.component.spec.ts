import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostListComponent } from './cost-list.component';

describe('CostListComponent', () => {
  let component: CostListComponent;
  let fixture: ComponentFixture<CostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
