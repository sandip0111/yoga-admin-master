import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoHundredOnlineTtcComponent } from './two-hundred-online-ttc.component';

describe('TwoHundredOnlineTtcComponent', () => {
  let component: TwoHundredOnlineTtcComponent;
  let fixture: ComponentFixture<TwoHundredOnlineTtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoHundredOnlineTtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoHundredOnlineTtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
