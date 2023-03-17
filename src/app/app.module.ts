import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule, Settings } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { SeguridadComponent } from './componentes/seguridad/seguridad.component';
import { PaginaErrorComponent } from './componentes/pagina-error/pagina-error.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { ClienteServicio } from './servicios/cliente.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginService } from './servicios/login.service';
import { AuthGuard } from './guardianes/auth.guard';
import { ConfiguracionServicio } from './servicios/configuracion.service';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';


@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    ClientesComponent,
    ConfiguracionComponent,
    EditarClienteComponent,
    SeguridadComponent,
    PaginaErrorComponent,
    RegistroComponent,
    TableroComponent,
    PiePaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, 'control-clientes'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    SweetAlert2Module.forRoot()
  ],
  providers: [ClienteServicio, LoginService, AuthGuard, ConfiguracionServicio, ConfiguracionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
