import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFunctionalityComponent } from './details-functionality.component';

describe('DetailsFunctionalityComponent', () => {
  let component: DetailsFunctionalityComponent;
  let fixture: ComponentFixture<DetailsFunctionalityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFunctionalityComponent]
    });
    fixture = TestBed.createComponent(DetailsFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
