import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class RecolteService {

  rootURL = `${environment.api}recoltes/`;
  rootURL2 = `${environment.api}recolte/`;


  constructor(private http: HttpClient) {}

  create(data: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL2}save`, data);
  }

  update(data: any,id:any): Observable<any>{
    return this.http.patch<any>(`${this.rootURL}${id}`, data,{
      headers: { 'Content-Type': 'application/merge-patch+json' }});
  }

  delete(data: any): Observable<any>{
    return this.http.delete<any>(`${this.rootURL}${data}`);
  }


  all(rucheid:any): Observable<any> {

   // http://127.0.0.1:8000/api/ruches?page=1&libelle=une

   return this.http.get(`${this.rootURL2}all/${rucheid}`);
  }

  allPaginate(): Observable<any> {
    return this.http.get(`${this.rootURL2}`);
  }


  getById(id: any): Observable<any> {
    return this.http.get<any>(`${this.rootURL}${id}`);
  }



}
