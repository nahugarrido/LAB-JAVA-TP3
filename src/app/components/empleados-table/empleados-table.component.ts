import { Component, HostListener, OnInit } from '@angular/core';
import { EmpleadoResponse } from 'src/app/models/empleado-response';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados-table',
  templateUrl: './empleados-table.component.html',
  styleUrls: ['./empleados-table.component.scss'],
})
export class EmpleadosTableComponent implements OnInit {
  empleados!: EmpleadoResponse[];
  windowInnerWidth: number = window.innerWidth;
  isTablet: boolean = false;
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  constructor(private empleadoService: EmpleadoService) {
    this.updateEmpleados();
  }

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  updateEmpleados() {
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

  calcularAnios(fechaNacimiento: string): number {
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate()))
      age--;
    return age;
  }

  checkScreenWidth() {
    this.windowInnerWidth = window.innerWidth;
    this.isTablet = this.windowInnerWidth <= 1200;
    this.isMobile = this.windowInnerWidth <= 768;
  }
}
