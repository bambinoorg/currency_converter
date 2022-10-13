import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './converter.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "../input/input.module";
import {GetControlModule} from "../../pipe/get-control/get-control.module";



@NgModule({
    declarations: [
        ConverterComponent
    ],
    exports: [
        ConverterComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    GetControlModule
  ]
})
export class ConverterModule { }
