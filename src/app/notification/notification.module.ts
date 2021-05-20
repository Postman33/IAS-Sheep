import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material.module';
import {HttpClientModule} from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ViewEditComponent } from './view-edit/view-edit.component';


const routes : Routes = [
  {path: "", children: [


      {path: "edit",children: [
          {path: "",component: ViewEditComponent, pathMatch: "full"},

        ]
      },



    ]}

]



@NgModule({
  declarations: [ViewEditComponent],
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
export class NotificationModule { }
