import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastThirtyDaysComponent } from './last-thirty-days.component';

describe('LastThirtyDaysComponent', () => {
  let component: LastThirtyDaysComponent;
  let fixture: ComponentFixture<LastThirtyDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastThirtyDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastThirtyDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
