import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ErrorComponent} from './shared/error/error.component';
import {HomeComponent} from './shared/home/home.component';
import {AboutComponent} from './shared/about/about.component';

const routes : Routes = [

  {path: "", component:HomeComponent},
  {path:"about",component:AboutComponent},
  {path: "auth", loadChildren: ()=>import("./auth/auth.module").then( m => m.AuthModule)},
  {path: "animals", loadChildren: ()=>import("./animalDB/animal.module").then( m => m.AnimalModule)},
  {path: "journal", loadChildren: ()=>import("./journalDB/journal.module").then( m => m.JournalModule)},
  {path: "report", loadChildren: ()=>import("./reports/report.module").then( m => m.ReportModule)},

  {path:"not-found", component: ErrorComponent},
  // {path:"**", redirectTo: "not-found"},
]
@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})], // Конфигурируем роуты, а также
  // загружаем все модули с ленивой загрузкой
  exports: [RouterModule] // Экспортируем данные роуты в другие части приложения

})
export class AppRoutingModule {

}
