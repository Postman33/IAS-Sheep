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
import { OtaraTableComponent } from './otara-table/otara-table.component';
import { OtaraEditComponent } from './otara-edit/otara-edit.component';
import { MainEventsComponent } from './events/main-events/main-events.component';
import { DialogComponent } from './events/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';


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
      },
      {
        path: "otars", children: [
          {path: "",component: OtaraTableComponent, pathMatch: "full"},
          {path: "edit/:id",component: OtaraEditComponent}
        ],

      },
      {
        path: "events", children: [
          {path: "",component: MainEventsComponent, pathMatch: "full"},
          {path: "edit/:id",component: MainEventsComponent}
        ],

      }


    ]}

]



@NgModule({
  declarations: [ChanbanTableComponent, ChanbanEditComponent, FarmTableComponent, FarmEditComponent, OtaraTableComponent, OtaraEditComponent, MainEventsComponent, DialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSliderModule
  ],
  exports: [
    RouterModule
  ]
})
export class JournalModule { }
