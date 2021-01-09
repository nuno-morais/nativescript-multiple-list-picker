import { NgModule } from "@angular/core";
import { registerElement } from "@nativescript/angular/element-registry";
import { DIRECTIVES } from "./multiple-list-picker.directives";

@NgModule({
    declarations: [DIRECTIVES],
    exports: [DIRECTIVES],
})
export class MultipleListPickerModule { }

registerElement("MultipleListPicker", () => require("../").MultipleListPicker);
