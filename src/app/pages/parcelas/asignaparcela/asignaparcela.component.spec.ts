import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaparcelaComponent } from './asignaparcela.component';

describe('AsignaparcelaComponent', () => {
  let component: AsignaparcelaComponent;
  let fixture: ComponentFixture<AsignaparcelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaparcelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaparcelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
