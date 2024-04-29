import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaguinaprincipalrepresentantePage } from './paguinaprincipalrepresentante.page';

describe('PaguinaprincipalrepresentantePage', () => {
  let component: PaguinaprincipalrepresentantePage;
  let fixture: ComponentFixture<PaguinaprincipalrepresentantePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaguinaprincipalrepresentantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
