import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineLiveClassComponent } from './online-live-class.component';

describe('OnlineLiveClassComponent', () => {
  let component: OnlineLiveClassComponent;
  let fixture: ComponentFixture<OnlineLiveClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineLiveClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineLiveClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
