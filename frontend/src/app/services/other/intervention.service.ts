import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class InterventionService {

  rootURL = `${environment.api}interventions/`;
  rootURL2 = `${environment.api}intervention/`;


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


  all(rucheid:any,page=1,libelle=''): Observable<any> {

   // http://127.0.0.1:8000/api/ruches?page=1&libelle=une

    if(libelle!=''){
      return this.http.get(`${this.rootURL}?page=${page}&libelle=${libelle}&ruche=/interventions/${rucheid}`);
    }else{
      return this.http.get(`${this.rootURL}?page=${page}&ruche=/interventions/${rucheid}`);
    }

  }

  allPaginate(): Observable<any> {
    return this.http.get(`${this.rootURL2}`);
  }


  getById(id: any): Observable<any> {
    return this.http.get<any>(`${this.rootURL}${id}`);
  }



}
