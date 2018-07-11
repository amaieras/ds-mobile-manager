import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyChartComponent } from './money-chart.component';

describe('MoneyChartComponent', () => {
  let component: MoneyChartComponent;
  let fixture: ComponentFixture<MoneyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
