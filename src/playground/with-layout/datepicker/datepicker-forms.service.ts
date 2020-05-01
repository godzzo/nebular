import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatepickerFormsService implements Resolve<any>
{
  routeParams: any;

  constructor(
    protected http: HttpClient
  )
  {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
      : Observable<any> | Promise<any> | any {

      this.routeParams = route.params;

      console.log('route.params', route.params);

      return this.http.get(`/api/issues/${route.params.id}`);
  }
}
