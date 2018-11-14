var MultipleListPicker = require("nativescript-multiple-list-picker").MultipleListPicker;
var multipleListPicker = new MultipleListPicker();

describe("greet function", function() {
    it("exists", function() {
        expect(multipleListPicker.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(multipleListPicker.greet()).toEqual("Hello, NS");
    });
});