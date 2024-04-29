import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegistroestudiantePage } from './registroestudiante.page';

describe('RegistroestudiantePage', () => {
  let component: RegistroestudiantePage;
  let fixture: ComponentFixture<RegistroestudiantePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroestudiantePage]
      // Asegúrate de incluir aquí los imports necesarios, providers, etc.
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroestudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
