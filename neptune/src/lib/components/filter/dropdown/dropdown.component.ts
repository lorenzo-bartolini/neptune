import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input()value?: any
  @Input()label: string = ''
  @Input()multiple: boolean = false;

  @Input()options: string[]|null = []
  @Output()onSelected = new EventEmitter
  @Output()valueChange = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelectionChange(event: any){
    console.log('select event', event);
    this.onSelected.emit(event.value)
    this.valueChange.emit(event.value)
  }
}
