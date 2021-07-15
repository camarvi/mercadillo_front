import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadillosGridComponent } from './mercadillos-grid.component';

describe('MercadillosGridComponent', () => {
  let component: MercadillosGridComponent;
  let fixture: ComponentFixture<MercadillosGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MercadillosGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadillosGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
