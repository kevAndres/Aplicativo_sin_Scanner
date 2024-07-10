import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaguinainicialPage } from './paguinainicial.page';

describe('PaguinainicialPage', () => {
  let component: PaguinainicialPage;
  let fixture: ComponentFixture<PaguinainicialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaguinainicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
