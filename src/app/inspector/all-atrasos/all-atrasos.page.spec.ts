import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllAtrasosPage } from './all-atrasos.page'; // Asegúrate de que la ruta sea correcta

describe('AllAtrasosPage', () => {
  let component: AllAtrasosPage;
  let fixture: ComponentFixture<AllAtrasosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAtrasosPage ],
      // Añade otros módulos necesarios aquí
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAtrasosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
