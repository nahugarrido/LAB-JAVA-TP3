import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: HomeComponent,
    children: [
      { path: '', component: EmpleadosComponent, pathMatch: 'full' },
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'jornadas', component: NotFoundComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
