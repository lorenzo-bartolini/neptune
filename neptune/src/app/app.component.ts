import {  Component} from '@angular/core';
import { Entity, EntityName } from 'src/lib/enums/entities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  entities: Entity[]  = [{
    entity: EntityName.product,
    lines: [{}]
  }]
}
