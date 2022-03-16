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

  entityOptions: string[] = []


  constructor(public neptune: NeptuneService) { }

  ngOnInit(): void {
    console.log(this.entities);
    this.entities.forEach(entity => {
      this.neptune.getEdgesForEntity(entity.entity!).subscribe(res => {
        entity.nextEdgeOptions = res
      })
    })

    this.neptune.getEntityList().subscribe(res => {
      this.entityOptions = res
    })
  }

  onSelected(value: QueryLine, entityIndex:number, lineIndex:number){
    this.entities[entityIndex].lines[lineIndex] = value
    this.onValue.emit(this.entities)
  }

  onEntitySelected(value: EntityName, entityIndex: number){
    this.entities[entityIndex].entity = value;
    this.entities[entityIndex]
    this.neptune.getEdgesForEntity(this.entities[entityIndex].entity!).subscribe(res => {
      this.entities[entityIndex].nextEdgeOptions = res
    })
  }

  onEdgeSelected(value: string, entityIndex: number){
    this.entities[entityIndex].nextEdge = value;
  }
}
