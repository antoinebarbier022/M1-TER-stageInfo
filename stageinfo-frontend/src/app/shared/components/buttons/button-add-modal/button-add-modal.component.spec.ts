import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:stageinfo-frontend/src/app/shared/components/card-filter/card-filter.component.spec.ts
import { ListFilterComponent } from './card-filter.component';
=======
import { ButtonAddModalComponent } from './button-add-modal.component';
>>>>>>> 1df46e92a73d3f1211e56e339061ce4aca23c827:stageinfo-frontend/src/app/shared/components/buttons/button-add-modal/button-add-modal.component.spec.ts

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
