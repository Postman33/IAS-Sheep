import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheepTableComponent } from './sheep-table/sheep-table.component';
import {RouterModule, Routes} from '@angular/router';

import {SharedModule} from '../shared/shared.module';
import { SheepEditComponent } from './sheep-edit/sheep-edit.component';
import {ChanbanTableComponent} from '../journalDB/chanban-table/chanban-table.component';
import {ChanbanEditComponent} from '../journalDB/chanban-edit/chanban-edit.component';
import { PassportComponent } from './sheep-edit/passport/passport.component';
import { EvolutionComponent } from './sheep-edit/evolution/evolution.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';

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
  declarations: [ SheepTableComponent, SheepEditComponent, PassportComponent, EvolutionComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatGridListModule,
    MatRadioModule,
    MatSliderModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AnimalModule { }
