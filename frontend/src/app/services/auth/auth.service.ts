import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthService {

  rootURL = environment.api;
  constructor(private http: HttpClient) {

  }

  login(userData: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}login`, userData ,{ observe: 'response' });
  }

  register(userData: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}register`, userData);
  }

  resetPassword(userData: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}resetPassword`, userData);
  }

  refresh(): Observable<any>{
    return this.http.post<any>(`${this.rootURL}refresh`, {},{withCredentials:true});
  }


  
  getCurentUser():Observable<any> {
    return this.http.get<any>(`${this.rootURL}get_user`)
  }
  

  verifyToken(code:any ):Observable<any> {
    return this.http.get<any>(`${this.rootURL}checkend_register/${code}`)
  }



  signOut(data: any): Observable<any> {
    return this.http.post<any>(`${this.rootURL}logout`, data);
  }

  logOut():Observable<any> {
    return this.http.get<any>(`${this.rootURL}logout`)
  }

  verify(userId:any ,code:any ):Observable<any> {
    return this.http.get<any>(`${this.rootURL}verify/${userId}/${code}`)
  }

  ResendCode(userId:any):Observable<any> {
    return this.http.get<any>(`${this.rootURL}refreshcode/${userId}`)
  }

  forgotPasswordEmail(data: any): Observable<any>{
    return this.http.get<any>(`${this.rootURL}forgotPassword/${data}`);
  }
  checkisEmailExist(data: any): Observable<any>{
    return this.http.get<any>(`${this.rootURL}check_exist/${data}`);
  }

  checkisLoginExist(data: any): Observable<any>{
    return this.http.get<any>(`${this.rootURL}check_exist_login/${data}`);
  }



}
