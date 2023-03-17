import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Configuracion } from "../modelo/configuracion.model";

@Injectable() 
export class ConfiguracionServicio{
    configuracionDoc: AngularFirestoreDocument<Configuracion> | any;
    configuracion: Observable<Configuracion> | any;

    //id inico perteneciente a la configuracion
    id = 1;

    constructor( private db: AngularFirestore ){}

    //Obtener valor de la collecion de configuracion - permitirRegistro
    getConfiguracion():Observable<Configuracion>{
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracion = this.configuracionDoc.valueChanges();
        return this.configuracion;
    }

    modificarConfiguracion( configuracion: Configuracion ){
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracionDoc.update(configuracion);
    }
}