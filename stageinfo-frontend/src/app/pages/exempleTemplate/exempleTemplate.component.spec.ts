import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExempleTemplateComponent } from './exempleTemplate.component';

describe('ExempleTemplateComponent', () => {
  let component: ExempleTemplateComponent;
  let fixture: ComponentFixture<ExempleTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExempleTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExempleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
