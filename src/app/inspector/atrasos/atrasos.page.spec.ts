import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtrasosPage } from './atrasos.page';

describe('AtrasosPage', () => {
  let component: AtrasosPage;
  let fixture: ComponentFixture<AtrasosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AtrasosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
