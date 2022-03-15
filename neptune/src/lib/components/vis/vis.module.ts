import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisComponent } from './vis.component';



@NgModule({
  declarations: [
    VisComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[VisComponent]
})
export class VisModule { }
