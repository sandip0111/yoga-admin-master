import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PranaArambhComponent } from './prana-arambh.component';

describe('PranaArambhComponent', () => {
  let component: PranaArambhComponent;
  let fixture: ComponentFixture<PranaArambhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PranaArambhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PranaArambhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
