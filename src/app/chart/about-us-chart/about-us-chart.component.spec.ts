import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsChartComponent } from './about-us-chart.component';

describe('AboutUsChartComponent', () => {
  let component: AboutUsChartComponent;
  let fixture: ComponentFixture<AboutUsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutUsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
