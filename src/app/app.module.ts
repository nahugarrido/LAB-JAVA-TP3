import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoverComponent } from './components/cover/cover.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EmpleadosTableComponent } from './components/empleados-table/empleados-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpleadoModalComponent } from './modals/empleado-modal/empleado-modal.component';
import { EmpleadoEliminarModalComponent } from './modals/empleado-eliminar-modal/empleado-eliminar-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CoverComponent,
    NotFoundComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    EmpleadosComponent,
    InicioComponent,
    EmpleadosTableComponent,
    EmpleadoModalComponent,
    EmpleadoEliminarModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
