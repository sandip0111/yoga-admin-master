import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalSpiritualityComponent } from './functional-spirituality.component';

describe('FunctionalSpiritualityComponent', () => {
  let component: FunctionalSpiritualityComponent;
  let fixture: ComponentFixture<FunctionalSpiritualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalSpiritualityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalSpiritualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
