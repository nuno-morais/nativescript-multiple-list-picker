import { View, Style, Property, CssProperty, EventData } from "tns-core-modules/ui/core/view";

export class MultipleListPicker extends View
{
    static valueChangeEvent: string;
    items: Array<Array<string>>;
    value: Array<String>;
    on(event: "valueChange", callback: (args: EventData) => void, thisArg?: any);
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
}

export const valueProperty: Property<MultipleListPicker, Array<String>>;
export const itemsProperty: Property<MultipleListPicker, Array<Array<string>>>;
