import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { combineLatest } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Entity, EntityName } from 'src/lib/enums/entities';
import { Product } from '../../lib/interfaces/elements';
import { NeptuneService } from '../services/neptune.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {

  entities: Entity[]  = [{
    entity: EntityName.product,
    lines: [{}],
    nextEdge:'ProductHasPurch',
    nextEdgeOptions: []
  },
  {
    entity: EntityName.purchase,
    lines:[{}],
    nextEdge: 'PurchaseHasUser',
    nextEdgeOptions: []
  }]

  nodes = undefined

  form = this.fb.group({
    from: null,
    to: null
  })

  structure = [
    {
      id: 1,
      entity:EntityName.product,
      next:'ProductHasPurch'
    },
    {
      id: 2,
      entity:EntityName.purchase,
      next:'PurchaseHasUser'
    },
    {
      id:3,
      entity:EntityName.user
    }
    ]

  constructor(
    private fb: FormBuilder,
    private neptune: NeptuneService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    /* if(changes.form){
      if(changes.form.currentValue !== changes.form.previousValue){
        this.structure.forEach((x,index) => {
          if(!(this.entities[index].entity === x.entity)){
            this.entities.push({
              entity: x.entity,
              lines: [{}],
              nextEdge: x.next ? x.next : undefined
            })
          }
        })
      }
      console.log(this.entities);
    } */
  }

  onValues(value: Entity[]){
    this.entities = value
  }

  submit(){
    /* this.neptune.initialize().subscribe(res => {
      console.log(res);

    }) */

   /*  this.entities.forEach((entity, entityIndex) => {

      //clean routine
      entity.lines.forEach((line,lineIndex) => {
        if(!(line.field && line.operator && line.value)){
          this.entities[entityIndex].lines.splice(lineIndex, 1)
        }
      })
      if(entity.lines.length === 0){
        this.entities.splice(entityIndex, 1)
      }

    }) */

    //search for missing edges


    this.neptune.postQuery(this.entities).subscribe(res=>{
      console.log(res);
      this.nodes = res
    })
  }
}
