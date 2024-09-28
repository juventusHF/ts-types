import {describe, expect, test} from '@jest/globals';

/**
 * https://www.typescriptlang.org/docs/handbook/type-inference.html
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html
 */

describe('type inference', () => {
    test('infers type when initializing a variable 1', () => {
        const a = 10;
        const b = a + 2;

        // https://www.typescriptlang.org/docs/handbook/2/typeof-types.html
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
        expect(typeof a).toBe("number")
        expect(typeof b).toBe("number")
    });

    test('infers type when initializing a variable 2', () => {
        const a = 10;
        const b = a + "foo";
        const c = "foo" + a;

        expect(typeof a).toBe("number")
        expect(typeof b).toBe("string")
        expect(typeof c).toBe("string")
    });

    test('finds best common type', () => {
        const people = [{name: "Linda"}, null]
        console.log(typeof people) // -> object

        // complains only if strict mode is enabled
        // people.forEach(p => console.log(p.name))
    });

    test('contextual typing', () => {
        type Person = {name: string}
        type Operations = {
            someFun?: (p: Person) => boolean
        }

        const myOperations: Operations = {};
        myOperations.someFun = (p) => {
            // console.log(p.foo)
            return true;
        }
    });
});

describe('type narrowing', () => {

    /**
     * typeof can check for the following types:
     * "string"
     * "number"
     * "bigint"
     * "boolean"
     * "symbol"
     * "undefined"
     * "object" -> is also used for arrays and null values
     * "function"
     */

    test('check type with typeof operator', () => {
        function padLeft(padding: number | string, input: string): string {
            if (typeof padding === "number") {
                return " ".repeat(padding) + input;
            }
            return padding + input;
        }

        const resultFromNumber = padLeft(5, "foo")
        const resultFromString = padLeft("5", "foo")

        expect(resultFromNumber).toBe("     foo")
        expect(resultFromString).toBe("5foo")
    });

    test('null is also an object', () => {
        function printAll(strs: string | string[] | null) {
            if (typeof strs === "object") {
                for (const s of strs) {
                    console.log(s);
                }
            } else if (typeof strs === "string") {
                console.log(strs);
            } else {
                // do nothing
            }
        }
    });

    test('guarding agains null and undefined', () => {
        // falsy: https://developer.mozilla.org/en-US/docs/Glossary/Falsy
        // careful with primitives like empty strings or boolean false
        function printAll(strs: string | string[] | null) {
            if (strs && typeof strs === "object") {
                for (const s of strs) {
                    console.log(s);
                }
            } else if (typeof strs === "string") {
                console.log(strs);
            }
        }
    });

    test('equality narrowing', () => {

        function example(x: string | number, y: string | boolean) {
            if (x === y) {
                // if x and y have the same type it must be string
                x.toUpperCase();
                y.toLowerCase();
            } else {
                console.log(x);
                console.log(y);
            }
        }

    });

});

// todo: deal with null/undefined values, show assert instead of if
