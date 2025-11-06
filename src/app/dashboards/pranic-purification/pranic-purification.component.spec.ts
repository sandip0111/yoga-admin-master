import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PranicPurificationComponent } from './pranic-purification.component';

describe('PranicPurificationComponent', () => {
  let component: PranicPurificationComponent;
  let fixture: ComponentFixture<PranicPurificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PranicPurificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PranicPurificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
