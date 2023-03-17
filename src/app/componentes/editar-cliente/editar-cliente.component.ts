import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

// import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit{

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id: string = '';

  constructor( private clientesServicio: ClienteServicio, private flashMessages: FlashMessagesService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe( cliente => {
      this.cliente = cliente;
    })
  }

  guardar( clienteForm: NgForm){
    if(!clienteForm){
      this.flashMessages.show('Por favor llenar el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 3000
      })
    } else {
      clienteForm.value.id = this.id;
      // Modificar cliente
      this.clientesServicio.modificarCliente(clienteForm.value);
      this.router.navigate(['/']); 
    }
  }

  eliminar(){
    // if(confirm('¿Desea eliminar el cliente?')){
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    // }    
  }

}
