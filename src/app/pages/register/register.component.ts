import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { Injection } from '../../models/inyection.model';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  injections : Array<any> = [];
  inyection = new Injection();
  constructor(public infoService:InfoService ,private router: Router) { }

  ngOnInit(): void {   
    this.loadInfo();
  }

   loadInfo(){
    this.infoService.getInjections()
    .subscribe(result => {
      this.injections = result;
    })  
   }

  registerInjection(){
    console.log(this.inyection);
    this.infoService.createUser(this.inyection)
	.then(
	  res => {
      this.inyection.nivelAzucar= 0;
      this.inyection.fecha = "";
      this.inyection.hora = "";
	    this.router.navigate(['/']);
	  }
	)
  }
  
  deleteInjection(keyInjection :string){
      this.infoService.deleteInjection(keyInjection)
      .then(
        res => {
          this.router.navigate(['/']);
        },
        err => {
          console.log(err);
        }
      )   
  }

}
