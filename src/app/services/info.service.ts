import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Injection } from '../models/inyection.model';
import { AngularFirestore } from '@angular/fire/firestore';


const headers = new HttpHeaders({ "Content-Type": "application/json" });
@Injectable({
  providedIn: 'root'
})


export class InfoService {

  
  
  constructor(private http:HttpClient,public db: AngularFirestore) { 
    
  }


  getInfo(){
    const options = { headers };
    return this.http.get<any>('https://choloregistro.firebaseio.com/Inyeccion.json',options);
  }

  createUser(value:Injection){
    return this.db.collection('injections').add({
      nivelAzucar: value.nivelAzucar,
      fecha: value.fecha,
      hora: value.hora
    });
  }

  getInjections(){
    return this.db.collection('injections').snapshotChanges();
  }

  deleteInjection(injectionKey){
    return this.db.collection('injections').doc(injectionKey).delete();
  }
}
