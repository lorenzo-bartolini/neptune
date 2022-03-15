import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { QueryLineComponent } from './query-line/query-line.component';
import { QueryBuilderComponent } from './query-builder/query-builder.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouteSelectorComponent } from './route-selector/route-selector.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';

const MATERIAL_MODULES = [
  MatSelectModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatAutocompleteModule,
  MatInputModule
]

@NgModule({
  declarations: [
    DropdownComponent,
    QueryLineComponent,
    QueryBuilderComponent,
    RouteSelectorComponent,

  ],
  imports: [
    MATERIAL_MODULES,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  exports: [
    QueryBuilderComponent,
    RouteSelectorComponent
  ]
})
export class FilterModule { }
