import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalGuidance } from './personal-guidance';

describe('PersonalGuidance', () => {
  let component: PersonalGuidance;
  let fixture: ComponentFixture<PersonalGuidance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalGuidance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalGuidance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
