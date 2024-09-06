import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineVideoUploadComponent } from './online-video-upload.component';

describe('OnlineVideoUploadComponent', () => {
  let component: OnlineVideoUploadComponent;
  let fixture: ComponentFixture<OnlineVideoUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineVideoUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineVideoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
