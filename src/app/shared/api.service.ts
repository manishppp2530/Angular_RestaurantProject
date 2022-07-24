import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  //Now here we will define the POST, GET, PUT, DELETE

  //Creating a Restaurant using POSt type method
  postRestautant(data:any){
    return this._http.post<any>('http://localhost:3000/posts', data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //Get Restaurant using GEt type method
  getRestaurant(){
    return this._http.get("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }

  //Update
  updateRestaurant(data:any, id:any){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //Delete
  deleteRestaurant(id:any){
    return this._http.delete("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }

   //User Signup
   signuUpUser(data:any){
    return this._http.post<any>('http://localhost:3000/user',data).pipe(map((res:any) => {
      return res;
    }))
  } 

  //User Login
  loginUser(){
    return this._http.get<any>('http://localhost:3000/user').pipe(map((res:any)=> {
      return res;
    }))
  }
}
