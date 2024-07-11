import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaEsquelaDocentePage } from './vista-esquela-docente.page';

describe('VistaEsquelaDocentePage', () => {
  let component: VistaEsquelaDocentePage;
  let fixture: ComponentFixture<VistaEsquelaDocentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VistaEsquelaDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
