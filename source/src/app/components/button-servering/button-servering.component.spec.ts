import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonServeringComponent } from './button-servering.component';

describe('ButtonServeringComponent', () => {
  let component: ButtonServeringComponent;
  let fixture: ComponentFixture<ButtonServeringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonServeringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonServeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
