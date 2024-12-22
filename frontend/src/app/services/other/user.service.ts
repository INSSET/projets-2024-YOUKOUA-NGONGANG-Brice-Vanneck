import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  rootURL = `${environment.api}`;
  constructor(private http: HttpClient) {}


  updateGestionnaire(data: any,id:any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}user/update_gestionnaire/${id}`, data);
  }
  createGestionnaire(data: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}user/add_gestionnaire`, data);
  }

  updateGestionnaire_regional(data: any,id:any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}user/update_gestionnaire_regional/${id}`, data);
  }
  createGestionnaire_regional(data: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}user/add_gestionnaire_regional`, data);
  }



  updateProfil(data: any,id:any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}updateuser/${id}`, data);
  }

  updateCandidatProfil(data: any,id:any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}user/candidat/updateProfil/${id}`, data);
  }


  updateCandidat(data: any,id:any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}user/candidat/update/${id}`, data);
  }

  allCandidats(data: any,page:any,perPage:any): Observable<any> {
    return this.http.post(`${this.rootURL}user/candidat?perPage=${perPage}&page=${page}`, data);
  }


  allGestionnaires(): Observable<any> {
    return this.http.get(`${this.rootURL}user/gestionnaire`);
  }
  allGestionnairesRegional(): Observable<any> {
    return this.http.get(`${this.rootURL}user/gestionnaire_regional`);
  }



  gestionnaire_free(): Observable<any> {
    return this.http.get(`${this.rootURL}user/gestionnaire_free`);
  }


  addGestionnaire(data: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}user/add_gestionnaire`, data);
  }


  create(data: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}save`, data);
  }



  delete(data: any): Observable<any>{
    return this.http.delete<any>(`${this.rootURL}${data}`);
  }



  getById(id: any): Observable<any> {
    return this.http.get<any>(`${this.rootURL}${id}`);
  }

  getByCandidatAndByProjet(candidatId:any,projetId: any): Observable<any> {
    return this.http.get<any>(`${this.rootURL}${candidatId}/${projetId}`);
  }
  getListByCandidat(candidatId:any): Observable<any> {
    return this.http.get<any>(`${this.rootURL}liste/${candidatId}`);
  }


  updateCnpsNumber(data: any,id:any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}cnps/${id}`, data);
  }

  affecter_motif_candidat(data: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}affecter_motifs`, data);
  }


}
