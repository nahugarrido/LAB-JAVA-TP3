import { Component, ViewChild } from '@angular/core';
import { EmpleadoModalComponent } from 'src/app/modals/empleado-modal/empleado-modal.component';
import { EmpleadoResponse } from 'src/app/models/empleado-response.model';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
})
export class EmpleadosComponent {
  @ViewChild(EmpleadoModalComponent)
  empleadoModal!: EmpleadoModalComponent;
  empleados!: EmpleadoResponse[];

  constructor(private empleadoService: EmpleadoService) {
    this.updateEmpleados();
  }

  private updateEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe(
      (data) => {
        console.log('empleados' + data);
        this.empleados = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openRegistrarEmpleado() {
    this.empleadoModal.open();
  }

  handleUpdateEmpleados() {
    this.updateEmpleados();
    console.log('handleUpdateEmpleados en empleados');
  }
}
