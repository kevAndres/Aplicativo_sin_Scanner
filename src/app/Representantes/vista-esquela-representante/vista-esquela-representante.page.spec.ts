import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaEsquelaRepresentantePage } from './vista-esquela-representante.page';

describe('VistaEsquelaRepresentantePage', () => {
  let component: VistaEsquelaRepresentantePage;
  let fixture: ComponentFixture<VistaEsquelaRepresentantePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VistaEsquelaRepresentantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
