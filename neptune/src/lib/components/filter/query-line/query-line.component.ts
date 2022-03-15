import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NeptuneService } from 'src/app/services/neptune.service';
import { Entity, QueryLine } from 'src/lib/enums/entities';
import { Operator } from 'src/lib/enums/operators';
import { Product } from 'src/lib/interfaces/elements'

@Component({
  selector: 'app-query-line',
  templateUrl: './query-line.component.html',
  styleUrls: ['./query-line.component.scss']
})
export class QueryLineComponent implements OnInit, OnChanges {

  @Input() entityName?: string
  @Input() entityLine!: QueryLine
  @Input() buttonTemplate!: TemplateRef<any>
  @Output() onSelected: EventEmitter<QueryLine> = new EventEmitter<QueryLine>()
  fieldOptions = [
    'season',
    'id',
    'category',
    'product_name',
    'label',
    'hierarchy'
  ]
  operatorOptions = Object.values(Operator)


  selectedField = ''
  selectedOperator = ''
  selectedValue = ''
  valueOptions:string[] = []



  constructor(
    private neptune: NeptuneService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  onFieldSelected(value: string){
    this.selectedField = value
    this.neptune.getValuesForField(this.entityName, this.selectedField).pipe(
      map((entities:any[]) => {
        let array:string[] = entities.map((entity:any) => entity[this.selectedField]).flat()
        console.log(array);
        return array
      })
    ).subscribe(res=> {
      this.valueOptions = res
    })
  }

  onOperatorSelected(value: string){
    this.selectedOperator = value
  }

  onValueSelected(value: string){
    this.selectedValue = value
    this.onSelected.emit({
      field: this.selectedField,
      operator: this.selectedOperator,
      value: value
    })
  }

}
