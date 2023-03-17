import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { PaginaErrorComponent } from './componentes/pagina-error/pagina-error.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { SeguridadComponent } from './componentes/seguridad/seguridad.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { AuthGuard } from './guardianes/auth.guard';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';

const routes: Routes = [
  { path: '', component: TableroComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SeguridadComponent },
  { path: 'registro', component: RegistroComponent, canActivate: [ConfiguracionGuard] },
  { path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard] },
  { path: 'cliente/editar/:id', component: EditarClienteComponent, canActivate: [AuthGuard] },
  { path: '**', component: PaginaErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
