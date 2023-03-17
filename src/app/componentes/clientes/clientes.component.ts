import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessage } from 'angular2-flash-messages/module/flash-message';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  clientes: Cliente[] = [];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  @ViewChild('clienteForm') clienteForm: NgForm | any;
  @ViewChild('botonCerrar') botonCerrar: ElementRef | any;

  constructor( private clientesServicio: ClienteServicio, private flashMessages: FlashMessagesService){}

  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )    
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes){ 
      this.clientes.forEach( cliente => {
        saldoTotal += Number(cliente.saldo);
      })
    }
    return saldoTotal;
  }

  agregar(clienteForm: NgForm){
    if(!clienteForm.valid){
      this.flashMessages.show('Por favor dilegenciar el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 3000
      })
    }else{
      // Agregar Nuevo Cliente
      this.clientesServicio.agregarCliente(clienteForm.value);
      clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
