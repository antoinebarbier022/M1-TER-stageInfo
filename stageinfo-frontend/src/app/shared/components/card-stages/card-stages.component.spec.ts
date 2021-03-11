import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStagesComponent } from './card-stages.component';

describe('CardStagesComponent', () => {
  let component: CardStagesComponent;
  let fixture: ComponentFixture<CardStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
