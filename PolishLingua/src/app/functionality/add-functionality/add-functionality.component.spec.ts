import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFunctionalityComponent } from './add-functionality.component';

describe('AddFunctionalityComponent', () => {
  let component: AddFunctionalityComponent;
  let fixture: ComponentFixture<AddFunctionalityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFunctionalityComponent]
    });
    fixture = TestBed.createComponent(AddFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
