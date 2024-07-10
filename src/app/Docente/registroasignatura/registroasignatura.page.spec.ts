import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroasignaturaPage } from './registroasignatura.page';

describe('RegistroasignaturaPage', () => {
  let component: RegistroasignaturaPage;
  let fixture: ComponentFixture<RegistroasignaturaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroasignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
