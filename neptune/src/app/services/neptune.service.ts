import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Entity } from 'src/lib/enums/entities';
import { Product } from '../../lib/interfaces/elements';

@Injectable({
  providedIn: 'root'
})
export class NeptuneService {

  baseApiUrl = environment.BASE_API_URL;

  options = {
    headers:
      {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  }

  constructor(private http: HttpClient) { }

  initialize() {
    return this.http.get(`${this.baseApiUrl}/initialize`).pipe(
      map((res: any) => {
        res.map((product: any) => {
          product.product_name = product.product_name[0]
          return product
        })
        return res as Product[]

      })
    )
  }

  getEntityList(){
    return of([
      'product_ontology',
      'purchase_ontology',
      'user_ontology'
    ])
  }

  getEdgesForEntity(entityName: string){
    return this.http.get<any>(`${this.baseApiUrl}/getedgesforentity?entityName=${entityName}`).pipe(
      map((edges: any[]) => {
        return edges.filter((v,i,a)=>a.findIndex(t=>(t.label===v.label))===i)
      })
    )
  }

  getValuesForField(entityName?: string, fieldName?: string){
    return this.http.get<any>(`${this.baseApiUrl}/getvaluesforfield?entityName=${entityName}&fieldName=${fieldName}`)
  }

  postQuery(query: Entity[]){
    return this.http.post<any>(`${this.baseApiUrl}/dynamicpost`, {query: query})
  }
}
