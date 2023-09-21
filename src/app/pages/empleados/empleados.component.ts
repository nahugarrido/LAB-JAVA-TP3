import { Component, ViewChild } from '@angular/core';
import { EmpleadoModalComponent } from 'src/app/components/empleado-modal/empleado-modal.component';
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
  totalEmpleados!: number;

  constructor(private empleadoService: EmpleadoService) {
    this.totalEmpleados = 0;
    this.updateEmpleados();
  }

  private updateEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe(
      (data) => {
        this.empleados = data;
        this.totalEmpleados = this.empleados.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public openRegistrarEmpleado() {
    this.empleadoModal.open();
  }

  public handleUpdateEmpleados() {
    this.updateEmpleados();
  }
}
