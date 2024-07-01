import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllAtrasosPage } from './all-atrasos.page';

describe('AllAtrasosPage', () => {
  let component: AllAtrasosPage;
  let fixture: ComponentFixture<AllAtrasosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllAtrasosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
