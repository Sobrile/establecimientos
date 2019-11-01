import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaViewComponent } from './grilla-view.component';

describe('GrillaViewComponent', () => {
  let component: GrillaViewComponent;
  let fixture: ComponentFixture<GrillaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
