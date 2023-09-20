import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoEliminarModalComponent } from './empleado-eliminar-modal.component';

describe('EmpleadoEliminarModalComponent', () => {
  let component: EmpleadoEliminarModalComponent;
  let fixture: ComponentFixture<EmpleadoEliminarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoEliminarModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoEliminarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
