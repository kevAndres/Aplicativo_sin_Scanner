import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrorepresentantesPage } from './registrorepresentantes.page';

describe('RegistrorepresentantesPage', () => {
  let component: RegistrorepresentantesPage;
  let fixture: ComponentFixture<RegistrorepresentantesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrorepresentantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
