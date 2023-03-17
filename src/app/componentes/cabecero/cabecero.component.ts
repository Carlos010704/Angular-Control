import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit{

  isLoggedIn: boolean = false;
  loggedInUser: string | any = '';
  permisoRegistro: boolean | any = false;

  constructor( private loginService: LoginService, private router: Router, private conService: ConfiguracionServicio){}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
    });

    this.conService.getConfiguracion().subscribe( conf => {
      this.permisoRegistro = conf.permitirRegistro;
    })
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
