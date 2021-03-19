import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEditModalComponent } from './button-edit-modal.component';

describe('ButtonEditModalComponent', () => {
  let component: ButtonEditModalComponent;
  let fixture: ComponentFixture<ButtonEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
