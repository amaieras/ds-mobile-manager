import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonesChartComponent } from './phones-chart.component';

describe('PhonesChartComponent', () => {
  let component: PhonesChartComponent;
  let fixture: ComponentFixture<PhonesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
