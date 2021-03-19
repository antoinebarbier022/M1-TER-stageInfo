import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDeleteModalComponent } from './button-delete-modal.component';

describe('ButtonDeleteModalComponent', () => {
  let component: ButtonDeleteModalComponent;
  let fixture: ComponentFixture<ButtonDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonDeleteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
