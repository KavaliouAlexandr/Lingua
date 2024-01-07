import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityComponent } from './functionality.component';

describe('FunctionalityComponent', () => {
  let component: FunctionalityComponent;
  let fixture: ComponentFixture<FunctionalityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionalityComponent]
    });
    fixture = TestBed.createComponent(FunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
