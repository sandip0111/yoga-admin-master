import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwaraSadhanaComponent } from './swara-sadhana.component';

describe('SwaraSadhanaComponent', () => {
  let component: SwaraSadhanaComponent;
  let fixture: ComponentFixture<SwaraSadhanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwaraSadhanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwaraSadhanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
