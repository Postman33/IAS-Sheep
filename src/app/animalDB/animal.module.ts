import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheepTableComponent } from './sheep-table/sheep-table.component';
import {RouterModule, Routes} from '@angular/router';

import {SharedModule} from '../shared/shared.module';
import { SheepEditComponent } from './sheep-edit/sheep-edit.component';
import {ChanbanTableComponent} from '../journalDB/chanban-table/chanban-table.component';
import {ChanbanEditComponent} from '../journalDB/chanban-edit/chanban-edit.component';

const routes : Routes = [
  {path: "", children: [
      {path: "sheep",children: [
          {path: "",component: SheepTableComponent, pathMatch: "full"},
          {path: "edit/:id", component: SheepEditComponent},
        ]
      },
    ]}

]


@NgModule({
  declarations: [ SheepTableComponent, SheepEditComponent],
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
