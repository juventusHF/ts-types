import {describe, expect, test} from '@jest/globals';
import assert from "node:assert";

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
        let a = 10;
        const b = a + "foo";
        const c = "foo" + a;

        // a = true;

        expect(typeof a).toBe("number")
        expect(typeof b).toBe("string")
        expect(typeof c).toBe("string")
    });

    test('infers type when initializing a variable 3', () => {
        const a = 5 < 0.5 ? 10 : "hello world!";

        // console.log(a.length)

        expect(typeof a).toBe("string")
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
                // for (const s of strs) {
                //     console.log(s);
                // }
            } else if (typeof strs === "string") {
                console.log(strs);
            } else {
                // do nothing
            }
        }
    });

    test('guarding against null and undefined', () => {
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

    test('the in operator', () => {

        type Fish = { swim: () => void };
        type Bird = { fly: () => void };

        function move(animal: Fish | Bird) {
            if ("swim" in animal) {
                animal.swim();
            } else {
                animal.fly();
            }
        }

    });

    test('using instanceof', () => {
        // x instanceof Foo checks whether the prototype chain of x contains Foo.prototype
        // can be used for values that can be constructed with the new keyword

        class Point {
            x: number | undefined;
            y: number | undefined;
        }

        function logValue(a: Point | Date) {
            if (a instanceof Point) {
                console.log(`x = ${a.x} y = ${a.y}`)
            } else {
                console.log(a.toUTCString());
            }
        }

    });

    test('type predicates - a user-defined type guard', () => {

        type Fish = { swim: () => void };
        type Bird = { fly: () => void };

        function isFish(pet: Fish | Bird): pet is Fish {
            return (pet as Fish).swim !== undefined;
        }

        function getPet() : Fish | Bird {
            return Math.random() > 0.5
                ? {swim: () => console.log("swimming")}
                : {fly: () => console.log("flying")}
        }

        const pet = getPet();
        if (isFish(pet)) {
            pet.swim();
        } else {
            pet.fly();
        }

        const zoo: (Fish | Bird)[] = [getPet(), getPet(), getPet()];
        const underWater: Fish[] = zoo.filter(isFish);
        console.log(underWater)

    });

    test('asserts throw on falsy values', () => {

        function getSomething() {
            const random = Math.random();

            if (random < 0.3) return null;
            if (random < 0.6) return undefined;
            return "I'm a string";
        }

        const someValue = Math.random();
        assert(someValue === 42);

        const something = getSomething();
        assert(something, "something must not be null or undefined");
        console.log(something?.length)
    });

    test('discriminated unions', () => {

        interface Shape {
            kind: "circle" | "square";
            radius?: number;
            sideLength?: number;
        }

        function handleShape(shape: Shape) {
            // if (shape.kind === "rect") { }
        }

        function getArea(shape: Shape) {
            if (shape.kind === "circle") {
                // BAD EXAMPLE!
                return Math.PI * shape.radius! ** 2;
            }
        }
    });

    test('discriminated unions 2', () => {

        interface Circle {
            kind: "circle";
            radius: number;
        }

        interface Square {
            kind: "square";
            sideLength: number;
        }

        type Shape = Circle | Square;

        function getArea(shape: Shape) {
            if (shape.kind === "circle") {
                return Math.PI * shape.radius ** 2;
            }
        }
    });

    /**
     * When narrowing, you can reduce the options of a union to a point where you have removed all possibilities and have nothing left.
     * In those cases, TypeScript will use a never type to represent a state which shouldn’t exist.
     */

});

