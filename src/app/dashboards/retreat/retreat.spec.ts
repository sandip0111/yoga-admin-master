import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Retreat } from './retreat';

describe('Retreat', () => {
  let component: Retreat;
  let fixture: ComponentFixture<Retreat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Retreat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Retreat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
