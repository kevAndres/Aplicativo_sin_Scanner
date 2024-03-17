import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrodocentesPage } from './registrodocentes.page';

describe('RegistrodocentesPage', () => {
  let component: RegistrodocentesPage;
  let fixture: ComponentFixture<RegistrodocentesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrodocentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
