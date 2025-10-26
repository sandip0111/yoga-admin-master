import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeWebinnerComponent } from './free-webinner.component';

describe('FreeWebinnerComponent', () => {
  let component: FreeWebinnerComponent;
  let fixture: ComponentFixture<FreeWebinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeWebinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeWebinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
