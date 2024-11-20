import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarRegistrationComponent } from './webinar-registration.component';

describe('WebinarRegistrationComponent', () => {
  let component: WebinarRegistrationComponent;
  let fixture: ComponentFixture<WebinarRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
