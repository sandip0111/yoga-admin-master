import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCourseComponent } from './sub-course.component';

describe('SubCourseComponent', () => {
  let component: SubCourseComponent;
  let fixture: ComponentFixture<SubCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
