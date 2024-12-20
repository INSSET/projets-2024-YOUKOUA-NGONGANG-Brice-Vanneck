import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {UserHelper} from "../../shared/helpers/user";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  rootURL = `${environment.api}`;
  constructor(private router: Router,private http:HttpClient ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(err => {

      if ([401].includes(err.status) && UserHelper.isConnect()) {
        return this.http.post<any>(`${this.rootURL}token/refresh`, { 
            refresh_token: UserHelper.getUser().refresh_token 
        }).pipe(
            switchMap((res: any) => {
                // Mise à jour des tokens
                UserHelper.refresh(res.token, res.refresh_token);
                
                // Relance de la requête originale avec le nouveau token
                return next.handle(request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${res.token}`
                    }
                }));
            }),
            catchError(refreshErr => {
                //console.error("Erreur lors du rafraîchissement du token :", refreshErr);
    
                // Gérer les erreurs du refresh (exemple : forcer une déconnexion)
                UserHelper.disconect();
                this.router.navigateByUrl('/auth/connexion'); // Redirige vers la page de login
                return throwError(refreshErr); // Propagation de l'erreur
            })
        );
    } else if ([400, 402, 422].includes(err.status)) {
       
        return throwError(err); // Propagation de l'erreur si nécessaire
    } else {
        // Gérer d'autres erreurs (exemple : déconnexion pour les erreurs critiques)
        UserHelper.disconect();
        this.router.navigateByUrl('/accueil'); // Redirection
        //return throwError(err); // Propagation de l'erreur
    }
    

      const error = (err && err.error && err.error.message) || err.statusText;
      console.error(err);
      return throwError(error);
    }))
  }
}
