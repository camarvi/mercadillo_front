import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovpersonasComponent } from './movpersonas.component';

describe('MovpersonasComponent', () => {
  let component: MovpersonasComponent;
  let fixture: ComponentFixture<MovpersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovpersonasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovpersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
