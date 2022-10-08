import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './converter.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "../input/input.module";



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
        InputModule
    ]
})
export class ConverterModule { }
