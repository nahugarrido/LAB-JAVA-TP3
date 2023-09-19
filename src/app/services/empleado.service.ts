import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmpleadoResponse } from '../models/empleado-response';
import { EmpleadoRequest } from '../models/empleado-request.model';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  apiUrl = environment.baseUrl + '/empleado';
  constructor(private http: HttpClient) {}

  registrarempleado(empleado: EmpleadoRequest): Observable<EmpleadoResponse> {
    return this.http
      .post<EmpleadoResponse>(this.apiUrl, empleado)
      .pipe(retry(1), catchError(this.handleError));
  }

  obtenerEmpleados(): Observable<EmpleadoResponse[]> {
    return this.http
      .get<EmpleadoResponse[]>(this.apiUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  obtenerEmpleado(id: String): Observable<EmpleadoResponse> {
    return this.http
      .get<EmpleadoResponse>(this.apiUrl + `/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  actualizarEmpleado(
    id: String,
    empleado: EmpleadoRequest
  ): Observable<EmpleadoResponse> {
    return this.http
      .put<EmpleadoResponse>(this.apiUrl + `/${id}`, empleado)
      .pipe(retry(1), catchError(this.handleError));
  }

  eliminarEmpleado(id: String): Observable<any> {
    return this.http
      .delete(this.apiUrl + `/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(err: any) {
    console.log(err);
    return throwError({
      message: err.error.message,
      status: err.status,
    });
  }
}
