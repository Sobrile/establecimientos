import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspeccionesProgramadasComponent } from './inspecciones-programadas.component';

describe('InspeccionesProgramadasComponent', () => {
  let component: InspeccionesProgramadasComponent;
  let fixture: ComponentFixture<InspeccionesProgramadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspeccionesProgramadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspeccionesProgramadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
