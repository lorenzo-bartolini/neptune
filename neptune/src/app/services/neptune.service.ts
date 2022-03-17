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

  entitiesFields = [
    {
      label: 'product_ontology',
      options: [
        'season',
        '~id',
        'category',
        'product_name',
        '~label',
        'hierarchy'
      ]
    },
    {
      label: 'session_ontology',
      options: [
        '~id',
        'start',
        'end',
        'isauth',
        '~label'
      ]
    },
    {
      label: 'user_ontology',
      options: [
        '~id',
        'gender',
        'age',
        'full_name',
        'birthday',
        '~label'
      ]
    }
  ]

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
    return this.http.get<any>(`${this.baseApiUrl}/getentitynames`).pipe(
      map((entities:any[]) => {
        return entities.map( entity => {
          return entity.label
        })
      })
    )
  }

  getEdgesForEntity(entityName: string){
    return this.http.get<any>(`${this.baseApiUrl}/getedgesforentity?entityName=${entityName}`).pipe(
      map((edges: any[]) => {
        let a = edges.filter((v,i,a)=>a.findIndex(t=>(t.label===v.label))===i)
        return a.map(edge=> {
          return edge.label
        })
      })
    )
  }

  getFieldsForEntity(entityName: string){
    let fields = this.entitiesFields.find(e => e.label === entityName)?.options
    return of(fields)
  }

  getValuesForField(entityName?: string, fieldName?: string){
    return this.http.get<any>(`${this.baseApiUrl}/getvaluesforfield?entityName=${entityName}&fieldName=${fieldName}`)
  }

  getEdgeValues(edgeName: string){
    return this.http.get<any>(`${this.baseApiUrl}/dynamicedges?edgeName=${edgeName}`).pipe(
      map(edges => {
        return edges.map((edge:any) => {
          //split id in from e to, because indians did a shitty job
          let str = edge.id

          const [word1, from] = str.match(/\D+|\d+/g);
          var second = str.replace(word1, "");
          second = second.replace(from, "");
          const [word2, to] = second.match(/\D+|\d+/g);

          return {
            ...edge,
            from: from,
            to: to
          }
        })
      })
    )
  }

  postQuery(query: Entity[]){
    console.log("query being sent: ",query);

    return this.http.post<any>(`${this.baseApiUrl}/dynamicpost`, {query: query})
  }
}
