import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesStagesComponent } from './mes-stages.component';

describe('MesStagesComponent', () => {
  let component: MesStagesComponent;
  let fixture: ComponentFixture<MesStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesStagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
