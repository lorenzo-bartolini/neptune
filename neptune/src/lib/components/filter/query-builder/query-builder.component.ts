import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NeptuneService } from 'src/app/services/neptune.service';
import { Entity, EntityName, QueryLine } from 'src/lib/enums/entities';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {

  @Input()entities!: Entity[]
  @Output()onValue = new EventEmitter

  entityOptions =[
    'product_ontology',
    'purchase_ontology',
    'user_ontology']


  constructor(private neptune: NeptuneService) { }

  ngOnInit(): void {
  }

  _getEdgeOptions(entityName: string){
    //const entityName = this.entities[entityIndex].entity!.toString()
    return this.neptune.getEdgesForEntity(entityName).subscribe(res=>{return res})
  }

  onSelected(value: QueryLine, entityIndex:number, lineIndex:number){
    this.entities[entityIndex].lines[lineIndex] = value
    this.onValue.emit(this.entities)
  }

  onEntitySelected(value: EntityName, entityIndex: number){
    this.entities[entityIndex].entity = value;
  }

  onEdgeSelected(value: string, entityIndex: number){
    this.entities[entityIndex].nextEdge = value;
  }
}
