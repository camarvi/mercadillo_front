import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadilloComponent } from './mercadillo.component';

describe('MercadilloComponent', () => {
  let component: MercadilloComponent;
  let fixture: ComponentFixture<MercadilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MercadilloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
