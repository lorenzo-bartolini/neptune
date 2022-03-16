import { Operator } from "./operators"

export enum EntityName{
  product = 'product_ontology',
  purchase = 'purchase_ontology',
  user = 'user_ontology'
}

export class QueryLine{
  field?: string
  operator?: string
  value?: string | string[]
}

export class Entity{
  entity?: EntityName | string
  nextEdge?: string
  nextEdgeOptions?: string[]
  lines!: QueryLine[]
}

