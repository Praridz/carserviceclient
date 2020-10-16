import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CarService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public CAR_API = this.API + '/cars';
  public OWN_API = this.API + '/owners';

  constructor(private http: HttpClient) {
  }

  //Aqui se recibe el parametro variable, que me ayuda a conseguir ya sea para cool-cars, o cars
  getAll(variable:string): Observable<any> {
    return this.http.get(this.API + '/'+ variable);
  }

  get(id: string) {
    return this.http.get(this.CAR_API + '/' + id);
  }

  save(car: any): Observable<any> {
    let result: Observable<Object>;
    if (car['href']) {
      result = this.http.put(car.href, car);
    } else {
      result = this.http.post(this.CAR_API, car);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

  
  getAllOw(): Observable<any> {
    return this.http.get(this.API + '/owners');
  }

  getOw(id: string) {
    return this.http.get(this.OWN_API + '/' + id);
  }

  saveOw(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['href']) {
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.OWN_API, owner);
    }
    return result;
  }

  removeOw(href: string) {
    return this.http.delete(href);
  }
}