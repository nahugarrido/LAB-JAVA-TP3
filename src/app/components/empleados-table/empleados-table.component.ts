import {
  Component,
  HostListener,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { EmpleadoResponse } from 'src/app/models/empleado-response';
import { EmpleadoModalComponent } from 'src/app/modals/empleado-modal/empleado-modal.component';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados-table',
  templateUrl: './empleados-table.component.html',
  styleUrls: ['./empleados-table.component.scss'],
})
export class EmpleadosTableComponent implements OnInit, OnChanges {
  @Output() updateEmpleados = new EventEmitter();
  @Input() empleados: EmpleadoResponse[] = [];
  @ViewChild(EmpleadoModalComponent)
  empleadoModal!: EmpleadoModalComponent;
  windowInnerWidth: number = window.innerWidth;
  isTablet: boolean = false;
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.empleados = changes['empleados'].currentValue;
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

  private checkScreenWidth() {
    this.windowInnerWidth = window.innerWidth;
    this.isTablet = this.windowInnerWidth <= 1200;
    this.isMobile = this.windowInnerWidth <= 768;
  }

  public handleUpdateEmpleados() {
    this.updateEmpleados.emit();
  }

  public openEditarEmpleado(empleado: EmpleadoResponse) {
    console.log('entra a open editar empleado');
    console.log(empleado);
    this.empleadoModal.editarEmpleado(empleado);
  }

  public openEliminarEmpleado(id: number) {
    if (confirm('¿Está seguro que desea eliminar el empleado?'))
      this.empleadoService
        .eliminarEmpleado(id.toString())
        .subscribe(() => this.updateEmpleados.emit());
  }
}
