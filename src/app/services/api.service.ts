import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  
  posttask(data:any){
    return this.http.post<any>("http://localhost:3000/todo/",data);
  }
  gettask(){
    return this.http.get<any>("http://localhost:3000/todo/");
  }
  updatetask(data:any,id:number){
     return this.http.put<any>("http://localhost:3000/todo/"+id,data);
  }

}

