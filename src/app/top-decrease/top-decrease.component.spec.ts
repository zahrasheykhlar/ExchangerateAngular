import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDecreaseComponent } from './top-decrease.component';

describe('TopDecreaseComponent', () => {
  let component: TopDecreaseComponent;
  let fixture: ComponentFixture<TopDecreaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopDecreaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDecreaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
