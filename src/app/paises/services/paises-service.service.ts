import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Paises } from '../interfaces/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisesServiceService {

  private _regiones:string[]=['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  private baseUrl:string='https://restcountries.com/v3.1'
  get regiones():string[]{
    return [...this._regiones];
  }
  constructor(private http:HttpClient){ }

  getPaisesPorRegion(region:string):Observable<Paises[]>{
    const url=`${this.baseUrl}/region/${region}`
    return this.http.get<Paises[]>(url)
  }

  getPaisPorCodigo(codigo:string):Observable<Paises | null>{
    if(!codigo){
      return of(null)
    }
  const url=`${this.baseUrl}/alpha/${codigo}`
  return this.http.get<Paises>(url)
}
getPaisPorCodigoSmall(codigo:string):Observable<Paises>{
const url=`${this.baseUrl}/alpha/${codigo}?fields=name;`
return this.http.get<Paises>(url)
}

getPaisesPorCodigo(codigo:string):Observable<Paises[] | null>{
  if(!codigo){
    return of(null)
  }
  const url:string = `${this.baseUrl}/alpha/${codigo}`
  return this.http.get<Paises[]>(url)
}
}
