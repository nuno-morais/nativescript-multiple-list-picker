import { Observable } from 'tns-core-modules/data/observable';
import { MultipleListPicker } from 'nativescript-multiple-list-picker';

export class HelloWorldModel extends Observable {
  public message: string;
  public Value: Array<string>;
  public Items;
  private multipleListPicker: MultipleListPicker;

  constructor() {
    super();

    // this.multipleListPicker = new MultipleListPicker();
    this.message = "Message"; // this.multipleListPicker.message;
    this.Value = ["1", "2", ",", "5", "0"];
    this.Items = [["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], [","], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]];
    this.Test();

  }

  public Test() {
    setTimeout(() => {
      console.log(this.Value);
      this.Test();
    }, 1000);
  }
}
