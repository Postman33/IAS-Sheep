import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './template/header/header.component';
import {FooterComponent} from './template/footer/footer.component';
import {MaterialModule} from '../material.module';
import {AppRoutingModule} from '../app-routing.module';
import {ErrorComponent} from './error/error.component';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
import {AboutComponent} from './about/about.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GeneralInterceptorService} from './interceptors/general.interceptor.service';
import {SidenavComponent} from './template/sidenav/sidenav.component';
import {EntityAutoCompleteComponent} from './entity-auto-complete/entity-auto-complete.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BlueHintDirective, ErrorHintDirective, RedHintDirective} from './directives/error-hint.directive';
import {SheepDetailPreviewComponent} from './sheep-detail-preview/sheep-detail-preview.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, ErrorComponent, HomeComponent, AboutComponent, SidenavComponent, EntityAutoCompleteComponent,
    RedHintDirective,
    ErrorHintDirective,
    BlueHintDirective,
    SheepDetailPreviewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
    exports: [
        MaterialModule,
        HeaderComponent,
        MaterialModule,
        SidenavComponent,
        EntityAutoCompleteComponent,
        BlueHintDirective,
        RedHintDirective,
        ErrorHintDirective,
        SheepDetailPreviewComponent,
        FooterComponent,
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: GeneralInterceptorService
  }]
})
export class SharedModule {
}
