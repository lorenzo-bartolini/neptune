import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NeptuneService } from 'src/app/services/neptune.service';

@Component({
  selector: 'app-route-selector',
  templateUrl: './route-selector.component.html',
  styleUrls: ['./route-selector.component.scss']
})
export class RouteSelectorComponent implements OnInit, OnChanges {

  @Input() form!: FormGroup
  @Output()formChange = new EventEmitter();

  entityList$ = this.neptune.getEntityList()

  entities: string[] = []
  filteredEntitiesFrom?: any
  filteredEntitiesTo?: any

  filter: FormGroup = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required]
  })
  constructor(
    private fb: FormBuilder,
    private neptune: NeptuneService
    ) { }

  ngOnInit(): void {
    combineLatest(this.entityList$).subscribe(([entities]) => {
      this.entities = entities
    })

    this.filteredEntitiesFrom = this.filter.get('from')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )

    this.filteredEntitiesTo = this.filter.get('to')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes.filter && (changes.filter.currentValue !== changes.filter.previousValue)){
        this.formChange.emit(this.filter.value)
      }
  }

  private _filter(value: string): string[] {
    let filterValue: any = null
    if(typeof value === 'string'){
      filterValue = value.toLowerCase();
    }
      return this.entities.filter(entity => entity.toLocaleLowerCase().includes(filterValue));
  }

  displayEntitiesFn(entity: string){
    return entity;
  }


}
