import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

import { EmpleadoService } from 'src/app/services/empleado.service';

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
    private empleadoService: EmpleadoService
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
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
