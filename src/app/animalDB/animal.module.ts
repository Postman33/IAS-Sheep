import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheepTableComponent } from './sheep-table/sheep-table.component';
import {RouterModule, Routes} from '@angular/router';

import {SharedModule} from '../shared/shared.module';

const routes : Routes = [
  {path: "", children: [
      {path: "sheep", component: SheepTableComponent},
    ]}

]


@NgModule({
  declarations: [ SheepTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AnimalModule { }
