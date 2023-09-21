import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empleado-eliminar-modal',
  templateUrl: './empleado-eliminar-modal.component.html',
  styleUrls: ['./empleado-eliminar-modal.component.scss'],
})
export class EmpleadoEliminarModalComponent {
  idEmpleado!: number;
  @Output() updateEmpleados = new EventEmitter();
  @ViewChild('content') addview!: ElementRef;

  constructor(
    private modalService: NgbModal,
    private empleadoService: EmpleadoService,
    private toastr: ToastrService
  ) {}

  public open(idEmpleado: number) {
    this.idEmpleado = idEmpleado;
    this.modalService.open(this.addview).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  public eliminarEmpleado(idEmpleado: number) {
    this.empleadoService.eliminarEmpleado(idEmpleado.toString()).subscribe(
      (response) => {
        this.updateEmpleados.emit();
        this.modalService.dismissAll();
        this.toastr.error('Empleado eliminado con exito 💀', '');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
