import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import {RouterModule, Routes} from "@angular/router";
import {HeaderModule} from "../../core/components/header/header.module";
import {ConverterModule} from "../../core/components/converter/converter.module";

const routes: Routes = [{
  path: '',
  component: HomePageComponent
}]

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule,
    ConverterModule
  ]
})
export class HomePageModule { }
