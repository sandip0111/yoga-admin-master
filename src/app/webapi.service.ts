import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebapiService {

  private url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  isLogedIn(){
    return sessionStorage.getItem('token');
  }

  insertUser(data:any){
    return this.http.post(this.url+"api/v1/createUpdateUser", data);
  }
  getAllUser(id=""){
    return this.http.get(this.url+"api/v1/getAllUser"+id);
   }
   getUserById(id){
    return this.http.get(this.url+"api/v1/getUser/"+id);
   }
   deleteUser(data){
    return this.http.post(this.url+"api/v1/deleteUser/",data);
   }
  insertTeam(data:any){
    return this.http.post(this.url+"api/v1/createUpdateTeam", data);
  }
  getAllTeam(id=""){
    return this.http.get(this.url+"api/v1/getAllTeam"+id);
   }
   getTeamById(id){
    return this.http.get(this.url+"api/v1/getTeam/"+id);
   }
   deleteTeam(data:any){
    return this.http.post(this.url+"api/v1/deleteTeam",data);
   }
   insertCheck(data:any){
    return this.http.post(this.url+"api/v1/setting", data);
  }
  getAllCheck(id=""){
    return this.http.get(this.url+"api/v1/setting"+id);
   }

   insertCheckField(data:any){
    return this.http.post(this.url+"api/v1/checkField",data);
   }

   getAllManager(id=""){
    return this.http.get(this.url+"api/v1/getAllManager"+id);
   }
   getAllClient(id=""){
    return this.http.get(this.url+"api/v1/getAllClient"+id);
   }

}
