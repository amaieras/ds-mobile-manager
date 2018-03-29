import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsShowComponent } from './reports-show.component';

describe('ReportsShowComponent', () => {
  let component: ReportsShowComponent;
  let fixture: ComponentFixture<ReportsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
