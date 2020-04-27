import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopIncreaseComponent } from './top-increase.component';

describe('TopIncreaseComponent', () => {
  let component: TopIncreaseComponent;
  let fixture: ComponentFixture<TopIncreaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopIncreaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopIncreaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
