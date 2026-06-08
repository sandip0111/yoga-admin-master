import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PranayamaCertificationDashboardComponent } from './pranayama-certification-dashboard.component';

describe('PranayamaCertificationDashboardComponent', () => {
  let component: PranayamaCertificationDashboardComponent;
  let fixture: ComponentFixture<PranayamaCertificationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PranayamaCertificationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PranayamaCertificationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
