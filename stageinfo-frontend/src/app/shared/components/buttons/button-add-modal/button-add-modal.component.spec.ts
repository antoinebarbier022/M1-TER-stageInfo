import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddModalComponent } from './button-add-modal.component';

describe('ButtonAddModalComponent', () => {
  let component: ButtonAddModalComponent;
  let fixture: ComponentFixture<ButtonAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
