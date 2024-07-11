import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VistaEsquelaDComponent } from './vista-esquela-d.component';

describe('VistaEsquelaDComponent', () => {
  let component: VistaEsquelaDComponent;
  let fixture: ComponentFixture<VistaEsquelaDComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaEsquelaDComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VistaEsquelaDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
