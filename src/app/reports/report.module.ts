import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxChartsModule} from '@swimlane/ngx-charts';
import { StructureSheepComponent } from './structure-sheep/structure-sheep.component';
import { StatsComponent } from './stats/stats.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReportCustomComponent } from './report-custom/report-custom.component';



const routes : Routes = [
  {path: "", children: [
      {path: "structure",component:StructureSheepComponent},
      {path: "stats",component:StatsComponent},
      {path: "custom",component:ReportCustomComponent},

    ]}

]



@NgModule({
  declarations: [ StructureSheepComponent, StatsComponent, ReportCustomComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule

  ],
  exports: [
    RouterModule
  ]
})
export class ReportModule { }
