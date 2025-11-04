import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreathDtoxComponent } from './breath-dtox.component';

describe('BreathDtoxComponent', () => {
  let component: BreathDtoxComponent;
  let fixture: ComponentFixture<BreathDtoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreathDtoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreathDtoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
