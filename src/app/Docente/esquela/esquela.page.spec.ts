import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { EsquelaPage } from './esquela.page';

describe('EsquelaPage', () => {
  let component: EsquelaPage;
  let fixture: ComponentFixture<EsquelaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EsquelaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
