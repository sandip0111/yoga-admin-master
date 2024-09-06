import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInquiryComponent } from './contact-inquiry.component';

describe('ContactInquiryComponent', () => {
  let component: ContactInquiryComponent;
  let fixture: ComponentFixture<ContactInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
