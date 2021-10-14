import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditamovimientoComponent } from './editamovimiento.component';

describe('EditamovimientoComponent', () => {
  let component: EditamovimientoComponent;
  let fixture: ComponentFixture<EditamovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditamovimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditamovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
