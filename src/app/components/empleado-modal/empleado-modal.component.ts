import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadoRequest } from 'src/app/models/empleado-request.model';
import { EmpleadoResponse } from 'src/app/models/empleado-response.model';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empleado-modal',
  templateUrl: './empleado-modal.component.html',
  styleUrls: ['./empleado-modal.component.scss'],
})
export class EmpleadoModalComponent implements OnInit {
  form!: FormGroup;
  isEditing = false;
  idEditing!: string;
  backendErrorMessage = '';
  mostrarBackendErrorMessage = false;

  @Output() updateEmpleados = new EventEmitter();
  @ViewChild('content') addview!: ElementRef;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  public open() {
    this.clearform();
    this.modalService.open(this.addview).result.then(
      (result) => {
        this.mostrarBackendErrorMessage = false;
      },
      (reason) => {
        this.mostrarBackendErrorMessage = false;
      }
    );
  }

  public guardarEmpleado() {
    if (this.form.invalid) {
      return;
    }

    this.parseForm(this.form.value);

    this.empleadoService.registrarempleado(this.form.value).subscribe(
      (result) => {
        this.updateEmpleados.emit();
        this.modalService.dismissAll();
        this.toastr.success(
          'Empleado creado con exito 😋',
          'Empleado agregado'
        );
        console.log(result);
      },
      (error) => {
        console.log(error);
        this.mostrarBackendErrorMessage = true;
        this.backendErrorMessage = error?.message;
      },
      () => {}
    );
  }

  public editarEmpleado(empleado: EmpleadoResponse) {
    this.open();
    this.isEditing = true;
    this.form.setValue({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      email: empleado.email,
      nroDocumento: empleado.nroDocumento,
      fechaNacimiento: empleado.fechaNacimiento,
      fechaIngreso: empleado.fechaIngreso,
    });
    this.idEditing = empleado.id.toString();
  }

  public actualizarEmpleado() {
    this.empleadoService
      .actualizarEmpleado(this.idEditing, this.form.value)
      .subscribe(
        (result) => {
          this.updateEmpleados.emit();
          this.modalService.dismissAll();
          this.toastr.success('Datos actualizados 😋', 'Empleado actualizado');
          console.log(result);
        },
        (error) => {
          this.mostrarBackendErrorMessage = true;
          this.backendErrorMessage = error?.message;
          console.log(error);
        },
        () => {}
      );
  }

  private initFormGroup() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      nroDocumento: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      fechaNacimiento: ['', [Validators.required, this.fechaNoPosterior]],
      fechaIngreso: ['', [Validators.required, this.fechaNoPosterior]],
    });
  }

  private clearform() {
    this.form.reset({
      nombre: 'Nahuel',
      apellido: 'Garrido',
      email: 'email@gmail.com',
      nroDocumento: '42116732',
      fechaNacimiento: '1999-09-27',
      fechaIngreso: '2010-10-20',
    });
  }

  private parseForm(form: any): EmpleadoRequest {
    const parsedForm: any = {};
    Object.keys(form).forEach((key) => {
      parsedForm[key] = form[key].trim();
    });

    parsedForm.nroDocumento = parsedForm.nroDocumento.replace(/\./g, '');
    parsedForm.nroDocumento = parseInt(parsedForm.nroDocumento);
    return parsedForm;
  }

  private fechaNoPosterior(control: AbstractControl): ValidationErrors | null {
    const fechaIngresada = new Date(control.value);
    const fechaActual = new Date();
    if (fechaIngresada > fechaActual) {
      return { fechaPosterior: true };
    }
    return null;
  }

  get nombre() {
    return this.form?.get('nombre');
  }

  get apellido() {
    return this.form?.get('apellido');
  }
  get email() {
    return this.form?.get('email');
  }

  get nroDocumento() {
    return this.form?.get('nroDocumento');
  }

  get fechaNacimiento() {
    return this.form?.get('fechaNacimiento');
  }

  get fechaIngreso() {
    return this.form?.get('fechaIngreso');
  }
}
