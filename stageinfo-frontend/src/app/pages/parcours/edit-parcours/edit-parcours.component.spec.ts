import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParcoursComponent } from './edit-parcours.component';

describe('EditParcoursComponent', () => {
  let component: EditParcoursComponent;
  let fixture: ComponentFixture<EditParcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditParcoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
