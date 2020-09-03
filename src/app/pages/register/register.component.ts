
import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { Injection } from '../../models/inyection.model';
import { RouterLink, Router } from '@angular/router';
declare var jsPDF: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  flagInfo = false;
  injections : Array<any> = [];
  inyection = new Injection();
  constructor(public infoService:InfoService ,private router: Router) { }

  ngOnInit(): void {   
    this.loadInfo();
  }

  sortFunction(a:any,b: any){  
    var dateA = new Date(a.payload.doc.data().fecha).getTime();
    var dateB = new Date(b.payload.doc.data().fecha).getTime();
    return dateA > dateB ? 1 : -1;  
  }; 

   loadInfo(){
    this.infoService.getInjections()
    .subscribe(result => {
      this.injections = result;
      this.injections.sort(this.sortFunction)
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

  convert(){
    let doc = new jsPDF();
    this.injections.forEach(function(info, i){
    doc.text(20, 10 + (i * 10), 
        "First Name: " + info.a.payload.doc.data().fecha +
        "Last Name: " + info.a.payload.doc.data().nivelAzucar);
    });
    doc.save('Test.pdf');
  }

}
