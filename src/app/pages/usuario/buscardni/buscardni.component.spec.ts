import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscardniComponent } from './buscardni.component';

describe('BuscardniComponent', () => {
  let component: BuscardniComponent;
  let fixture: ComponentFixture<BuscardniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscardniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscardniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
