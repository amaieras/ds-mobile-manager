import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientChartComponent } from './client-chart.component';

describe('ClientChartComponent', () => {
  let component: ClientChartComponent;
  let fixture: ComponentFixture<ClientChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
