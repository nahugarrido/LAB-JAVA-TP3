import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadoModalComponent } from 'src/app/modals/empleado-modal/empleado-modal.component';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
})
export class EmpleadosComponent {
  @ViewChild(EmpleadoModalComponent)
  empleadoModal!: EmpleadoModalComponent;
  constructor(private modalService: NgbModal) {}

  openRegistrarEmpleado() {
    this.empleadoModal.open();
  }
}
