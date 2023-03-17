import { Injectable } from "@angular/core";
import { CanActivate, Router} from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ConfiguracionServicio } from "../servicios/configuracion.service";

@Injectable()
export class ConfiguracionGuard implements CanActivate {

    constructor( private router: Router, private conService: ConfiguracionServicio){}

    canActivate():Observable<boolean> | any{
        return this.conService.getConfiguracion().pipe(
            map( configuracion => {
                if(!configuracion.permitirRegistro){
                    this.router.navigate(['/login']);
                } 
            }))
    }

}