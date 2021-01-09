import { Common as MultipleListPickerBase, itemsProperty, valueProperty } from './multiple-list-picker.common';

export class MultipleListPicker extends MultipleListPickerBase {
    nativeView: UIPickerView;
    private dataSource: MultipleListPickerDataSource;
    private delegate: MultipleListPickerViewDelegate;


    /**
     * Creates new native UIPickerView.
     */
    public createNativeView(): Object {
        return UIPickerView.new();
    }

    /**
     * Initializes properties/listeners of the native view.
     */
    initNativeView(): void {
        super.initNativeView();
        const nativeView = this.nativeView;
        nativeView.dataSource = this.dataSource = MultipleListPickerDataSource.initWithOwner(new WeakRef(this));
        this.delegate = MultipleListPickerViewDelegate.initWithOwner(new WeakRef(this));
    }

    public disposeNativeView() {
        this.dataSource = null;
        this.delegate = null;
        super.disposeNativeView();
    }

    public onLoaded() {
        super.onLoaded();
        this.ios.delegate = this.delegate;
    }

    public onUnloaded() {
        this.ios.delegate = null;
        super.onUnloaded();
    }

    [valueProperty.getDefault](): Array<string> {
        let value = [];
        for (const items in this.items) {
            value.push(items[0]);
        }
        return value;
    }
    [valueProperty.setNative](value: Array<string>) {
        let i = 0;
        const allValues = (this.items || []).map((q, index) => {
            if (value[index] == null) {
                value[index] = q[0];
            }
            return value[index];
        });
        for (const v of allValues) {
            const values = this.items[i];
            let index = values.indexOf(v);
            index = index >= 0 ? index : 0;
            this.ios.selectRowInComponentAnimated(index, i, false);
            i++;
        }
    }

    [itemsProperty.getDefault](): Array<Array<string>> {
        return null;
    }
    [itemsProperty.setNative](value: Array<Array<string>>) {
        this.ios.reloadAllComponents();
        valueProperty.coerce(this);
    }
}


@ObjCClass(UIPickerViewDataSource)
class MultipleListPickerDataSource extends NSObject implements UIPickerViewDataSource {
    public static initWithOwner(owner: WeakRef<MultipleListPicker>): MultipleListPickerDataSource {
        const dataSource = MultipleListPickerDataSource.new() as MultipleListPickerDataSource;

        dataSource._owner = owner;

        return dataSource;
    }

    private _owner: WeakRef<MultipleListPicker>;

    public numberOfComponentsInPickerView(pickerView: UIPickerView) {
        const owner = this._owner.get();
        return (owner && owner.items) ? owner.items.length : 1;
    }

    public pickerViewNumberOfRowsInComponent(pickerView: UIPickerView, component: number) {
        const owner = this._owner.get();
        return (owner && owner.items && owner.items[component]) ? owner.items[component].length : 0;
    }
}

@ObjCClass(UIPickerViewDelegate)
class MultipleListPickerViewDelegate extends NSObject implements UIPickerViewDelegate {
    public static initWithOwner(owner: WeakRef<MultipleListPicker>): MultipleListPickerViewDelegate {
        const delegate = MultipleListPickerViewDelegate.new() as MultipleListPickerViewDelegate;

        delegate._owner = owner;
        return delegate;
    }

    private _owner: WeakRef<MultipleListPicker>;

    public pickerViewTitleForRowForComponent?(pickerView: UIPickerView, row: number, component: number): string {
        const owner = this._owner.get();
        return owner.items[component][row];
    }
    public pickerViewDidSelectRowInComponent(pickerView: UIPickerView, row: number, component: number): void {
        let owner = this._owner.get();
        if (owner) {
            const values = owner.value;
            const allValues = owner.items.map((q, index) => {
                if (values[index] == null) {
                    values[index] = q[0];
                }
                return values[index];
            });
            allValues[component] = owner.items[component][row];
            valueProperty.nativeValueChange(owner, allValues);
            owner.updateSelectedValue(allValues);
        }
    }

    public pickerViewAttributedTitleForRowForComponent(pickerView: UIPickerView, row: number, component: number): NSAttributedString {
        let owner = this._owner.get();
        if (owner) {
            let title = NSAttributedString.alloc().initWithStringAttributes(owner.items[component][row], <any>{});
            return title;
        }
        return NSAttributedString.alloc().initWithStringAttributes(row.toString(), <any>{});
    }
}
