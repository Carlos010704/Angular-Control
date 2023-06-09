import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { map, Observable } from "rxjs";
import { Cliente } from "../modelo/cliente.model";

@Injectable()
export class ClienteServicio{
    clientesColeccion : AngularFirestoreCollection<Cliente>;
    clienteDoc: AngularFirestoreDocument<Cliente> | undefined;
    clientes!: Observable<Cliente[]> | any;
    cliente!: Observable<Cliente> | any;
  


    constructor( private db: AngularFirestore ){
        this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
    }

    getClientes(): Observable<Cliente[]>{
        // Obtener Clientes
        this.clientes = this.clientesColeccion.snapshotChanges().pipe(
            map( cambios => {
                return cambios.map( accion => {
                    const datos = accion.payload.doc.data() as Cliente;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.clientes;
    }

    agregarCliente(cliente: Cliente){
        this.clientesColeccion.add(cliente);
    }

    getCliente(id: string):Observable<Cliente>{
        this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
        this.cliente = this.clienteDoc.snapshotChanges().pipe(
            map( action => {   
                if(action.payload.exists === false){
                    return null;
                } else {
                    const datos = action.payload.data() as Cliente;
                    datos.id = action.payload.id;
                    return datos;
                }
            })
        );
        return this.cliente;
    }

    modificarCliente(cliente: Cliente){
        this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
        this.clienteDoc.update(cliente);
    }

    eliminarCliente(cliente: Cliente){
        this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
        this.clienteDoc.delete();
    }
}
