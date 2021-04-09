import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SheepTableComponent} from '../animalDB/sheep-table/sheep-table.component';
import {SharedModule} from '../shared/shared.module';
import { ChanbanTableComponent } from './chanban-table/chanban-table.component';
import { ChanbanEditComponent } from './chanban-edit/chanban-edit.component';
import {MaterialModule} from '../material.module';
import { FarmTableComponent } from './farm-table/farm-table.component';
import { FarmEditComponent } from './farm-edit/farm-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


const routes : Routes = [
  {path: "", children: [


      {path: "chabans",children: [
          {path: "",component: ChanbanTableComponent, pathMatch: "full"},
          {path: "edit/:id", component: ChanbanEditComponent},
        ]
      },
      {
        path: "farms", children: [
          {path: "",component: FarmTableComponent, pathMatch: "full"},
          {path: "edit/:id",component: FarmEditComponent}
        ]
      }



    ]}

]



@NgModule({
  declarations: [ChanbanTableComponent, ChanbanEditComponent, FarmTableComponent, FarmEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class JournalModule { }
