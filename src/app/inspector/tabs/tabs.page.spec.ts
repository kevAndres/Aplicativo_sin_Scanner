import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsPage } from './tabs.page'; // Asegúrate de que la ruta sea correcta

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsPage ],
      // Añade otros módulos necesarios aquí
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
