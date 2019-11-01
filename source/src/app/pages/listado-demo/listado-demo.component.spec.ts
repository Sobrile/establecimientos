import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDemoComponent } from './listado-demo.component';

describe('ListadoDemoComponent', () => {
  let component: ListadoDemoComponent;
  let fixture: ComponentFixture<ListadoDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
