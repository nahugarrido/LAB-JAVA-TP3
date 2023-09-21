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
import { FormControl } from '@angular/forms';
import { EmpleadoResponse } from 'src/app/models/empleado-response.model';
import { EmpleadoModalComponent } from 'src/app/modals/empleado-modal/empleado-modal.component';
import { EmpleadoEliminarModalComponent } from 'src/app/modals/empleado-eliminar-modal/empleado-eliminar-modal.component';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados-table',
  templateUrl: './empleados-table.component.html',
  styleUrls: ['./empleados-table.component.scss'],
})
export class EmpleadosTableComponent implements OnInit, OnChanges {
  isTablet: boolean = false;
  isMobile: boolean = false;
  windowInnerWidth: number = window.innerWidth;
  page = 1;
  pageSize = 5;
  empleadosSlice: EmpleadoResponse[] = [];
  filteredEmpleados: EmpleadoResponse[] = [];
  filter = new FormControl('', { nonNullable: true });
  collectionSize: number = 0;

  @Output() updateEmpleados = new EventEmitter();
  @Input() empleados: EmpleadoResponse[] = [];
  @ViewChild(EmpleadoModalComponent)
  empleadoModal!: EmpleadoModalComponent;
  @ViewChild(EmpleadoEliminarModalComponent)
  empleadoEliminarModal!: EmpleadoEliminarModalComponent;

  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {
    this.checkScreenWidth();
  }

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.filter.valueChanges.subscribe((newValue) => {
      this.filteredEmpleados = this.search(newValue);
      this.refreshEmpleados();
    });

    this.checkScreenWidth();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.empleados = changes['empleados'].currentValue;
    this.empleados
      ? (this.collectionSize = this.empleados.length)
      : (this.collectionSize = 0);

    this.filteredEmpleados = this.search(this.filter.value);
    this.empleadosSlice = this.search(this.filter.value);
    this.refreshEmpleados();
  }

  public openEditarEmpleado(empleado: EmpleadoResponse) {
    this.empleadoModal.editarEmpleado(empleado);
  }

  public openEliminarEmpleado(id: number) {
    this.empleadoEliminarModal.open(id);
  }

  public calcularAnios(fechaNacimiento: string): number {
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate()))
      age--;
    return age;
  }

  public handleUpdateEmpleados() {
    this.updateEmpleados.emit();
  }

  public refreshEmpleados() {
    this.empleadosSlice = this.filteredEmpleados.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  public search(text: string): EmpleadoResponse[] {
    if (!this.empleados) {
      return [];
    }

    return this.empleados.filter((empleado) => {
      const term = text.toLowerCase();
      return (
        empleado.nombre.toLowerCase().includes(term) ||
        empleado.apellido.toLowerCase().includes(term) ||
        empleado.email.toLowerCase().includes(term)
      );
    });
  }

  private checkScreenWidth() {
    this.windowInnerWidth = window.innerWidth;
    this.isTablet = this.windowInnerWidth <= 1200;
    this.isMobile = this.windowInnerWidth <= 768;
  }
}
