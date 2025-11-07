import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseVideoComponent } from './add-course-video.component';

describe('AddCourseVideoComponent', () => {
  let component: AddCourseVideoComponent;
  let fixture: ComponentFixture<AddCourseVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
