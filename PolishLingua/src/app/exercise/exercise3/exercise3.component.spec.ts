import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise3Component } from './exercise3.component';

describe('Exercise3Component', () => {
  let component: Exercise3Component;
  let fixture: ComponentFixture<Exercise3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Exercise3Component]
    });
    fixture = TestBed.createComponent(Exercise3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
